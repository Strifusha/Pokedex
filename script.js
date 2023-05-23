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
            // console.log(data.results)
            getInfoByUrl(data.results);
        })
        .catch(function(err){
            console.log('error -->', err)
        })
}

async function getInfoByUrl(pokemonsUrl) {

    for (let i = 0; i < pokemonsUrl.length; i++) {
        
        // console.log(pokemonsUrl[i].url)
        const result = await fetch(pokemonsUrl[i].url)
        // .then(responseStatus)
        // .then(json)
        // .then(function(data){
        //     // console.log(data)
        //     pokemonsInfo.push(data);
        // })
    
    }


}
console.log(pokemonsInfo)
function responseStatus(response){
    if(response.status !== 200){
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response);
}

function json(response){
    return response.json();
}


function renderPokemons(renderPokemons){
    const getGridSection = document.getElementById('pokemons-container');
    getGridSection.innerHTML = '';
    let allPokemons = '';
    console.log(renderPokemons)
    for(let i = 0; i < renderPokemons.length; i++){
        // console.log(i)
        // allPokemons += `<div class='grid-item'>
        //                     <h4 class='pokemon-name'>${renderPokemons[i].name}</h4>
        //                     <button class='showInfo'></button>
        //                 </div>`;
        // getGridSection.innerHTML = allPokemons; 
    }

}
