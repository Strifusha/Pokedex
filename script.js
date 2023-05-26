//получить данные с сервера
// создать див-контейнер с фото, именем, кнопкой
// вставить покемонов в ячейки через итерацию массива
//создать массив с именами покемонов для forEach
// вставить имена под фото покемона
// повесить ивет лисенер на кнопки под фото

getPokemons();
let pokemonsInfo = [];


function getPokemons(){
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=12'
    fetch(url)
        .then(responseStatus)
        .then(json)
        .then(function(data){
            //console.log(data.results)
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

    console.log('pokemonUrs--> ', pokemonUrs);

    const pokemonData = await Promise.all(
        pokemonUrs.map(async (url) => {
          const response = await fetch(url);
          const pokemonDetails = await response.json();
          return pokemonDetails;
        })
      );

        console.log('pokemonData', pokemonData)
    
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


function renderPokemons(renderedPokemons){
    const getGridSection = document.getElementById('pokemons-container');
    getGridSection.innerHTML = '';
    let allPokemons = '';
   
    for(let i = 0; i < renderedPokemons.length; i++){
        
          allPokemons += `<div class='grid-item'>
                              <img src="${renderedPokemons[i].sprites.front_default}" alt="">
                              <h4 class='pokemon-name'>${renderedPokemons[i].name}</h4>
                          </div>`;
         getGridSection.innerHTML = allPokemons; 
    }
}

