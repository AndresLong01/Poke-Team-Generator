const currentSearches = [];

const searchPokemon = (e) => {
  e.preventDefault();
  const query = document.querySelector(".searchInput").value;

  fetch("https://pokeapi.co/api/v2/pokemon/" + query.toLowerCase())
    .then(result => result.json())
    .then(data => {
      const objectToRender = {
        name: data.name,
        image: data.sprites.front_default
      }
      renderNewCard(objectToRender);
    })
}

const renderNewCard = (obj) => {
  if (currentSearches.length < 3) {
    currentSearches.push(obj);
  } else {
    currentSearches.shift()
    currentSearches.push(obj)
  }

  const cardContainer = document.querySelector(".resultContainer");
  cardContainer.innerHTML = "";

  for (i = 0; i < currentSearches.length; i++) {
    const newPokeCard = document.createElement("div")
    newPokeCard.setAttribute("class", "pokeCard");

    newPokeCard.innerHTML = `
    <h3 class="pokeName"> ${currentSearches[i].name}</h3>
    <div class="imgWrapper">
        <img src="${currentSearches[i].image}" alt="Searched Pokemon Result" width="100px" height="100px">
    </div>
    `
    const newButton = document.createElement("button");
    newButton.setAttribute("class", "addToDB")
    newButton.setAttribute("data-pokename", currentSearches[i].name)
    newButton.setAttribute("data-image", currentSearches[i].image);
    newButton.addEventListener("click", sendToDatabase);
    newButton.textContent = "Add"

    newPokeCard.appendChild(newButton);
    cardContainer.appendChild(newPokeCard);
  }
}

const sendToDatabase = async (e) => {
  e.preventDefault();

  const pokeName = e.target.dataset.pokename;
  const image = e.target.dataset.image;

  await fetch(`/api/pokemon/`, {
    method: 'POST',
    body: JSON.stringify({
      pokeName,
      image,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
}

document.querySelector("#searchForm").addEventListener("submit", searchPokemon);