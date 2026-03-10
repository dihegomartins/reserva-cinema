// ==========================================
// VERIFICAÇÃO DE LOGIN
// ==========================================
// Tenta ler o nome do usuário no LocalStorage
const usuario = localStorage.getItem('usuarioLogado');

// Se não tiver nome salvo, manda a pessoa de volta para a tela de login
if (!usuario) {
    window.location.href = "login.html";
} else {
    // Se tiver nome, mostra uma mensagem personalizada na tela
    document.getElementById('msg-boas-vindas').innerText = `Bem-vindo(a), ${usuario}!`;
}

// ... o resto do seu código de configuração geral, Model, View e Controller continua aqui embaixo ...


// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================
const PRECO_INGRESSO = 25.00;
const sala = document.querySelector('.sala-cinema');
const txtQtd = document.getElementById('qtd-assentos');
const txtTotal = document.getElementById('valor-total');
const btnComprar = document.getElementById('btn-comprar');

// ==========================================
// MODEL (A Camada de Dados / O Cérebro)
// ==========================================
// Aqui usamos o LocalStorage: Ele tenta ler a matriz salva no navegador.
// Se não existir nada salvo (primeira vez do usuário), ele cria a matriz padrão.
let matrizCinema = JSON.parse(localStorage.getItem('cinemaMatriz'));

if (!matrizCinema) {
    // 0 = Livre, 1 = Ocupado (Vendido para outra pessoa), 2 = Selecionado por você agora
    matrizCinema = [
        [0, 0, 0, 1], 
        [0, 1, 0, 0], 
        [0, 0, 0, 0],
        [1, 0, 0, 0] // Aumentei a sala para 4x4 para ficar mais legal!
    ];
}

// ==========================================
// VIEW (A Camada Visual / A Interface)
// ==========================================
// Função responsável APENAS por pintar a tela com base nos números da matriz
function desenharSala() {
    sala.innerHTML = ''; // Limpa tudo antes de redesenhar
    let qtdSelecionados = 0;

    // O nosso famoso loop duplo!
    for (let i = 0; i < matrizCinema.length; i++) {
        for (let j = 0; j < matrizCinema[i].length; j++) {
            
            const cadeira = document.createElement('div');
            cadeira.classList.add('assento'); 

            // Se for 1, pinta de vermelho (Ocupado)
            if (matrizCinema[i][j] === 1) {
                cadeira.classList.add('ocupado');
            }
            // Se for 2, pinta de azul (Selecionado no carrinho)
            else if (matrizCinema[i][j] === 2) {
                cadeira.classList.add('selecionado');
                cadeira.style.backgroundColor = '#6feaf6'; // Azul claro
                qtdSelecionados++; // Conta quantos assentos você pegou
            }

            // O Controller: Avisa o que fazer quando clicar
            cadeira.addEventListener('click', function() {
                selecionarAssento(i, j);
            });

            sala.appendChild(cadeira);
        }
    }

    // Atualiza os textos do painel de preço
    txtQtd.innerText = qtdSelecionados;
    txtTotal.innerText = `R$ ${(qtdSelecionados * PRECO_INGRESSO).toFixed(2).replace('.', ',')}`;
}

// ==========================================
// CONTROLLER (As Regras de Negócio)
// ==========================================
// Função que decide o que acontece na matriz quando você clica em uma cadeira
function selecionarAssento(linha, coluna) {
    let statusAtual = matrizCinema[linha][coluna];

    // Regra 1: Se for 1 (Ocupado), não faz nada.
    if (statusAtual === 1) {
        alert("Este assento já foi vendido!");
        return; 
    }

    // Regra 2: Se for 0 (Livre), vira 2 (Selecionado)
    if (statusAtual === 0) {
        matrizCinema[linha][coluna] = 2;
    } 
    // Regra 3: Se for 2 (Selecionado), o usuário desistiu, volta a ser 0 (Livre)
    else if (statusAtual === 2) {
        matrizCinema[linha][coluna] = 0;
    }

    // Salva a nova matriz no navegador (LocalStorage) e manda pintar a tela de novo
    localStorage.setItem('cinemaMatriz', JSON.stringify(matrizCinema));
    desenharSala();
}

// Botão de Finalizar Compra
btnComprar.addEventListener('click', function() {
    let comprou = false;

    // Transforma todos os '2' (selecionados) em '1' (comprados/ocupados)
    for (let i = 0; i < matrizCinema.length; i++) {
        for (let j = 0; j < matrizCinema[i].length; j++) {
            if (matrizCinema[i][j] === 2) {
                matrizCinema[i][j] = 1;
                comprou = true;
            }
        }
    }

    if (comprou) {
        alert("Compra finalizada com sucesso! Bom filme! 🍿");
        localStorage.setItem('cinemaMatriz', JSON.stringify(matrizCinema));
        desenharSala();
    } else {
        alert("Você precisa selecionar pelo menos um assento!");
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================
desenharSala();