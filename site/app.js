fetch("../jogos.json")
  .then(res => res.json())
  .then(jogos => {
    const container = document.getElementById("jogos");
    container.innerHTML = "";

    jogos
      .filter(j => j.ativo)
      .forEach(jogo => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${jogo.imagem}">
          <h3>${jogo.nome}</h3>
          <button onclick="window.location.href='${jogo.link}'">
            Jogar
          </button>
        `;

        container.appendChild(card);
      });
  })
  .catch(err => {
    console.error("Erro ao carregar jogos:", err);
  });
