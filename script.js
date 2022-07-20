import { handleFormSubmit } from "./helpers.js";

const destinationForm = document.getElementById("dest_form");
destinationForm.addEventListener("submit", handleFormSubmit);

navigator.geolocation.getCurrentPosition(
  handlePositionSucess,
  handlePositionError
);

function handlePositionSucess(loc) {
  console.log(loc.coord.latitude, loc.coords.longitude);
  //use lat and long info to get user current weather using openweather api
}

function handlePositionError() {
  alert("you dont want me to track you.");
}
