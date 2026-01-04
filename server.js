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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Servindo arquivos estáticos de: ${publicPath}`);
});
