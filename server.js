// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Permite receber JSON
app.use(express.json());

// Função para calcular idade a partir da data de nascimento
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();
  
  // Ajuste se ainda não fez aniversário este ano
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

// Função para calcular água diária (em litros)
function calcularAgua(idade, peso) {
  let multiplicador;
  
  if (idade <= 17) {
    multiplicador = 40;
  } else if (idade >= 18 && idade <= 55) {
    multiplicador = 35;
  } else if (idade >= 56 && idade <= 65) {
    multiplicador = 30;
  } else {
    multiplicador = 25;
  }
  
  return (peso * multiplicador / 1000).toFixed(2); // Converte para litros
}

// Endpoint para receber data_nascimento e peso
app.post('/calcular-agua', (req, res) => {
  const { data_nascimento, peso } = req.body;

  if (!data_nascimento || !peso) {
    return res.status(400).json({ error: "Envie data_nascimento (YYYY-MM-DD) e peso" });
  }

  const idade = calcularIdade(data_nascimento);
  const agua = calcularAgua(idade, peso);
  
  res.json({ 
    idade, // Idade atual (opcional, para debug)
    agua: Number(agua) 
  });
});

// Rota de teste (opcional)
app.get('/', (req, res) => {
  res.send('API de Hidratação - Use POST /calcular-agua com {data_nascimento, peso}');
});

// Rodando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
