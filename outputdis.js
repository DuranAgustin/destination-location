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
  let newCard = createCard(destination, location, photo, description);
  document.getElementById("card_container").appendChild(newCard);

  document.getElementById("input").reset();
});

function createCard(destination, location, photo, description) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "200px";
  card.style.height = "fit-content";

  console.log(photo);

  var img = document.createElement("img");
  img.setAttribute("class", "img");
  let photoURL =
    "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzdGluYXRpb258ZW58MHx8MHx8&w=1000&q=80";
  if (photo.length === 0) {
    img.src = photoURL;
    console.log("set");
  } else {
    img.src = photo;
    console.log("set12");
  }
  card.appendChild(img);

  let locationName = document.createElement("p");
  locationName.setAttribute("class", "locationName");
  locationName.innerText = location;
  card.appendChild(locationName);

  let cardDis = document.createElement("p");
  cardDis.setAttribute("class", "cardDis");
  cardDis.innerText = description;
  card.appendChild(cardDis);

  return card;
}
