/* ============================================================
   ESTADO GLOBAL
   ============================================================ */

const app = {
    usuario: null,
    empresa: null,
    servicos: [],
    profissionais: [],
    codigoAcesso: null,
};

/* ============================================================
   UTILITÁRIOS
   ============================================================ */

function mostrarAviso(msg) {
    const el = document.getElementById("aviso");
    el.textContent = msg;
    el.classList.add("visivel");
    setTimeout(() => el.classList.remove("visivel"), 2500);
}

function irParaTela(id) {
    document.querySelectorAll(".tela").forEach(t => {
        t.classList.remove("ativa");
        t.hidden = true;
    });
    const tela = document.getElementById(id);
    tela.hidden = false;
    tela.classList.add("ativa");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function limparErro(inputId, erroId) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById(erroId);
    if (input) input.classList.remove("invalido");
    if (erro) erro.textContent = "";
}

function definirErro(inputId, erroId, msg) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById(erroId);
    if (input) input.classList.add("invalido");
    if (erro) erro.textContent = msg;
}

function lerArquivoBase64(input) {
    return new Promise((resolve) => {
        const arquivo = input.files[0];
        if (!arquivo) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(arquivo);
    });
}

function gerarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ============================================================
   ABAS DE AUTH
   ============================================================ */



document.querySelectorAll(".auth-aba").forEach(aba => {
    aba.addEventListener("click", () => {
        document.querySelectorAll(".auth-aba").forEach(a => a.classList.remove("ativa"));
        aba.classList.add("ativa");

        const qual = aba.dataset.aba;
        document.getElementById("form-login").hidden = qual !== "login";
        document.getElementById("form-cadastro").hidden = qual !== "cadastro";
    });
});

/* ============================================================
   DIAS DE FUNCIONAMENTO
   ============================================================ */

document.querySelectorAll(".dia-btn").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("ativo"));
});

/* ============================================================
   MÁSCARA CNPJ
   ============================================================ */

function aplicarMascaraCnpj(input) {
    input.addEventListener("input", () => {
        let v = input.value.replace(/\D/g, "").slice(0, 14);
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
        input.value = v;
    });
}

aplicarMascaraCnpj(document.getElementById("emp-cnpj"));
aplicarMascaraCnpj(document.getElementById("edit-emp-cnpj"));

/* ============================================================
   TELA 1: LOGIN
   ============================================================ */

function fazerLogin() {
    const usuario = document.getElementById("login-usuario").value.trim();
    const senha = document.getElementById("login-senha").value;
    let valido = true;

    limparErro("login-usuario", "erro-login-usuario");
    limparErro("login-senha", "erro-login-senha");

    if (!usuario) { definirErro("login-usuario", "erro-login-usuario", "Informe seu usuário ou e-mail"); valido = false; }
    if (!senha) { definirErro("login-senha", "erro-login-senha", "Informe sua senha"); valido = false; }
    if (!valido) return;

    // Simulação de login
    app.usuario = { nome: usuario };
    document.getElementById("nome-boas-vindas").textContent = usuario;
    irParaTela("tela-tipo");
}

/* ============================================================
   TELA 1: CADASTRO
   ============================================================ */

function fazerCadastro() {
    const nome = document.getElementById("cad-nome").value.trim();
    const email = document.getElementById("cad-email").value.trim();
    const senha = document.getElementById("cad-senha").value;
    const confirmar = document.getElementById("cad-confirmar").value;
    let valido = true;

    ["cad-nome","cad-email","cad-senha","cad-confirmar"].forEach((id, i) => {
        limparErro(id, ["erro-cad-nome","erro-cad-email","erro-cad-senha","erro-cad-confirmar"][i]);
    });

    if (nome.length < 3) { definirErro("cad-nome", "erro-cad-nome", "Nome deve ter ao menos 3 caracteres"); valido = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { definirErro("cad-email", "erro-cad-email", "Informe um e-mail válido"); valido = false; }
    if (senha.length < 6) { definirErro("cad-senha", "erro-cad-senha", "Senha deve ter ao menos 6 caracteres"); valido = false; }
    if (senha !== confirmar) { definirErro("cad-confirmar", "erro-cad-confirmar", "As senhas não coincidem"); valido = false; }
    if (!valido) return;

    app.usuario = { nome, email };
    document.getElementById("nome-boas-vindas").textContent = nome;
    irParaTela("tela-tipo");
}

/* ============================================================
   TELA 2: TIPO DE USUÁRIO
   ============================================================ */

function escolherTipo(tipo) {
    if (tipo === "admin") {
        irParaTela("tela-empresa");
    } else {
        mostrarAviso("Acesso de funcionário será desenvolvido em breve");
    }
}

/* ============================================================
   TELA 3: DADOS DA EMPRESA
   ============================================================ */

function salvarEmpresa() {
    const nome = document.getElementById("emp-nome").value.trim();
    const categoria = document.getElementById("emp-categoria").value;
    const cnpj = document.getElementById("emp-cnpj").value.trim();
    const abertura = document.getElementById("emp-abertura").value;
    const fechamento = document.getElementById("emp-fechamento").value;

    if (!nome) { mostrarAviso("Informe o nome da empresa"); return; }
    if (!categoria) { mostrarAviso("Selecione uma categoria"); return; }
    if (!cnpj) { mostrarAviso("Informe o CNPJ"); return; }

    const diasAtivos = [...document.querySelectorAll(".dia-btn.ativo")].map(b => b.dataset.dia);

    app.empresa = { nome, categoria, cnpj, abertura, fechamento, dias: diasAtivos };
    irParaTela("tela-servicos");
}

/* ============================================================
   TELA 4: SERVIÇOS (cadastro)
   ============================================================ */

async function adicionarServico() {
    const nome = document.getElementById("srv-nome").value.trim();
    const preco = parseFloat(document.getElementById("srv-preco").value);
    const tempo = parseInt(document.getElementById("srv-tempo").value);
    const fotoInput = document.getElementById("srv-foto");

    if (!nome) { mostrarAviso("Informe o nome do serviço"); return; }
    if (isNaN(preco) || preco < 0) { mostrarAviso("Informe um preço válido"); return; }
    if (isNaN(tempo) || tempo < 5) { mostrarAviso("Informe uma duração válida"); return; }

    const foto = await lerArquivoBase64(fotoInput);
    const servico = { id: gerarIdUnico(), nome, preco, tempo, foto };
    app.servicos.push(servico);

    document.getElementById("srv-nome").value = "";
    document.getElementById("srv-preco").value = "";
    document.getElementById("srv-tempo").value = "";
    fotoInput.value = "";

    renderizarCardsServicos("lista-cards-servicos", app.servicos, "vazia-servicos");
}

function renderizarCardsServicos(containerId, lista, vaziaId) {
    const container = document.getElementById(containerId);
    const vaziaEl = vaziaId ? document.getElementById(vaziaId) : null;

    if (lista.length === 0) {
        container.innerHTML = "";
        if (vaziaEl) container.appendChild(vaziaEl);
        if (vaziaEl) vaziaEl.style.display = "block";
        return;
    }

    if (vaziaEl) vaziaEl.style.display = "none";

    container.innerHTML = lista.map((s, idx) => `
        <div class="item-card" data-id="${s.id}">
            <div class="ordem-btns">
                <button class="ordem-btn" onclick="moverItem('servico', '${s.id}', -1)" title="Subir">▲</button>
                <button class="ordem-btn" onclick="moverItem('servico', '${s.id}', 1)" title="Descer">▼</button>
            </div>
            ${s.foto
                ? `<img class="item-card__foto" src="${s.foto}" alt="${s.nome}">`
                : `<div class="item-card__foto-placeholder">✂️</div>`
            }
            <div class="item-card__nome">${s.nome}</div>
            <div class="item-card__meta">
                <span>${s.tempo} min</span>
                <span>R$ ${s.preco.toFixed(2).replace(".", ",")}</span>
            </div>
            <div class="item-card__acoes">
                <button onclick="editarServico('${s.id}')">Editar</button>
                <button class="btn-remover" onclick="removerServico('${s.id}')">Remover</button>
            </div>
        </div>
    `).join("");
}

function removerServico(id) {
    app.servicos = app.servicos.filter(s => s.id !== id);
    renderizarCardsServicos("lista-cards-servicos", app.servicos, "vazia-servicos");
    sincronizarPainel();
}

function editarServico(id) {
    const s = app.servicos.find(s => s.id === id);
    if (!s) return;
    const novoNome = prompt("Nome do serviço:", s.nome);
    if (novoNome !== null && novoNome.trim()) s.nome = novoNome.trim();
    const novoPreco = prompt("Preço (R$):", s.preco);
    if (novoPreco !== null && !isNaN(parseFloat(novoPreco))) s.preco = parseFloat(novoPreco);
    const novoTempo = prompt("Duração (min):", s.tempo);
    if (novoTempo !== null && !isNaN(parseInt(novoTempo))) s.tempo = parseInt(novoTempo);
    renderizarCardsServicos("lista-cards-servicos", app.servicos, "vazia-servicos");
    sincronizarPainel();
}

function moverItem(tipo, id, direcao) {
    const lista = tipo === "servico" ? app.servicos : app.profissionais;
    const idx = lista.findIndex(i => i.id === id);
    const novoIdx = idx + direcao;
    if (novoIdx < 0 || novoIdx >= lista.length) return;
    [lista[idx], lista[novoIdx]] = [lista[novoIdx], lista[idx]];
    if (tipo === "servico") {
        renderizarCardsServicos("lista-cards-servicos", app.servicos, "vazia-servicos");
        sincronizarPainel();
    } else {
        renderizarCardsProfissionais("lista-cards-profissionais", app.profissionais, "vazia-profissionais");
        sincronizarPainel();
    }
}

function salvarServicos() {
    irParaTela("tela-profissionais");
}

/* ============================================================
   TELA 5: PROFISSIONAIS (cadastro)
   ============================================================ */

async function adicionarProfissional() {
    const nome = document.getElementById("pro-nome").value.trim();
    const cargo = document.getElementById("pro-cargo").value.trim();
    const fotoInput = document.getElementById("pro-foto");

    if (!nome) { mostrarAviso("Informe o nome do profissional"); return; }
    if (!cargo) { mostrarAviso("Informe o cargo do profissional"); return; }

    const foto = await lerArquivoBase64(fotoInput);
    const profissional = { id: gerarIdUnico(), nome, cargo, foto };
    app.profissionais.push(profissional);

    document.getElementById("pro-nome").value = "";
    document.getElementById("pro-cargo").value = "";
    fotoInput.value = "";

    renderizarCardsProfissionais("lista-cards-profissionais", app.profissionais, "vazia-profissionais");
}

function renderizarCardsProfissionais(containerId, lista, vaziaId) {
    const container = document.getElementById(containerId);
    const vaziaEl = vaziaId ? document.getElementById(vaziaId) : null;

    if (lista.length === 0) {
        container.innerHTML = "";
        if (vaziaEl) container.appendChild(vaziaEl);
        if (vaziaEl) vaziaEl.style.display = "block";
        return;
    }

    if (vaziaEl) vaziaEl.style.display = "none";

    container.innerHTML = lista.map((p, idx) => `
        <div class="item-card" data-id="${p.id}">
            <div class="ordem-btns">
                <button class="ordem-btn" onclick="moverItem('profissional', '${p.id}', -1)" title="Subir">▲</button>
                <button class="ordem-btn" onclick="moverItem('profissional', '${p.id}', 1)" title="Descer">▼</button>
            </div>
            ${p.foto
                ? `<img class="item-card__foto" src="${p.foto}" alt="${p.nome}">`
                : `<div class="item-card__foto-placeholder">👤</div>`
            }
            <div class="item-card__nome">${p.nome}</div>
            <div class="item-card__meta" style="justify-content:center">
                <span>${p.cargo}</span>
            </div>
            <div class="item-card__acoes">
                <button onclick="editarProfissional('${p.id}')">Editar</button>
                <button class="btn-remover" onclick="removerProfissional('${p.id}')">Remover</button>
            </div>
        </div>
    `).join("");
}

function removerProfissional(id) {
    app.profissionais = app.profissionais.filter(p => p.id !== id);
    renderizarCardsProfissionais("lista-cards-profissionais", app.profissionais, "vazia-profissionais");
    sincronizarPainel();
}

function editarProfissional(id) {
    const p = app.profissionais.find(p => p.id === id);
    if (!p) return;
    const novoNome = prompt("Nome do profissional:", p.nome);
    if (novoNome !== null && novoNome.trim()) p.nome = novoNome.trim();
    const novoCargo = prompt("Cargo:", p.cargo);
    if (novoCargo !== null && novoCargo.trim()) p.cargo = novoCargo.trim();
    renderizarCardsProfissionais("lista-cards-profissionais", app.profissionais, "vazia-profissionais");
    sincronizarPainel();
}

function salvarProfissionais() {
    app.codigoAcesso = gerarCodigoAcesso();
    preencherPainel();
    irParaTela("tela-painel");
}

/* ============================================================
   TELA 6: PAINEL
   ============================================================ */

function gerarCodigoAcesso() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
        if (i === 4) codigo += "-";
        codigo += chars[Math.floor(Math.random() * chars.length)];
    }
    return codigo;
}

function gerarCodigo() {
    app.codigoAcesso = gerarCodigoAcesso();
    document.getElementById("codigo-acesso").textContent = app.codigoAcesso;
    mostrarAviso("Novo código gerado!");
}

function copiarCodigo() {
    if (!app.codigoAcesso) return;
    navigator.clipboard.writeText(app.codigoAcesso)
        .then(() => mostrarAviso("Código copiado!"))
        .catch(() => mostrarAviso("Não foi possível copiar automaticamente"));
}

function preencherPainel() {
    const emp = app.empresa;
    if (!emp) return;

    document.getElementById("sidebar-nome-empresa").textContent = emp.nome;
    document.getElementById("perfil-nome").textContent = emp.nome;
    document.getElementById("perfil-categoria").textContent = emp.categoria;
    document.getElementById("perfil-cnpj").textContent = emp.cnpj;
    document.getElementById("perfil-expediente").textContent = `${emp.abertura} – ${emp.fechamento}`;
    document.getElementById("perfil-dias").textContent =
        emp.dias.length > 0 ? emp.dias.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(", ") : "Nenhum";
    document.getElementById("codigo-acesso").textContent = app.codigoAcesso;

    sincronizarPainel();
}

function sincronizarPainel() {
    // Serviços no painel
    const containerS = document.getElementById("lista-servicos-painel");
    if (app.servicos.length === 0) {
        containerS.innerHTML = `<p class="lista-vazia">Nenhum serviço cadastrado.</p>`;
    } else {
        containerS.innerHTML = app.servicos.map(s => `
            <div class="item-card" data-id="${s.id}">
                <div class="ordem-btns">
                    <button class="ordem-btn" onclick="moverItemPainel('servico', '${s.id}', -1)">▲</button>
                    <button class="ordem-btn" onclick="moverItemPainel('servico', '${s.id}', 1)">▼</button>
                </div>
                ${s.foto
                    ? `<img class="item-card__foto" src="${s.foto}" alt="${s.nome}">`
                    : `<div class="item-card__foto-placeholder">✂️</div>`
                }
                <div class="item-card__nome">${s.nome}</div>
                <div class="item-card__meta">
                    <span>${s.tempo} min</span>
                    <span>R$ ${s.preco.toFixed(2).replace(".", ",")}</span>
                </div>
                <div class="item-card__acoes">
                    <button onclick="editarServico('${s.id}')">Editar</button>
                    <button class="btn-remover" onclick="removerServico('${s.id}')">Remover</button>
                </div>
            </div>
        `).join("");
    }

    // Profissionais no painel
    const containerP = document.getElementById("lista-profissionais-painel");
    if (app.profissionais.length === 0) {
        containerP.innerHTML = `<p class="lista-vazia">Nenhum profissional cadastrado.</p>`;
    } else {
        containerP.innerHTML = app.profissionais.map(p => `
            <div class="item-card" data-id="${p.id}">
                <div class="ordem-btns">
                    <button class="ordem-btn" onclick="moverItemPainel('profissional', '${p.id}', -1)">▲</button>
                    <button class="ordem-btn" onclick="moverItemPainel('profissional', '${p.id}', 1)">▼</button>
                </div>
                ${p.foto
                    ? `<img class="item-card__foto" src="${p.foto}" alt="${p.nome}">`
                    : `<div class="item-card__foto-placeholder">👤</div>`
                }
                <div class="item-card__nome">${p.nome}</div>
                <div class="item-card__meta" style="justify-content:center">
                    <span>${p.cargo}</span>
                </div>
                <div class="item-card__acoes">
                    <button onclick="editarProfissional('${p.id}')">Editar</button>
                    <button class="btn-remover" onclick="removerProfissional('${p.id}')">Remover</button>
                </div>
            </div>
        `).join("");
    }
}

function moverItemPainel(tipo, id, direcao) {
    moverItem(tipo, id, direcao);
}

/* ============================================================
   SIDEBAR: TROCA DE ABA
   ============================================================ */

function mudarAba(qual) {
    document.querySelectorAll(".aba").forEach(a => a.classList.remove("ativa"));
    document.querySelectorAll(".sidebar__item").forEach(i => i.classList.remove("ativo"));
    document.getElementById(`aba-${qual}`).classList.add("ativa");
    event.currentTarget.classList.add("ativo");
}

/* ============================================================
   EDIÇÃO DA EMPRESA (modal)
   ============================================================ */

function editarEmpresa() {
    const emp = app.empresa;
    document.getElementById("edit-emp-nome").value = emp.nome;
    document.getElementById("edit-emp-categoria").value = emp.categoria;
    document.getElementById("edit-emp-cnpj").value = emp.cnpj;
    document.getElementById("edit-emp-abertura").value = emp.abertura;
    document.getElementById("edit-emp-fechamento").value = emp.fechamento;

    document.getElementById("modal-empresa").hidden = false;
    document.getElementById("modal-overlay").hidden = false;
}

function fecharModalEmpresa() {
    document.getElementById("modal-empresa").hidden = true;
    document.getElementById("modal-overlay").hidden = true;
}

function salvarEdicaoEmpresa() {
    const nome = document.getElementById("edit-emp-nome").value.trim();
    const categoria = document.getElementById("edit-emp-categoria").value;
    const cnpj = document.getElementById("edit-emp-cnpj").value.trim();
    const abertura = document.getElementById("edit-emp-abertura").value;
    const fechamento = document.getElementById("edit-emp-fechamento").value;

    if (!nome) { mostrarAviso("Informe o nome da empresa"); return; }

    app.empresa = { ...app.empresa, nome, categoria, cnpj, abertura, fechamento };
    preencherPainel();
    fecharModalEmpresa();
    mostrarAviso("Dados da empresa atualizados!");
}

/* ============================================================
   SERVIÇOS NO PAINEL (formulário)
   ============================================================ */

function abrirFormServico() {
    document.getElementById("form-servico-painel").hidden = false;
}

function fecharFormServico() {
    document.getElementById("form-servico-painel").hidden = true;
    document.getElementById("psrv-nome").value = "";
    document.getElementById("psrv-preco").value = "";
    document.getElementById("psrv-tempo").value = "";
    document.getElementById("psrv-foto").value = "";
}

async function adicionarServicoPainel() {
    const nome = document.getElementById("psrv-nome").value.trim();
    const preco = parseFloat(document.getElementById("psrv-preco").value);
    const tempo = parseInt(document.getElementById("psrv-tempo").value);
    const fotoInput = document.getElementById("psrv-foto");

    if (!nome) { mostrarAviso("Informe o nome do serviço"); return; }
    if (isNaN(preco)) { mostrarAviso("Informe o preço"); return; }
    if (isNaN(tempo)) { mostrarAviso("Informe a duração"); return; }

    const foto = await lerArquivoBase64(fotoInput);
    app.servicos.push({ id: gerarIdUnico(), nome, preco, tempo, foto });
    fecharFormServico();
    sincronizarPainel();
    mostrarAviso("Serviço adicionado!");
}

/* ============================================================
   PROFISSIONAIS NO PAINEL (formulário)
   ============================================================ */

function abrirFormProfissional() {
    document.getElementById("form-profissional-painel").hidden = false;
}

function fecharFormProfissional() {
    document.getElementById("form-profissional-painel").hidden = true;
    document.getElementById("ppro-nome").value = "";
    document.getElementById("ppro-cargo").value = "";
    document.getElementById("ppro-foto").value = "";
}

async function adicionarProfissionalPainel() {
    const nome = document.getElementById("ppro-nome").value.trim();
    const cargo = document.getElementById("ppro-cargo").value.trim();
    const fotoInput = document.getElementById("ppro-foto");

    if (!nome) { mostrarAviso("Informe o nome do profissional"); return; }
    if (!cargo) { mostrarAviso("Informe o cargo"); return; }

    const foto = await lerArquivoBase64(fotoInput);
    app.profissionais.push({ id: gerarIdUnico(), nome, cargo, foto });
    fecharFormProfissional();
    sincronizarPainel();
    mostrarAviso("Profissional adicionado!");
}

/* ============================================================
   SAIR
   ============================================================ */

function sair() {
    if (!confirm("Deseja sair do sistema?")) return;
    app.usuario = null;
    app.empresa = null;
    app.servicos = [];
    app.profissionais = [];
    app.codigoAcesso = null;
    document.getElementById("login-usuario").value = "";
    document.getElementById("login-senha").value = "";
    irParaTela("tela-auth");
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

irParaTela("tela-auth");
