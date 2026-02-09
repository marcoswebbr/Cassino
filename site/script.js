document.addEventListener('DOMContentLoaded', () => {
    // 1. TODOS OS SEUS DADOS FICAM AQUI DENTRO.
    const jsonData = [
        {
            "nome": "Fortune Tiger",
            "provedor": "PG",
            "distribuicao": 77,
            "min": 23,
            "padrao": 74,
            "max": 53,
            "imagem": "assets/Fortune Tiger.jpg",
            "link": "https://www.fixe777.bet/?id=680185881"
        },
        {
            "nome": "Ultimate Striker",
            "provedor": "PG",
            "distribuicao": 56,
            "min": 19,
            "padrao": 53,
            "max": 28,
            "imagem": "assets/striker.jpg",
            "link": "https://OUTROCASSINO.com/?af=456"
        }
        // Copie e cole mais blocos de jogo aqui, seguindo o padrão acima,
        // garantindo que o penúltimo objeto tenha uma vírgula no final.
    ];
    // FIM DA ÁREA DE DADOS.

    const gameContainer = document.getElementById('game-container');

    // Função para criar o elemento HTML do card (incomodada)
    function createGameCard(game) {
        const cardLink = document.createElement('a');
        cardLink.href = game.link;
        cardLink.classList.add('game-card');
        cardLink.setAttribute('target', '_blank');

        cardLink.innerHTML = `
            <div class="card-content">
                <img src="${game.imagem}" alt="${game.nome}">
                <!-- Exemplo: usa a distribuicao para decidir se mostra o selo NOVO -->
                ${game.distribuicao > 70 ? '<span class="badge-novo">NOVO</span>' : ''}
            </div>
            <div class="card-footer">
                <h3>${game.nome}</h3>
                <p>${game.provedor}</p>
            </div>
        `;
        
        return cardLink;
    }

    // Itera sobre os dados locais e renderiza os cards
    jsonData.forEach(game => {
        const card = createGameCard(game);
        gameContainer.appendChild(card);
    });
});
