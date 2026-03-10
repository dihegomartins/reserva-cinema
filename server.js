const express = require('express');
const app = express();
const port = 3000;

// Diz ao Express para servir os arquivos da sua pasta atual (HTML, CSS, JS)
app.use(express.static('./'));

// Rota principal: Quando alguém acessar o endereço do servidor
app.get('/', (req, res) => {
    console.log("Alguém acessou a página inicial!");
});

// Liga o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log("Pressione Ctrl + C para desligar o servidor");
});