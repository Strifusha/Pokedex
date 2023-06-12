let counter = createCounter();

const handleLoadBtn = document.getElementById('loadBtn');

function createCounter(){
    let param = 0;
    function increment (){
        return param += 12;
    }
    return increment;
} 

handleLoadBtn.addEventListener('click', () => getPokemons(counter()));
