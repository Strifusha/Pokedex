let allPokemonsList = [];
const searchInput = document.querySelector('.reach-panel');

function findPokemon(){
    let inputValue = searchInput.value.toLowerCase().trim();
  
    let filteredPokemons = allPokemonsList.filter((pokemon) => {
        if (pokemon.name.match(inputValue)){
            return pokemon  
        } 
    })

    renderPokemons(filteredPokemons);
}

searchInput.addEventListener('input', findPokemon);