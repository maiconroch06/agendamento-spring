/* ============================================================
   ESTADO SERVIÇOS
   ============================================================ */

let servicos = JSON.parse(localStorage.getItem("servicos")) || {
    id: gerarIdUnico(),
    nome: nome,
    preco: preco,
    tempo: tempo,
    foto: foto
};

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

    const servicos = {
        id: gerarIdUnico(),
        nome: nome,
        preco: preco,
        tempo: tempo,
        foto: foto
    }

    localStorage.setItem("id", JSON.stringify(servicos));

    document.getElementById("srv-nome").value = "";
    document.getElementById("srv-preco").value = "";
    document.getElementById("srv-tempo").value = "";
    fotoInput.value = "";

    renderizarCardsServicos("lista-cards-servicos", JSON.parse(localStorage.getItem("servicos")), "vazia-servicos");
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
                <button class="ordem-btn" onclick="moverItem('${s.id}', -1)" title="Subir">▲</button>
                <button class="ordem-btn" onclick="moverItem('${s.id}', 1)" title="Descer">▼</button>
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
    renderizarCardsServicos("lista-cards-servicos", JSON.parse(localStorage.getItem("servicos")), "vazia-servicos");
    sincronizarPainel();
}

function moverItem(id, direcao) {
    const lista = JSON.parse(localStorage.getItem("servicos"));
    const idx = lista.findIndex(i => i.id === id);
    const novoIdx = idx + direcao;
    if (novoIdx < 0 || novoIdx >= lista.length) return;
    [lista[idx], lista[novoIdx]] = [lista[novoIdx], lista[idx]];
    if (tipo === "servico") {
        renderizarCardsServicos("lista-cards-servicos", JSON.parse(localStorage.getItem("servicos")), "vazia-servicos");
        sincronizarPainel();
    }
}

/*function moverItem(tipo, id, direcao) {
    const lista = tipo === "servico" ? servicos : profissionais;
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
}*/

function salvarServicos() {
    irParaTela("tela-profissionais");
}