// ==========================================
// ROLETA DE FUNDOS DE CINEMA (Background Dinâmico)
// ==========================================
const imagensFundo = [
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop", // Cinema Clássico
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1920&auto=format&fit=crop", // Espaço / Interestelar
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920&auto=format&fit=crop", // Matrix / Cyberpunk
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop", // Fantasia / Épico
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1920&auto=format&fit=crop"  // Ação / Cidade Sombria (Batman)
];

// Sorteia um número aleatório entre 0 e o tamanho do array
const indiceSorteado = Math.floor(Math.random() * imagensFundo.length);

// Aplica a imagem sorteada direto no 'body' do HTML
document.body.style.backgroundImage = `url('${imagensFundo[indiceSorteado]}')`;

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
    try {
        // O comando 'fetch' faz a requisição para o nosso servidor
        const resposta = await fetch('/api/frase');
        const dados = await JSON.parse(await resposta.text());
        
        // Vamos colocar essa frase no lugar daquele texto fixo de boas-vindas
        const titulo = document.querySelector('.login-container p');
        titulo.innerText = `"${dados.texto}"`;
    } catch (erro) {
        console.error("Erro ao buscar frase:", erro);
    }
}

// Chama a função assim que a página abre
buscarFraseDoDia();