const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controller/listingController.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const Listing = require("../models/listing.js");

//validateListing - Middleware validating schema if everything logged is there or not according to schema.js (Client-Side Validation).
//isLoggedIn - Middleware to check if the user is logged in.
//isOwner - Middlware to check if the current user is the owner of the listing.
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");

router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index Route
  .post(
    isLoggedIn,
    validateListing,
    upload.single("imageUrl"),
    wrapAsync(listingController.postHome),
  ); //Create Route

//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.newHome));

router
  .route("/:id")
  .get(wrapAsync(listingController.showHome)) //Show Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("imageUrl"),
    wrapAsync(listingController.updateHome),
  ) //Update Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteHome)); //delete Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.editHome),
);

module.exports = router;
