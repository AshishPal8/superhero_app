// https://superheroapi.com/api/1589944025142680
const BASE_URL = "https://superheroapi.com/api.php/1589944025142680";
const superHeroDiv = document.getElementById("superhero");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const newHeroButton = document.getElementById("newHeroButton");

const superHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const superHero = json;
      showHeroInfo(superHero);
    });
};

const statToEmoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️",
  power: "💥",
  combat: "⚔️",
};

const showHeroInfo = (charactor) => {
  const name = `<h2>${charactor.name}</h2>`;
  const img = `<img src=${charactor.image.url} />`;
  const stats = Object.keys(charactor.powerstats)
    .map((stat) => {
      return `<p>${statToEmoji[stat]}${stat.toUpperCase()}: ${
        charactor.powerstats[stat]
      }</p>`;
    })
    .join("");
  superHeroDiv.innerHTML = `${img}<div>${name}${stats}</div>`;
};

const getSearchInputHero = (name) => {
  console.log(searchInput.value);
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      showHeroInfo(hero);
    });
};

const randomHero = () => {
  const numberOfHeros = 731;
  return Math.floor(Math.random() * numberOfHeros) + 1;
};
newHeroButton.onclick = () => superHero(randomHero());
searchButton.onclick = () => {
  getSearchInputHero(searchInput.value);
  searchInput.value = "";
};
