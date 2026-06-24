const SERVICOS = [
  { id: "infantil", name: "Corte infantil", duration: 30, price: 20, icon: "../assets/images/cortes/corte-infantil.webp", alt: "corte-infantil" },
  { id: "social", name: "Corte Social", duration: 30, price: 18, icon: "../assets/images/cortes/corte-social.png", alt: "corte-social" },
  { id: "social&barba", name: "Social & Barba", duration: 50, price: 30, icon: "../assets/images/cortes/corte-social&barba.png", alt: "corte-social&barba.png" },
  { id: "degrade", name: "Degradê", duration: 40, price: 22, icon: "../assets/images/cortes/corte-degradê.png", alt: "corte-degradê.png" },
  { id: "degrade&barba", name: "Degradê & Barba", duration: 60, price: 30, icon: "../assets/images/cortes/corte-degradê&barba.png", alt: "corte-degradê&barba.png" },
  { id: "militar", name: "Corte Militar", duration: 20, price: 15, icon: "../assets/images/cortes/corte-militar.png", alt: "corte-militar.png" },
  { id: "barba", name: "Barba", duration: 25, price: 15, icon: "../assets/images/cortes/corte-barba.png", alt: "corte-barba" },
  { id: "sobrancelha", name: "Sobrancelha", duration: 5, price: 15, icon: "../assets/images/cortes/sombrancelha.png", alt: "sombrancelha" },
];

const PROFISSIONAIS = [
  { id: "any", name: "Sem preferência", description: "Qualquer profissional disponível", icon: "", alt: "" },
  { id: "maicon", name: "Maicon", description: "Barbeiro sênior", icon: "../assets/images/funcionarios/maicon.jpg", alt: "maicon" },
  { id: "maik", name: "Maik", description: "Barbeiro", icon: "../assets/images/funcionarios/maik.jpg", alt: "maik" },
  { id: "anny", name: "Anny", description: "Especialista em sobrancelhas", icon: "", alt: "" },
];

/* ============================================================
   ESTADO
   ============================================================ */

const state = {
  currentStep: 1,
  service: null,
  profissional: null,
  dayIndex: null,
  time: null,
};

/* ============================================================
   ELEMENTOS
   ============================================================ */

const els = {
  etapa = document.getElementById("etapa"),
  listaServico: document.getElementById("lista-servico"),
  listaProfissionais: document.getElementById("lista-profissionais")
};

/* ============================================================
   CARREGAR: ETAPA 1 — SERVIÇOS
   ============================================================ */

function carregarServicos() {
  els.listaServico.innerHTML = SERVICOS.map(service => `
    <input type="radio" name="imputCorte" id="${service.id}" value="${service.alt}">
    <label class="card" for="${service.id}">
        <span class="icon">
            <img src="${service.icon}" alt="${service.alt}">
        </span>
        <span class="titulo">
            <span>${service.name}</span>
        </span>
        <span class="dados">
            <span>${service.price} min</span>
            <span>R$${service.price.toFixed(2).replace(".", ",")}</spap>
        </span>
    </label>
  `).join("");
}

/* ============================================================
   CARREGAR: ETAPA 2 — PROFISSIONAIS
   ============================================================ /// */

function carregarProfissionais() {
  els.listaProfissionais.innerHTML = PROFISSIONAIS.map(professional => `
    <input type="radio" name="inputFuncionarios" id="${professional.id}" value="${professional.alt}">
        <label class="card" for="${professional.id}">
            <img src="${professional.icon}" alt="${professional.alt}">
            <h4>${professional.name}</h4>
        </label>
  `).join("");
}

carregarServicos();
carregarProfissionais();

function atualizarEtapa() {

}