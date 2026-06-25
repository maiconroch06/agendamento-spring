const SERVICOS = [
  { id: "infantil", name: "Corte Infantil", duration: 30, price: 20, icon: "../assets/images/cortes/corte-infantil.webp", alt: "corte-infantil" },
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
  etapa: document.getElementById("etapa"),
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

/* ============================================================
   ATUALIZAR VISUAL DA ETAPA
   ============================================================ */

function atualizarEtapa() {
    const itens = els.etapa.querySelectorAll(".etapa__item");

    itens.forEach((item, index) => {
        const numeroEtapa = index + 1;
        item.classList.remove("ativo", "concluido");

        if (numeroEtapa === state.currentStep) {
            item.classList.add("ativo");
        } else if (numeroEtapa < state.currentStep) {
            item.classList.add("concluido");
        }
    });
}

/* ============================================================
   AVANÇAR / VOLTAR ETAPA
   ============================================================ */

function avancarEtapa() {
    if (state.currentStep < 4) {
        state.currentStep++;
        atualizarEtapa();
    }
}

function voltarEtapa() {
    if (state.currentStep > 1) {
        state.currentStep--;
        atualizarEtapa();
    }
}

/* ============================================================
   ELEMENTOS DO FORMULÁRIO
   ============================================================ */

const form = {
    nome: document.getElementById("inp-nome"),
    tel: document.getElementById("inp-tel"),
    email: document.getElementById("inp-email"),
    consentimento: document.getElementById("inp-consentimento"),
    erroNome: document.getElementById("erro-nome"),
    erroTel: document.getElementById("erro-tel"),
    erroEmail: document.getElementById("erro-email"),
    erroConsentimento: document.getElementById("erro-consentimento"),
};

/* ============================================================
   MÁSCARA DE TELEFONE
   ============================================================ */

form.tel.addEventListener("input", () => {
    let digitos = form.tel.value.replace(/\D/g, "").slice(0, 11);

    if (digitos.length > 6) {
        digitos = digitos.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (digitos.length > 2) {
        digitos = digitos.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
        digitos = digitos.replace(/^(\d{0,2})/, "($1");
    }

    form.tel.value = digitos;
});

/* ============================================================
   VALIDAÇÃO
   ============================================================ */

function limparErro(input, erroEl) {
    input.classList.remove("invalido");
    erroEl.textContent = "";
}

function definirErro(input, erroEl, mensagem) {
    input.classList.add("invalido");
    erroEl.textContent = mensagem;
}

function validarFormulario() {
    let valido = true;

    limparErro(form.nome, form.erroNome);
    limparErro(form.tel, form.erroTel);
    limparErro(form.email, form.erroEmail);
    form.erroConsentimento.textContent = "";

    if (form.nome.value.trim().length < 3) {
        definirErro(form.nome, form.erroNome, "Informe seu nome completo");
        valido = false;
    }

    const digitos = form.tel.value.replace(/\D/g, "");
    if (digitos.length < 10) {
        definirErro(form.tel, form.erroTel, "Informe um telefone válido com DDD");
        valido = false;
    }

    const emailValor = form.email.value.trim();
    if (emailValor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValor)) {
        definirErro(form.email, form.erroEmail, "Informe um e-mail válido");
        valido = false;
    }

    if (!form.consentimento.checked) {
        form.erroConsentimento.textContent = "É necessário concordar para continuar";
        valido = false;
    }

    return valido;
}