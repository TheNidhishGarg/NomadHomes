const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/userController.js");

router.get("/signup", (req, res) => {
  res.render("signupForm.ejs");
});

router.post("/signup", wrapAsync(userController.signup));

router.get("/login", (req, res) => {
  res.render("loginForm.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login,
);

router.get("/logout", userController.logout);

module.exports = router;
