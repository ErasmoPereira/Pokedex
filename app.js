const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((__, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generatHTML = pokemons => pokemons.reduce((acumulator, {name, id, types}) =>{
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    acumulator += `
        <li class="card ${types[0]}">
            <img class= "card-image"  alt="${name}" src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg" />
            <h2 cass="card-title"> ${id}. ${name}</h2>
            <p class="card-subtitle"> ${elementTypes.join(' | ')}</p>
        </li>`
    return acumulator
    }, '')


const insertPokemonsIntoPage = pokemons=> {
    const ul = document.querySelector('[data-js="pokedex"]')

   ul.innerHTML = pokemons
    
}


    
const pokemonPromises = generatePokemonPromises()



Promise.all(pokemonPromises)
    .then(generatHTML)
    .then(insertPokemonsIntoPage)



