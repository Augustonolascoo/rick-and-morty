document.getElementById("fetch-users").addEventListener("click", fetchCharacters);

async function fetchCharacters() {
    const userContainer = document.getElementById("user-container");
    userContainer.innerHTML = ""; 
    try {
       
        const responseTotal = await fetch("https://rickandmortyapi.com/api/character");
        const totalData = await responseTotal.json();
        const totalCharacters = totalData.info.count; 

        const characterIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * totalCharacters) + 1);

        const characterResponses = await Promise.all(characterIds.map(id => fetch(`https://rickandmortyapi.com/api/character/${id}`)));
        const characters = await Promise.all(characterResponses.map(res => res.json()));

        characters.forEach(character => {
            const characterDiv = document.createElement("div");
            characterDiv.classList.add("character");

            characterDiv.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p>Status: ${character.status}</p>
                <p>Espécie: ${character.species}</p>
                <p>Gênero: ${character.gender}</p>
            `;

            userContainer.appendChild(characterDiv);
        });
    } catch (error) {
        console.error("Erro ao buscar personagens:", error);
    }
}
