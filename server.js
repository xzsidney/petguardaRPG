const express = require('express');
const path = require('path');

const app = express();
// A Hostinger usa a variável de ambiente PORT, se não achar usa a 3000
const PORT = process.env.PORT || 3000;

// Definição do caminho absoluto para a pasta public
const publicPath = path.join(__dirname, 'public');

// 1. Configura a pasta 'public' para servir arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(publicPath));

// 2. Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// 3. Rota de "Catch-all" (Opcional, mas boa para evitar erros de refresh em SPAs ou erro 404 feio)
// Se alguém tentar acessar uma página que não existe, manda pro index ou exibe erro
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const fs = require('fs');

// Rota de teste: acesse petguarda.com.br/debug
app.get('/debug', (req, res) => {
    const pastaPublica = path.join(__dirname, 'public');
    
    // Tenta ler o conteúdo da pasta public
    fs.readdir(pastaPublica, (err, arquivos) => {
        if (err) {
            return res.send(`ERRO CRÍTICO: Não consegui ler a pasta public. <br> Caminho tentado: ${pastaPublica} <br> Erro: ${err.message}`);
        }
        res.send(`
            <h1>Diagnóstico do Servidor</h1>
            <p><strong>Estou rodando em:</strong> ${__dirname}</p>
            <p><strong>Procurando arquivos em:</strong> ${pastaPublica}</p>
            <p><strong>Arquivos encontrados nesta pasta:</strong></p>
            <ul>${arquivos.map(f => `<li>${f}</li>`).join('')}</ul>
        `);
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Servindo arquivos estáticos de: ${publicPath}`);
});
