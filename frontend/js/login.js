// 1. Função para buscar os filmes da NOSSA API no Node.js
async function carregarFundoDinamico() {
    try {
        const resposta = await fetch('/api/filmes-populares');
        if (!resposta.ok) throw new Error('Erro na API');

        const listaImagens = await resposta.json();
        
        // Sorteia uma imagem da lista que veio do servidor
        const sorteada = listaImagens[Math.floor(Math.random() * listaImagens.length)];
        
        // Aplica ao fundo da página
        document.body.style.backgroundImage = `url('${sorteada}')`;

    } catch (erro) {
        console.warn("Usando fundo padrão de emergência:", erro);
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop')";
    }
}

// 2. Chama a função para rodar assim que carregar
carregarFundoDinamico();

// ==========================================
// LÓGICA DE LOGIN E VALIDAÇÃO
// ==========================================
// (Deixe o resto do seu código de login exatamente como estava daqui para baixo...)
// ...
const inputNome = document.getElementById('input-nome');
const btnEntrar = document.getElementById('btn-entrar');
const msgErro = document.getElementById('msg-erro'); // Puxamos o texto de erro do HTML

btnEntrar.addEventListener('click', function() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        // ADEUS ALERT! Agora fazemos o visual agir:
        msgErro.style.display = 'block'; // Mostra o texto vermelho
        inputNome.classList.add('input-erro'); // Borda vermelha
        inputNome.classList.add('tremer'); // Faz a caixa tremer!

        // Tira a classe 'tremer' depois de 300ms (tempo da animação acabar)
        // Isso serve para a caixa poder tremer de novo se o usuário clicar sem digitar nada mais uma vez.
        setTimeout(() => {
            inputNome.classList.remove('tremer');
        }, 300);

        return; // Para a função aqui e não deixa logar
    }

    // Se tiver nome, loga normal!
    localStorage.setItem('usuarioLogado', nome);
    window.location.href = "index.html"; 
});

// UX DE MESTRE: Se o usuário começar a digitar, nós limpamos o erro da tela!
inputNome.addEventListener('input', function() {
    msgErro.style.display = 'none'; // Esconde o texto
    inputNome.classList.remove('input-erro'); // Tira a borda vermelha
});

// O suporte ao Enter que você fez antes
inputNome.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        btnEntrar.click();
    }
});

// Função que busca dados na nossa API do Node.js
async function buscarFraseDoDia() {
    const titulo = document.querySelector('.login-container p');
    try {
        const resposta = await fetch('/api/frase');
        if (!resposta.ok) throw new Error(); // Se o servidor não responder...
        
        const dados = await resposta.json();
        titulo.innerText = `"${dados.texto}"`;
    } catch (erro) {
        // Se der erro (como no GitHub Pages), ele cai aqui e usa uma frase fixa
        console.log("Servidor offline, usando frase padrão.");
        titulo.innerText = "Prepare o seu coração para grandes emoções!";
    }
}

// Chama a função assim que a página abre
buscarFraseDoDia();