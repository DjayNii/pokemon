async function fetchData() {
  const name = document.querySelector(".pokemonName").value.toLowerCase();

  // colors for types
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#9a8c98",
    dark: "#22223b",
  };

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const promise = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );

    if (!response.ok && !promise.ok) {
      throw new Error("Could not get Pokemon data");
    }

    const targetDiv = document.querySelector(".card");
    const targetDiv2 = document.querySelector(".conatiner");

    // converting api responces into json
    const data = await response.json();
    const data2 = await promise.json();

    console.log(data);
    console.log(data2);

    // getting all important data from api
    const pokemonSprtie = data.sprites.other.home.front_default;
    const gen = data2.generation.name;
    const hp = data.stats[0].base_stat;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const type = data.types;
    const themeColor = typeColor[data.types[0].type.name];

    let appendType = (types) => {
      types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
      });
    };

    // it  sets a semi circle at background and sets background colour for according to type
    let styleCard = (color) => {
      targetDiv.style.background = `radial-gradient(circle 15rem at 50% 1%, ${color} 6%, #ffffff 36%)`;
      targetDiv2.style.background = `linear-gradient(to top right,${color} , #000000)`;
      targetDiv.querySelectorAll(".types span").forEach((typeColor) => {
        typeColor.style.backgroundColor = color;
      });
    };

    // html which goes into card div
    targetDiv.innerHTML = `<p><span>HP: </span>${hp}</p>
    <img src="${pokemonSprtie}" alt="pokemonsprite" class="pokemonimg" />
    <h1 class="pokeName">  ${name}</h1>
    <p class = "gen" >${gen}</p>
    <div class = "types">   </div>
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

    appendType(type);
    styleCard(themeColor);
  } catch (error) {
    console.error(error);
    showError();
  }
}

function showError() {
  const errorStatement = document.createElement("h2");
  const statement = "pokemon not found";
  errorStatement.textContent = statement;
  document.querySelector(".error").appendChild(errorStatement);
}
