let allPokemonsList = [];
let counter = createCounter();
const handleLoadBtn = document.getElementById('loadBtn');
const searchInput = document.querySelector('.reach-panel');

getPokemons();

function getPokemons(offset = 0){
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`;

    fetch(url) 
        .then(responseStatus)
        .then(json)
        .then(function(data){
            getInfoByUrl(data.results);
        })
        .catch(function(err){
            console.log('error -->', err)
        })
}

async function getInfoByUrl(shortPokemonList) {
  // Получить список ulr 
  // Отправить промис со всеми ссілками и получить общий ответ
    let pokemonUrs = shortPokemonList.map(item => item.url)
    
    const pokemonData = await Promise.all(

        pokemonUrs.map(async (url) => {
          const response = await fetch(url);
          const pokemonDetails = await response.json();
          return pokemonDetails;  
        })
      );
    
    allPokemonsList = [...allPokemonsList, ...pokemonData]; 
    renderPokemons(allPokemonsList);  
}

function responseStatus(response){
    if(response.status !== 200){
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response);
}

function json(response){
    return response.json();
}

const renderPokemonsTypes = types => {
    let typesHtml = '';

    for(let i = 0; i < types.length; i++){
        typesHtml += `<span class='pokemonAbility ability_${types[i].type.name}'>${types[i].type.name}</span>`          
    }

    return typesHtml;
}

function renderPokemons(renderedPokemons){
    const getGridSection = document.getElementById('pokemons-container');
    getGridSection.innerHTML = '';
    let allPokemons = '';

    for(let i = 0; i < renderedPokemons.length; i++){
          allPokemons += `<div class='grid-item' data-id='${renderedPokemons[i].id}'>
                              <img src="${renderedPokemons[i].sprites.front_default}" class='pokemon-img' alt="Pokemon's pic">
                              <h3 class='pokemon-name'>${renderedPokemons[i].name}</h3>
                              <div>${renderPokemonsTypes(renderedPokemons[i].types)}</div>
                          </div>`;
         getGridSection.innerHTML = allPokemons;
    }

    handlerMoreDetaisl();
}

function handlerMoreDetaisl() {
    const getGridItems = document.querySelectorAll('.grid-item');

    getGridItems.forEach(item => {
        item.addEventListener('click', showPokemonDetails )  
    })    
}

const renderPokemonStats = stats => {
    let statsHtml = '';
     for(let i = 0; i < stats.length; i++){
        statsHtml += `<span class='spanInfo'>${stats[i].stat.name}</span>
                      <span class='spanInfo'>${stats[i].base_stat}</span>`
     }

     return statsHtml;
}

function showPokemonDetails(){
    //убрать бордер пока не выбран покемон в начале
    //прокручивать табло с прокруткой вниз всех покемонов
    const pokemonId = this.getAttribute("data-id");
    const infoArea = document.getElementById('big-pokemon-section');

    const currentPokemonDetails = allPokemonsList.find(pokemon => pokemon.id === +pokemonId);
   
    infoArea.innerHTML = `<img src='${currentPokemonDetails.sprites.front_shiny}'  id="pokemon-big-img" alt="${currentPokemonDetails.name}">
                          <h2>${currentPokemonDetails.name}</h2>
                          <div id='pokemonFullInfo'>
                            <span class='spanInfo'>Type</span>
                            <span class='spanInfo'>${renderPokemonsTypes(currentPokemonDetails.types)}</span>
                            ${renderPokemonStats(currentPokemonDetails.stats)}
                          </div>`
}

function createCounter(){
    let param = 0;
    function increment (){
        return param += 12;
    }
    return increment;
} 

handleLoadBtn.addEventListener('click', () => getPokemons(counter()));

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
