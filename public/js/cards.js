//Get User Name From LocalStorage
window.addEventListener("load", () => {
  const name = localStorage.getItem("NAME");
  document.getElementById("user-name").innerHTML = name.toUpperCase();
});

// const cardSection = document.querySelector("#cards");
// const cardTemplate = document.querySelector("#card-template");

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
}

function hideSpinner() {
  spinner.className = "hide";
}

//Search and Filter - searchbar
const searchField = document.getElementById("search-n-t");
let displayCards = [];

searchField.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCards = displayCards.filter((card) => {
    return card.name.toLowerCase().includes(searchString);
  });
  displayTheCards(filteredCards);
  console.log(filteredCards);
});

//Filter by types
function showSelectedType() {
  const filterTypes = document.getElementById("types").value;
  const filteredCardTypes = displayCards.filter((card) => {
    return card.types.includes(filterTypes);
  });
  displayTheCards(filteredCardTypes);
}

//Filter by color
function showSelectedColor() {
  const filterTypes = document.getElementById("colors").value;
  const filteredCardTypes = displayCards.filter((card) => {
    return card.colors.includes(filterTypes);
  });
  displayTheCards(filteredCardTypes);
}

//Fetch API
// getData();
// showSpinner();

// async function getData() {
//   const cardsLoad = await fetch(
//     "https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English"
//   );

//   const allCards = await cardsLoad.json();
//   console.log(allCards);

//   allCards.cards.forEach((card, i) => {
//     const name = card.name;
//     const image = card.imageUrl;
//     const types = card.types;
//     const setName = card.setName;
//     const colors = card.colors;

//     const newCard = document.importNode(cardTemplate.content, true);
//     const cardName = newCard.querySelector(".card-name");
//     const cardImage = newCard.querySelector(".card-img");
//     const cardTypes = newCard.querySelector(".card-types");
//     const cardSetName = newCard.querySelector(".card-set-name");
//     const cardColor = newCard.querySelector(".card-colors");

//     cardName.innerText = name;
//     cardImage.src = image;
//     cardTypes.innerText = types;
//     cardSetName.innerText = setName;
//     cardColor.innerText = colors;
//     cardSection.appendChild(newCard);
//     hideSpinner();
//   });
// }

const cardsList = document.getElementById("cardsList");

//Fetch API
const loadCards = async () => {
  try {
    const res = await fetch(
      "https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English"
    );
    mgtCards = await res.json();
    displayCards = mgtCards.cards;
    displayTheCards(mgtCards.cards);
  } catch (err) {
    if (err) {
      cardsList.innerHTML = "SERVER ERROR PLEASE TRY LATER";
    }
    console.error(err);
  }
  hideSpinner();
};

const displayTheCards = (cards) => {
  const htmlString = cards
    .map((card) => {
      return `
    <li class="card">
    <h2>${card.name}</h2>
    <img src=${card.imageUrl} width=200px onerror="this.src='../images/card-back-not-found.jpg'" ></img>
    <p> Types: ${card.types}</p>
    <p> Set Name: ${card.setName}</p>
    <p> Colors: ${card.colors}</p>
        
    </li>    
    `;
    })
    .join("");
  cardsList.innerHTML = htmlString;
};
showSpinner();
loadCards();
