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