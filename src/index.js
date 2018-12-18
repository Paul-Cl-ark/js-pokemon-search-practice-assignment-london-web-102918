document.addEventListener('DOMContentLoaded', () => {
  console.log(pokemonArray)
  getAllPokemon()
})

const apiURL = 'http://localhost:3000/pokemon'
const pokeContainer = document.querySelector('#pokemon-container')
const pokeSearchBar = document.querySelector('#pokemon-search-form')
pokeSearchBar.addEventListener('input', filterPokemon)
let pokemonArray

//YOUR CODE HERE
function getAllPokemon () {
  fetch(apiURL)
    .then(response => response.json())
    .then(json => {
      pokemonArray = json
      console.log('Hello')
      showAllPokemon (json)
    })
}

function showAllPokemon(allPokemon) {
  for (const pokemon of allPokemon) {
    showSinglePokemon(pokemon)
  }
}

function showSinglePokemon(pokemon) {
  let pokeOuterDiv = document.createElement('div')
  pokeOuterDiv.setAttribute('class', 'pokemon-container')
  let pokeInnerDiv = document.createElement('div')
  pokeInnerDiv.setAttribute('class', 'pokemon-frame')
  pokeInnerDiv.setAttribute('style', 'width:230px;margin:10px;background:#fecd2f;color:#2d72fc')
  pokeInnerDiv.innerHTML = `
  <h1 class="center-text">${pokemon.name}</h1>
  `
  let pokeImage = document.createElement('img')
  let pokeImageFrontSrc = pokemon.sprites.front
  let pokeImageBackSrc = pokemon.sprites.back
  pokeImage.setAttribute('src', pokeImageFrontSrc)
  pokeImage.setAttribute('data-id', `${pokemon.id}`)
  pokeImage.setAttribute('data-action', 'flip')
  pokeImage.setAttribute('class', 'toggle-sprite')
  pokeImage.addEventListener('click', function () {
    if (pokeImage.getAttribute('src') === pokeImageFrontSrc) {
      pokeImage.setAttribute('src', pokeImageBackSrc)
    } else {
      pokeImage.setAttribute('src', pokeImageFrontSrc)
    }
  })
  pokeInnerDiv.appendChild(pokeImage)
  pokeContainer.appendChild(pokeOuterDiv)
  pokeOuterDiv.appendChild(pokeInnerDiv)
}

function filterPokemon (event) {
  // debugger
  let pokemonCards = document.querySelectorAll('.pokemon-container')
  pokemonCards.forEach(card => {
    const name = card.querySelector('h1').innerText
    if (name.includes(event.target.value)) {
      card.style.display = ''
    } else {
      card.style.display = 'none'
    }
  })
}
