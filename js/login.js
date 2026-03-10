// Pega os elementos da tela
const inputNome = document.getElementById('input-nome');
const btnEntrar = document.getElementById('btn-entrar');

btnEntrar.addEventListener('click', function() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Por favor, digite o seu nome para entrar!");
        return;
    }

    // Salva o nome do usuário no navegador (LocalStorage)
    localStorage.setItem('usuarioLogado', nome);

    // Redireciona para a página do cinema (o seu index.html atual)
    window.location.href = "index.html"; 
});

// Adiciona um "ouvinte" para o teclado dentro do campo de texto
inputNome.addEventListener('keydown', function(event) {
    // Verifica se a tecla apertada foi o 'Enter'
    if (event.key === 'Enter') {
        btnEntrar.click(); // Simula um clique fantasma no botão de entrar!
    }
});