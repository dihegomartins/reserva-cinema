const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./'));

const dotenv = require('dotenv');
const resultado = dotenv.config();

if (resultado.error) {
    console.error("❌ Erro ao carregar o arquivo .env:", resultado.error);
} else {
    console.log("✅ Arquivo .env carregado com sucesso!");
}

console.log("Conteúdo lido:", process.env.TMDB_KEY ? "A chave está lá!" : "Ainda vazio...");


// --- NOSSA PRIMEIRA API ---
app.get('/api/frase', (req, res) => {
    const frases = [
        "Que a Força esteja com você. (Star Wars)",
        "Eu vou fazer uma proposta que ele não poderá recusar. (O Padrão)",
        "Hasta la vista, baby. (Exterminador do Futuro)",
        "Prepare-se. O inverno está chegando. (Game of Thrones)",
        "Existem derrotas, mas não existe o sofrimento. (Matrix)"
    ];
    
    const sorteada = frases[Math.floor(Math.random() * frases.length)];
    
    // O servidor responde com um objeto JSON (o padrão de ouro das APIs)
    res.json({ texto: sorteada });
});

const axios = require('axios');

// Substitua 'SUA_CHAVE_AQUI' pela chave que você pegar no site do TMDB
const TMDB_KEY = process.env.TMDB_KEY; 

app.get('/api/filmes-populares', async (req, res) => {
    try {
        // Log para ver se a chave está chegando aqui
        console.log("Tentando buscar filmes com a chave:", process.env.TMDB_KEY ? "Chave encontrada ✅" : "Chave vazia ❌");

        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=pt-BR`;
        const resposta = await axios.get(url);
        
        const imagens = resposta.data.results
            .filter(filme => filme.backdrop_path) // Garante que o filme tem imagem
            .slice(0, 10)
            .map(filme => `https://image.tmdb.org/t/p/original${filme.backdrop_path}`);
        
        res.json(imagens);
    } catch (erro) {
        // Esse log vai aparecer no seu TERMINAL do VS Code
        console.error("ERRO DETALHADO NO BACKEND:", erro.message);
        res.status(500).json({ erro: "Erro ao buscar filmes", detalhes: erro.message });
    }
});


app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});