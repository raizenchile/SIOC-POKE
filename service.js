//Generamos las constantes de cada dato del Pokemon que utilizaremos
const pkmnCard = document.getElementById("card");
const pkmnNombre = document.getElementById("nombrePkmn");
const pkmnImg = document.getElementById("imgPkmn");
const pkmnContainer = document.getElementById("imgPkmnCtn");
const pkmnId = document.getElementById("idPkmn");
const pkmnTipo = document.getElementById("tipoPkmn");
const pkmnStats = document.getElementById("statsPkmn");

//Se bloquea la tecla enter para que pinchen el botón Buscar
document.querySelector('form').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Bloquea el envío del formulario
    }
});

// Buscamos el Pokémon ingresado por el usuario al hacer clic en el botón
const buscarPokemon = () => {
    // Obtenemos el valor del campo de entrada
    const inputPokemon = document.querySelector('input[name="pokemon"]').value.trim();

    // Validamos que el usuario haya ingresado algo
    if (!inputPokemon) {
        alert("Por favor, ingrese el nombre de un Pokémon.");
        return;
    }

    // Llamamos a la API de Pokémon con el nombre ingresado
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemon.toLowerCase()}`)
        .then(data => {
            if (!data.ok) {
                throw new Error("Pokémon no encontrado");
            }
            return data.json();
        })
        .then(response => renderPkmnInfo(response))
        .catch(error => {
            console.error(error);
            alert("Pokémon no encontrado. Verifique el nombre e intente nuevamente.");
        });
};

// Conseguimos la información completa del Pokémon
const renderPkmnInfo = data => {
    // Imagen del Pokémon frontal
    const sprite = data.sprites.front_default;
    // Tipo y stats del Pokémon
    const { stats, types } = data;

    // Insertamos el nombre del Pokémon con la primera letra en mayúscula
    pkmnNombre.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pkmnImg.setAttribute('src', sprite);
    pkmnId.textContent = `N° ${data.id}`;
    renderTipoPokemon(types);
    renderStatsPokemon(stats);
};

// Conseguimos el tipo de Pokémon
const renderTipoPokemon = types => {
    pkmnTipo.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pkmnTipo.appendChild(typeTextElement);
    });
};

// Conseguimos los stats del Pokémon
const renderStatsPokemon = stats => {
    pkmnStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementNombre = document.createElement("div");
        const statElementValor = document.createElement("div");
        statElementNombre.textContent = stat.stat.name;
        statElementValor.textContent = stat.base_stat;
        statElement.appendChild(statElementNombre);
        statElement.appendChild(statElementValor);
        pkmnStats.appendChild(statElement);
    });
};

