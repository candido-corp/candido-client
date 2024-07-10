// server.cjs
const express = require('express');
const path = require('path');
const app = express();

// Servi i file statici dalla cartella di build
app.use(express.static(path.join(__dirname, 'dist')));

// Aggiungi la route /health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Gestisci tutte le altre richieste con l'app React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});