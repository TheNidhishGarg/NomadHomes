const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/nomadhomes";
async function main() {
  await mongoose.connect(Mongo_URL);
}

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Not connected, Error: ", err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69f485a9b2c72fe1a273b165",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
