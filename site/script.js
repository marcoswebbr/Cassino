document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    // Função para criar o elemento HTML do card (a mesma de antes)
    function createGameCard(game) {
        const cardLink = document.createElement('a');
        cardLink.href = game.link;
        cardLink.classList.add('game-card');
        cardLink.setAttribute('target', '_blank');

        cardLink.innerHTML = `
            <div class="card-content">
                <img src="${game.image}" alt="${game.name}">
                ${game.isNew ? '<span class="badge-novo">NOVO</span>' : ''}
            </div>
            <div class="card-footer">
                <h3>${game.name}</h3>
                <p>${game.details}</p>
            </div>
        `;
        
        return cardLink;
    }

    // Usa fetch() para carregar o JSON do arquivo externo
    fetch('jogos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar os dados dos jogos.');
            }
            return response.json();
        })
        .then(games => {
            // Itera sobre os dados e renderiza os cards
            games.forEach(game => {
                const card = createGameCard(game);
                gameContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar jogos:', error);
            gameContainer.innerHTML = '<p>Ocorreu um erro ao carregar os jogos. Tente novamente mais tarde.</p>';
        });
});
