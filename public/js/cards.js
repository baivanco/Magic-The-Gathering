//Get User Name From LocalStorage
window.addEventListener("load", () => {
  const name = localStorage.getItem("NAME");
  document.getElementById("user-name").innerHTML = name;
});

//Loading Screen
const spinner = document.getElementById("spinner");
function showSpinner() {
  spinner.className = "show";
}
function hideSpinner() {
  spinner.className = "hide";
}

//Search and Filter - Searchbar
const searchField = document.getElementById("search-n-t");
let displayCards = [];

searchField.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCards = displayCards.filter((card) => {
    return card.name.toLowerCase().includes(searchString);
  });
  displayTheCards(filteredCards);
});

// Filter by types
function showSelectedType() {
  const selectedType = document.getElementById("types").value;
  const filteredCardType = displayCards.filter((card) => {
    return card.types.includes(selectedType);
  });
  if (filteredCardType.length == 0) {
    cardsList.innerHTML = `<h2 style="color:white">" No cards found for chosen type "</h2>`;
  } else {
    displayTheCards(filteredCardType);
  }
}

// Filter by color
function showSelectedColor() {
  const selectedColors = document.getElementById("colors").value;
  const filteredCardColors = displayCards.filter((card) => {
    return card.colors.includes(selectedColors);
  });
  displayTheCards(filteredCardColors);
}

//Sort By Name
sortByNameAsc = () => {
  const filterNames = displayCards.sort((a, b) =>
    a.name.toString().toLowerCase() > b.name.toString().toLowerCase() ? 1 : -1
  );
  displayTheCards(filterNames);
};

sortByNameDesc = () => {
  const filterNames = displayCards.sort((a, b) =>
    a.name.toString().toLowerCase() < b.name.toString().toLowerCase() ? 1 : -1
  );
  displayTheCards(filterNames);
};

//Fetch API
const cardsList = document.getElementById("cardsList");
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
      cardsList.innerHTML = `<h1 style="color:white">"SERVER ERROR PLEASE TRY AGAIN LATER"</h1>`;
    }
    console.error(err);
  }
  hideSpinner();
};

//Rendering the cards

const displayTheCards = (cards) => {
  const htmlString = cards
    .map((card) => {
      return `
    <li class="card">
    <h2>${card.name}</h2>
    <img src=${card.imageUrl} width=200px onerror="this.src='../images/card-back-not-found.jpg'" ></img>
    <p> Types: ${card.types}</p>
    <p> Set Name: ${card.setName}</p>
    <p> Colors: <span style="color:${card.colors};">${card.colors}</span></p>
    
      </li>    
    `;
    })
    .join("");
  cardsList.innerHTML = htmlString;
};
showSpinner();
loadCards();
