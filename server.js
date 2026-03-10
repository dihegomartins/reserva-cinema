const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./'));

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

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});