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

async function getInfoByUrl(pokemonsUrl) {
  

    for (let i = 0; i < pokemonsUrl.length; i++) {
    
        let pokemonsName = pokemonsUrl[i].name;
        pokemonsInfo.push(pokemonsName);


        let result = await fetch(pokemonsUrl[i].url);
        //pokemonsInfo.push(result.url);
        //console.log(result);


         let request = await Promise.all([result.url])
         console.log(request)
        
        //     .then(pic => {
        //         fetch(pic)
        //     })
        // .then(responses => {
        //     for(let i of responses){
        //         console.log([i]);
        //     }
        // })

       
       // let pokemonsPic = await fetch(result.front_default);
            //version_group_details
        //console.log(pokemonsPic);
       

        // .then(responseStatus)
        // .then(json)
        // .then(function(data){
        //     // console.log(data)
        //     pokemonsInfo.push(data);
        // })
    }      
    renderPokemons(pokemonsInfo);   
   
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
                              <h4 class='pokemon-name'>${renderedPokemons[i]}</h4>
                          </div>`;
         getGridSection.innerHTML = allPokemons; 
    }
}

