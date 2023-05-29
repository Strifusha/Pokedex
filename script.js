// создать див-контейнер с фото, именем, кнопкой
// вставить покемонов в ячейки через итерацию массива
//создать массив с именами покемонов для forEach
// вставить имена под фото покемона
// повесить ивет лисенер на кнопки под фото

getPokemons();

function getPokemons(){
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=12'
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
        //console.log(renderedPokemons[i])
        // const types = renderedPokemons[i].types.flatMap(obj => Object.values(obj.type.name));
        // for(let i = 0; i < types.length; i++){
        //     console.log(types)
        // }
        ///////
        //const types = renderPokemons[i].types.map(obj => Object.values(obj)[0].type.name);
        //console.log(types)

        
          allPokemons += `<div class='grid-item'>
                              <img src="${renderedPokemons[i].sprites.front_default}" class='pokemon-img' alt="Pokemon's pic">
                              <h3 class='pokemon-name'>${renderedPokemons[i].name}</h3>
                              <span class='pokemonAbility'>${renderedPokemons[i].types[0].type.name}</span>
                          </div>`;
         getGridSection.innerHTML = allPokemons;
    }

    //adding colours to abilities
    const pokemonTypes = document.getElementsByClassName('pokemonAbility');

    for(let i = 0; i < pokemonTypes.length; i++){

        if(pokemonTypes[i].innerHTML == 'grass'){
            pokemonTypes[i].style.backgroundColor = 'rgb(31, 217, 155)';
        }
        if(pokemonTypes[i].innerHTML == 'fire'){
            pokemonTypes[i].style.backgroundColor = 'rgb(243, 40, 40)';
        }
        if(pokemonTypes[i].innerHTML == 'poison'){
            pokemonTypes[i].style.backgroundColor = 'rgb(126, 34, 238)';
        }
        if(pokemonTypes[i].innerHTML == 'electric'){
            pokemonTypes[i].style.backgroundColor = 'rgb(237, 250, 53)';
        }
        if(pokemonTypes[i].innerHTML == 'water'){
            pokemonTypes[i].style.backgroundColor = 'aqua';
        }
        if(pokemonTypes[i].innerHTML == 'bug'){
            pokemonTypes[i].style.backgroundColor = 'rgb(129, 87, 87)';
        }
    }
    showPokemonDetails()
}

    
function showPokemonDetails(){
    //убрать бордер пока не выбран покемон в начале
    //прокручивать табло с прокруткой вниз всех покемонов

    const getGridItems = document.querySelectorAll('.grid-item');
    const infoArea = document.getElementById('big-pokemon-section');
    infoArea.innerHTML = '';
    let moreDatails ='';

    getGridItems.forEach(item => {
        item.addEventListener('click', () => {
            
            //console.log(renderPokemons[item].name);
            
            if(item) { 
                //console.log(item.children);
                moreDatails = `<img src='${item.children[0].src}' class="pokemon-big-img" alt="Pokemon's pic">
                <h2 class='pokemon-name'>${item.children[1].outerText}</h2>
                `
                infoArea.innerHTML = moreDatails; 

            }     
        })  
    })    
}


