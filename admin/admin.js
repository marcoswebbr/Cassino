// 🔴 TROQUE A SENHA
const SENHA_ADMIN = "1234";

let imagemBase64 = "";

// ===== LOGIN =====
function login() {
  const senha = document.getElementById("senha").value;
  if (senha === SENHA_ADMIN) {
    document.getElementById("login").style.display = "none";
    document.getElementById("painel").style.display = "block";
    carregarConfig();
    listarJogos();
  } else {
    alert("Senha incorreta");
  }
}

// ===== CONFIG RTP =====
function salvarConfig() {
  const rtpAuto = document.getElementById("rtpAuto").checked;
  localStorage.setItem("rtpAuto", rtpAuto);
  alert("Configuração salva");
}

function carregarConfig() {
  const rtpAuto = localStorage.getItem("rtpAuto") === "true";
  document.getElementById("rtpAuto").checked = rtpAuto;
}

// ===== PREVIEW DA IMAGEM =====
function previewImagem() {
  const file = document.getElementById("imagem").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    imagemBase64 = e.target.result;
    const preview = document.getElementById("preview");
    preview.src = imagemBase64;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// ===== SALVAR JOGO =====
function salvarJogo() {
  if (!imagemBase64) {
    alert("Selecione uma imagem");
    return;
  }

  let jogos = JSON.parse(localStorage.getItem("jogos")) || [];

  jogos.push({
    nome: document.getElementById("nome").value,
    provedor: document.getElementById("provedor").value,
    imagem: imagemBase64,
    link: document.getElementById("link").value,
    distribuicao: 0,
    min: 0,
    padrao: 0,
    max: 0
  });

  localStorage.setItem("jogos", JSON.stringify(jogos));

  alert("Jogo salvo com sucesso");

  // limpar
  document.getElementById("nome").value = "";
  document.getElementById("provedor").value = "";
  document.getElementById("imagem").value = "";
  document.getElementById("link").value = "";
  document.getElementById("preview").style.display = "none";
  imagemBase64 = "";

  listarJogos();
}

// ===== LISTAR JOGOS =====
function listarJogos() {
  const lista = document.getElementById("listaJogos");
  lista.innerHTML = "";

  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];

  if (jogos.length === 0) {
    lista.innerHTML = "<p>Nenhum jogo cadastrado.</p>";
    return;
  }

  jogos.forEach((jogo, index) => {
    lista.innerHTML += `
      <div class="jogo">
        <strong>${jogo.nome}</strong> (${jogo.provedor})
        <img src="${jogo.imagem}">
        <button class="danger" onclick="excluirJogo(${index})">
          Excluir
        </button>
      </div>
    `;
  });
}

// ===== EXCLUIR JOGO =====
function excluirJogo(index) {
  if (!confirm("Deseja excluir este jogo?")) return;

  let jogos = JSON.parse(localStorage.getItem("jogos")) || [];
  jogos.splice(index, 1);
  localStorage.setItem("jogos", JSON.stringify(jogos));

  listarJogos();
}