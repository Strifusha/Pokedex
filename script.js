// создать див-контейнер с фото, именем, кнопкой
// вставить покемонов в ячейки через итерацию массива
//создать массив с именами покемонов для forEach
// вставить имена под фото покемона
// повесить ивет лисенер на кнопки под фото
let allPokemonsList = [];
getPokemons();

function getPokemons(){
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0'
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
      allPokemonsList = pokemonData;
    renderPokemons(pokemonData);   
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

function showPokemonDetails(){
    //убрать бордер пока не выбран покемон в начале
    //прокручивать табло с прокруткой вниз всех покемонов
    const pokemonId = this.getAttribute("data-id");
    const infoArea = document.getElementById('big-pokemon-section');

    const currentPokemonDetails = allPokemonsList.find(pokemon => pokemon.id === +pokemonId)

    console.log(currentPokemonDetails)
    infoArea.innerHTML = `
    <h2>${currentPokemonDetails.name}</h2>
    <img src='${currentPokemonDetails.sprites.front_shiny}' alt="${currentPokemonDetails.name}">`
}


