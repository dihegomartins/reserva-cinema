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