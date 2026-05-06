const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controller/reviewController.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//validateReview - Middleware validating schema if everything logged is there or not according to schema.js (Client-Side Validation).
//isLoggedIn - Middleware to check if the user is logged in.
//isAuthor - Middlware to check if the current user is the author of the review.
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");

//Review Form Route:
// Added Form Validation via Bootstrap Classes
router.get("/review-form", isLoggedIn, wrapAsync(reviewController.reviewForm));

//Review Post Route:
// Added Server side Validatio Error via Joi
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.postReview),
);

//Delete Review

router.delete(
  "/:reviewid",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;
