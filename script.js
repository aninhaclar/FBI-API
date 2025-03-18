const apiUrl = "https://api.fbi.gov/wanted/v1/list";
const listContainer = document.getElementById("wanted-list");

// Elementos do modal
const modal = document.getElementById("modal");
const modalName = document.getElementById("modal-name");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const modalReward = document.getElementById("modal-reward");
const closeModal = document.querySelector(".close");

// Função para buscar dados da API
async function fetchWantedList() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWantedList(data.items);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Função para exibir os procurados
function displayWantedList(wantedList) {
    listContainer.innerHTML = "";

    wantedList.forEach(person => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = person.images?.[0]?.original || 'https://via.placeholder.com/150';
        image.alt = person.title;
        image.addEventListener("click", () => openModal(person)); // Adiciona o evento de clique APENAS na imagem

        const name = document.createElement("h3");
        name.textContent = person.title;

        card.appendChild(image);
        card.appendChild(name);
        listContainer.appendChild(card);
    });
}

// Função para abrir o modal com detalhes
function openModal(person) {
    modalName.textContent = person.title;
    modalImage.src = person.images?.[0]?.original || 'https://via.placeholder.com/150';
    modalDescription.textContent = person.description || "Sem descrição disponível.";
    modalReward.textContent = person.reward_text || "Nenhuma recompensa informada.";

    modal.style.display = "flex";
}

// Fechar o modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Iniciar busca de dados
fetchWantedList();
