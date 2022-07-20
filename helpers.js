export async function handleFormSubmit(evtObj) {
  // Prevents form from automatically submit our info and gives us time to process input our way
  evtObj.preventDefault();

  // TODO - Grab user input on form submit
  let destName = document.getElementById("dest_name").value;
  let locName = document.getElementById("loc_name").value;

  // let photoUrl = document.getElementById("photo_url").value;
  // Get the photo from Unsplash API
  // let photoUrl = await getUnsplashPhoto({ destName, locName });

  let descr = document.getElementById("description").value;

  //   TODO Use user input to create a card
  // createCard({ destName, locName, photoUrl, descr });
  createCard({ destName, locName, descr });

  // Reset form input fields back to nothing
  evtObj.target.reset();
}

function getUnsplashPhoto({ destName, locName, imgElt }) {
  // Use destName and locName as query parameters to get a photo related to them from the Unsplash API
  const URL = `https://api.unsplash.com/search/photos?client_id=zPyO6m0ezgkOS-Tc0Co64-y6MqTXCULFL-TcXfxBrLc&query=${destName} ${locName}`;

  // TODO Use the URL to fetch photos from Unsplash and log those photos
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const allPhotos = data.results;
      const randIdx = Math.floor(Math.random() * allPhotos.length);
      const randPhoto = allPhotos[randIdx];
      imgElt.src = randPhoto.urls.thumb;
    });

  // const response = await fetch(URL);
  // const data = await response.json();

  // const allPhotos = data.results;
  // const randIdx = Math.floor(Math.random() * allPhotos.length);
  // const randPhoto = allPhotos[randIdx];

  // if (randPhoto === undefined) {
  //   return "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-3155666.jpg&fm=jpg";
  // }

  // return randPhoto.urls.thumb;
}

function createCard({ destName, locName, descr }) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const imgElt = document.createElement("img");
  imgElt.src =
    "https://us.123rf.com/450wm/lishchyshyn/lishchyshyn1904/lishchyshyn190403199/132862735-vector-loading-icon-futuristic-progress-design.jpg?ver=6";
  imgElt.classList.add("card-img-top");
  imgElt.setAttribute("alt", `${destName} at ${locName}`);
  card.appendChild(imgElt);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const destElt = document.createElement("h5");
  destElt.classList.add("card-title");
  destElt.innerText = destName;
  cardBody.appendChild(destElt);

  const locElt = document.createElement("p");
  locElt.classList.add("card-text");
  locElt.innerText = locName;
  cardBody.appendChild(locElt);

  const descElt = document.createElement("p");
  descElt.classList.add("card-text");
  descElt.innerText = descr;
  cardBody.appendChild(descElt);

  const actionBtns = document.createElement("div");
  actionBtns.classList.add("action_btns");
  cardBody.appendChild(actionBtns);

  // TODO Append card to cards container div
  document.getElementById("cards_container").appendChild(card);

  const editBtn = document.createElement("btn");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", handleEdit);

  const deleteBtn = document.createElement("btn");
  deleteBtn.innerText = "Remove";
  deleteBtn.addEventListener("click", handleRemove);

  const numsOfCards = document.querySelectorAll(".action_btns").length;

  document
    .querySelectorAll(".action_btns")
    [numsOfCards - 1].appendChild(editBtn);
  document
    .querySelectorAll(".action_btns")
    [numsOfCards - 1].appendChild(deleteBtn);

  getUnsplashPhoto({ destName, locName, imgElt });
}

function handleEdit(evt) {
  const editBtn = evt.target;
  const cardBody = editBtn.parentElement.parentElement;
  const [destElt, locElt, descElt] = cardBody.children;

  const imgElt = cardBody.parentElement.children[0];

  const { newDesc, newDest, newLoc } = getUserInfo();
  updateUserInfo({
    eltsToUpdate: { destElt, locElt, descElt, imgElt },
    newInfo: { newDesc, newDest, newLoc },
  });
}

async function updateUserInfo({
  eltsToUpdate: { destElt, locElt, descElt, imgElt },
  newInfo: { newDesc, newDest, newLoc },
}) {
  if (newDest) {
    destElt.innerText = newDest;
  }

  if (newLoc) {
    locElt.innerText = newLoc;
  }

  // if (newImgUrl) {
  //   imgElt.setAttribute("src", newImgUrl);
  // }

  // Check if either destination and/or location was updated to go get a new photo
  if (newDest || newLoc) {
    const newImgUrl = await getUnsplashPhoto({
      destName: destElt.innerText,
      locName: locElt.innerText,
    });
    imgElt.setAttribute("src", newImgUrl);
  }

  if (newDesc) {
    descElt.innerText = newDesc;
  }
}

function getUserInfo() {
  const newDest = prompt("Enter new destination");
  const newLoc = prompt("Enter new location");
  const newDesc = prompt("Enter new description");
  // const newImgUrl = prompt("Enter new image url");

  return {
    newDesc,
    newLoc,
    // newImgUrl,
    newDest,
  };
}

function handleRemove(evt) {
  const removeBtn = evt.target;
  const card = removeBtn.parentElement.parentElement.parentElement;
  card.remove();
}
