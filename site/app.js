let jogos = [];
let favoritos = [];
let filtroAtual = "Todos";

// ===== CONFIGURAÇÃO VINDO DO PAINEL =====
const rtpAuto = localStorage.getItem("rtpAuto") !== "false";

// ===== CARREGAR JOGOS =====
const jogosAdmin = localStorage.getItem("jogos");

if (jogosAdmin) {
  jogos = JSON.parse(jogosAdmin);
  iniciar();
} else {
  fetch('data/jogos.json')
    .then(res => res.json())
    .then(data => {
      jogos = data;
      iniciar();
    });
}

// ===== INICIAR SITE =====
function iniciar() {
  atualizarRTP();
  render(jogos);

  if (rtpAuto) {
    setInterval(atualizarRTP, 180000); // 3 minutos
  }
}

// ===== GERADOR DE NÚMEROS =====
function numero(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== ATUALIZA RTP =====
function atualizarRTP() {
  jogos = jogos.map(jogo => ({
    ...jogo,
    distribuicao: numero(45, 88),
    min: numero(15, 30),
    padrao: numero(40, 75),
    max: numero(20, 60)
  }));

  aplicarFiltroAtual();
}

// ===== RENDERIZA =====
function render(lista) {
  const container = document.getElementById("lista-jogos");
  container.innerHTML = "";

  lista.forEach(j => {
    container.innerHTML += `
      <div class="card">
        <img src="${j.imagem}" alt="${j.nome}">
        <h3>${j.nome}</h3>

        <div class="info">Distribuição: <b>${j.distribuicao}%</b></div>
        <div class="info">Aposta Mínima: ${j.min}%</div>
        <div class="info">Aposta Padrão: ${j.padrao}%</div>
        <div class="info">Aposta Máxima: ${j.max}%</div>

        <button class="jogar" onclick="abrirCassino('${j.link}')">
          Jogar
        </button>
      </div>
    `;
  });
}

// ===== FILTROS =====
function filtrar(tipo) {
  filtroAtual = tipo;
  aplicarFiltroAtual();
}

function aplicarFiltroAtual() {
  if (filtroAtual === "Todos") {
    render(jogos);
  } else if (filtroAtual === "Favoritos") {
    render(favoritos);
  } else {
    render(jogos.filter(j => j.provedor === filtroAtual));
  }
}

// ===== BUSCA =====
function buscar(texto) {
  render(
    jogos.filter(j =>
      j.nome.toLowerCase().includes(texto.toLowerCase())
    )
  );
}

// ===== REDIRECIONAR PARA CASSINO =====
function abrirCassino(link) {
  window.open(link, "_blank");
}