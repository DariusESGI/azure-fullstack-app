const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 3000;

// Autorise uniquement le front
app.use(cors({
  origin: 'https://mango-wave-0b1f3aa10.6.azurestaticapps.net'
}));

// Récupère le mot de passe SQL depuis Key Vault
async function getSqlPassword() {
  const credential = new DefaultAzureCredential();
  const vaultUrl = 'https://vault-fullstack.vault.azure.net';
  const client = new SecretClient(vaultUrl, credential);
  const secret = await client.getSecret('sql-password');
  return secret.value;
}

// Route API sécurisée
app.get('/api/hello', async (req, res) => {
  try {
    const password = await getSqlPassword();

    const config = {
      user: 'ESGI2A1',
      password: password,
      server: 'sql-fullstack-server.database.windows.net',
      database: 'fullstack-database',
      options: {
        encrypt: true,
        trustServerCertificate: false
      }
    };

    await sql.connect(config);
    const result = await sql.query`SELECT TOP 1 content FROM messages ORDER BY id DESC`;
    res.json({ message: result.recordset[0].content });
  } catch (err) {
    console.error('Erreur SQL ou Key Vault :', err);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
