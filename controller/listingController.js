const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find().populate("reviews");
  res.render("allListings.ejs", {
    allListings,
    title: "NomadHomes - Assisting your NoMadness",
  });
};

module.exports.newHome = async (req, res, next) => {
  try {
    res.render("newForm.ejs", { title: "NomadHomes - Add a Home" });
  } catch (err) {
    next(err);
  }
};

module.exports.postHome = async (req, res) => {
  let url = req.file.path;
  let fileName = req.file.filename;
  let { title, description, price, location, country } = req.body;
  let response = await geocodingClient
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();
  let newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image: {
      url: url,
      filename: fileName,
    },
    owner: req.user._id,
    geometry: response.body.features[0].geometry,
  });

  await newListing.save();
  console.log(newListing);
  req.flash("success", "New home added!");
  res.redirect("/listings");
};

module.exports.showHome = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Home you are looking for does not exist!");
    res.redirect("/listings");
  } else {
    let response = await geocodingClient
      .forwardGeocode({
        query: listing.location,
        limit: 1,
      })
      .send();
    let geoCoding = response.body.features[0].geometry.coordinates;
    res.render("show.ejs", {
      listing,
      geoCoding,
      title: `NomadHomes - ${listing.title}`,
    });
  }
};

module.exports.editHome = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Home you are looking for does not exist!");
    res.redirect("/listings");
  } else {
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/w_250");
    res.render("editForm.ejs", { listing, originalUrl, title: "Edit Details" });
  }
};

module.exports.updateHome = async (req, res) => {
  let { id } = req.params;

  if (!req.body.title) {
    throw new ExpressError(400, "Send a valid Data for Listing");
  }

  let { title, description, price, location, country } = req.body;

  if (req.file) {
    req.body.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  let response = await geocodingClient
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send();
  let geoCoding = response.body.features[0].geometry;
  await Listing.findByIdAndUpdate(id, { ...req.body, geometry: geoCoding });
  const listing = await Listing.findById(id);

  res.render("show.ejs", {
    listing,
    geoCoding,
    title: `NomadHomes - ${listing.title}`,
  });
};

module.exports.deleteHome = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Home deleted!");
  res.redirect("/listings");
};
