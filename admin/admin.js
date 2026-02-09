let jogos = [];

fetch("../jogos.json")
  .then(res => res.json())
  .then(data => {
    jogos = data;
    render();
  });

function render() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  jogos.forEach((jogo, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${jogo.nome}
      <button onclick="remover(${i})">❌</button>
    `;
    lista.appendChild(li);
  });
}

function adicionar() {
  alert("⚠️ Em Cloudflare Pages, edite o jogos.json diretamente no GitHub.");
}

function remover(index) {
  jogos.splice(index, 1);
  render();
  alert("⚠️ Remova também do jogos.json no GitHub.");
}
