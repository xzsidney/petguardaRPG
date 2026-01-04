const express = require('express');
const path = require('path');
const fs = require('fs'); // Necessário para o debug

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Caminho absoluto
const publicPath = path.join(__dirname, 'public');

// 2. Servir arquivos estáticos (PRIORIDADE MÁXIMA)
app.use(express.static(publicPath));

// 3. Rota Principal
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// 4. Rota de Debug (AGORA VAI FUNCIONAR)
app.get('/debug', (req, res) => {
    // Vamos listar o que tem dentro da pasta public
    fs.readdir(publicPath, (err, arquivos) => {
        if (err) {
            return res.send(`ERRO: Não consegui ler a pasta ${publicPath}. Detalhe: ${err.message}`);
        }
        res.send(`
            <h2>Diagnóstico de Arquivos</h2>
            <p>Pasta Public: <b>${publicPath}</b></p>
            <p>Arquivos encontrados:</p>
            <ul>${arquivos.map(f => `<li>${f}</li>`).join('')}</ul>
        `);
    });
});

// 5. Rota Coringa (TEM QUE SER A ÚLTIMA)
// Se não achou arquivo estático, nem rota '/', nem '/debug', cai aqui.
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
