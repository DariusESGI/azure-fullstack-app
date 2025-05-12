const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Autorise uniquement ton front Azure
app.use(cors({
  origin: 'https://mango-wave-0b1f3aa10.6.azurestaticapps.net'
}));

// Configuration de la base de données
const config = {
  user: 'ESGI2A1',
  password: 'Azerty123456789!',
  server: 'sql-fullstack-server.database.windows.net',
  database: 'fullstack-database',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// Route API
app.get('/api/hello', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT TOP 1 content FROM messages ORDER BY id DESC`;
    res.json({ message: result.recordset[0].content });
  } catch (err) {
    console.error('Erreur SQL:', err);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
