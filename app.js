if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

//ExpressRouter -
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

port = 8080;

//DB connection:
const dbUrl = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Not connected, Error: ", err);
  });

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error in Mongo Session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//listing Routes:
app.use("/listings", listingRouter);

//Review Routes:
app.use("/listing/:id/review", reviewRouter);

//User Authentication Router:
app.use("/", userRouter);

app.all("{*any}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

//Catching all the next(err) i.e. errors inn this Error middleware thats rendering Error.ejs
//this Middleware is also defining the default status code and message for the error
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Error" } = err;
  res.status(statusCode);
  res.render("Error.ejs", { statusCode, message });
});

app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
