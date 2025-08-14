// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Permite receber JSON
app.use(express.json());

// Função para calcular água diária (em litros)
function calcularAgua(idade, peso) {
    // Aqui você pode ajustar a fórmula
    // Exemplo simples: 35 ml por kg de peso + 0.03 litros por ano de idade
    const aguaPeso = peso * 0.035;
    const aguaIdade = idade * 0.03;
    return (aguaPeso + aguaIdade).toFixed(2); // Retorna em litros, com 2 casas decimais
}

// Endpoint para receber idade e peso e retornar água
app.post('/calcular-agua', (req, res) => {
    const { idade, peso } = req.body;

    if (!idade || !peso) {
        return res.status(400).json({ error: "Envie idade e peso" });
    }

    const agua = calcularAgua(idade, peso);
    res.json({ agua: Number(agua) });
});

// Rodando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
