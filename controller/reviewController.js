const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.reviewForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("reviewForm.ejs", { listing });
};

module.exports.postReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New review added!");
  console.log("New Review Added");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewid } = req.params;

  await Review.findByIdAndDelete(reviewid);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  req.flash("success", "Review deleted");

  res.redirect(`/listings/${id}`);
};
