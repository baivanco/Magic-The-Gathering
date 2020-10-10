//Get User Name From LocalStorage
window.addEventListener("load", () => {
  const name = localStorage.getItem("NAME");
  document.getElementById("user-name").innerHTML = name;
});

const cardSection = document.querySelector("#cards");
const cardTemplate = document.querySelector("#card-template");

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
}

function hideSpinner() {
  spinner.className = "hide";
}

//Fetch API
getData();
showSpinner();

async function getData() {
  const cardsLoad = await fetch(
    "https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English"
  );

  const allCards = await cardsLoad.json();

  allCards.cards.forEach((card, i) => {
    const name = card.name;
    const image = card.imageUrl;
    const types = card.types;
    const setName = card.setName;
    const colors = card.colors;

    const newCard = document.importNode(cardTemplate.content, true);
    const cardName = newCard.querySelector(".card-name");
    const cardImage = newCard.querySelector(".card-img");
    const cardTypes = newCard.querySelector(".card-types");
    const cardSetName = newCard.querySelector(".card-set-name");
    const cardColor = newCard.querySelector(".card-colors");

    cardName.innerText = name;
    cardImage.src = image;
    cardTypes.innerText = types;
    cardSetName.innerText = setName;
    cardColor.innerText = colors;
    cardSection.appendChild(newCard);
    hideSpinner();
  });
}
