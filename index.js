async function fetchData() {
  const name = document.querySelector(".pokemonName").value.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const promise = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );

    if (!response.ok && !promise.ok) {
      throw new Error("Could not get Pokemon data");
    }

    const data = await response.json();
    const data2 = await promise.json();
    pokemonSprtie = data.sprites.other.home.front_default;

    const types = data.types;
    const gen = data2.generation.name;
    console.log(data);
    console.log(data2);

    let html = `<img src="${pokemonSprtie}" alt="pokemonsprite" class="pokemonimg" />
    <h1 class="pokeName">  ${name}</h1>
    <p class = "gen" >${gen}</p>`;

    const targetDiv = document.querySelector(".card");
    targetDiv.innerHTML = html;

    show();
  } catch (error) {
    console.error(error);
    showError();
  }
}

function showError() {
  const errorStatement = document.querySelector(".error");
  errorStatement.style.display = "block";
  errorStatement.style.color = "red";
}

function show() {
  const image = document.querySelector(".details");
}
