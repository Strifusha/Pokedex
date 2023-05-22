//получить данные с сервера
// создать див-контейнер с фото, именем, кнопкой
// вставить покемонов в ячейки через итерацию массива
//создать массив с именами покемонов для forEach
// вставить имена под фото покемона
// повесить ивет лисенер на кнопки под фото

let allPokemons = '';
let pokemons = [];
getPokemons()

function responseStatus(response){
    if(response.status !== 200){
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response);
}

function json(response){
    return response.json();
}

function getPokemons(){
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=12')
        .then(responseStatus)
        .then(json)
        .then(function(data){
            const dataResults = data.results;
            pokemons.push(...dataResults);
            renderPokemons();
        })
        .catch(function(err){
            console.log('error -->', err)
        })
}

console.log(pokemons)

function renderPokemons(renderPokemons){
    const getGridSection = document.getElementById('pokemons-container');
    getGridSection.innerHTML = '';

    for(let i = 0; i < renderPokemons.length; i++){
        console.log(i)
        // allPokemons = `<div class='grid-item'>
        //                     <h4 class='pokemon-name'>${renderPokemons[i].name}</h4>
        //                     <button class='showInfo'></button>
        //                 </div>`;
        // getGridSection.innerHTML += allPokemons; 
    }

}
