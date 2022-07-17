document.getElementById("submit_btn").addEventListener("click", (evtObj) => {
  evtObj.preventDefault();
  console.log("button clicked");

  let destination = document.getElementById("destination").value;
  let location = document.getElementById("location").value;
  let photo = document.getElementById("photo").value;
  let description = document.getElementById("description").value;
  //   console.log(destination);
  //   console.log(location);
  //   console.log(photo);
  //   console.log(description);
  createCard(destination, location, photo, description);

  document.getElementById("input").reset();
});

function createCard(destination, location, photo, description) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  //   console.log(photo);

  var img = document.createElement("img");
  img.setAttribute("class", "img");
  let defaultPhoto =
    "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzdGluYXRpb258ZW58MHx8MHx8&w=1000&q=80";
  if (photo.length !== 0) {
    img.src = photo;
  } else {
    img.src = defaultPhoto;
  }
  card.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card_body");

  let cardTitle = destination;
}