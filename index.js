async function fetchData() {
  const name = document.querySelector(".pokemonName").value.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const promise = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );

    const targetDiv = document.querySelector(".card");
    if (!response.ok && !promise.ok) {
      throw new Error("Could not get Pokemon data");
    }

    const data = await response.json();
    const data2 = await promise.json();
    console.log(data);
    console.log(data2);

    pokemonSprtie = data.sprites.other.home.front_default;
    const gen = data2.generation.name;
    const hp = data.stats[0].base_stat;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    targetDiv.innerHTML = `<p><span>HP: </span>${hp}</p>
    <img src="${pokemonSprtie}" alt="pokemonsprite" class="pokemonimg" />
    <h1 class="pokeName">  ${name}</h1>
    <p class = "gen" >${gen}</p>
    <div class="stats">
    <div>
      <h3>${statAttack}</h3>
      <p>Attack</p>
    </div>
    <div>
      <h3>${statDefense}</h3>
      <p>Defense</p>
    </div>
    <div>
      <h3>${statSpeed}</h3>
      <p>Speed</p>
    </div>
  </div>`;
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
