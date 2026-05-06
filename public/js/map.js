//mapToken here from the ejs file!
mapboxgl.accessToken = mapToken;

//Ternery operator to check if the coordinates coming do have geoCoding or not!
const coords =
  listing.geometry &&
  Array.isArray(listing.geometry.coordinates) &&
  listing.geometry.coordinates.length === 2
    ? listing.geometry.coordinates
    : ShowGeoCoding;
console.log("coords:", coords);
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: coords, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 7, // starting zoom
});

const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  `Home Location:\n${listing.location}`,
);
const el = document.createElement("div");
el.id = "marker";
//coordinates here from the ejs file
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coords)
  .setPopup(popup)
  .addTo(map);
