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

  const canAdd = await checkIfExists(pokeName);

  console.log('canadd!', canAdd);

  if (canAdd) {
    try {
      await fetch(`/api/pokemon/`, {
        method: 'POST',
        body: JSON.stringify({
          pokeName,
          image,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      alert(`Successfully added ${pokeName} to your pokemon list. Check them out in your profile!`);
    }
    catch (err) {
      alert(`Something went wrong adding pokemon ${pokeName} to the db. Fire Andres. Error: ${err}`);
    }
  }
}

document.querySelector("#searchForm").addEventListener("submit", searchPokemon);

const checkIfExists = async(param) => {
  const result = await fetch(`/api/pokemon/check-if-exists/${param}`);
  const data = await result.json();

  console.log('data', data);

  if (!data.addToDb) {
    alert('You\'ve already added this pokemon!');
  }

  return data.addToDb;
};
