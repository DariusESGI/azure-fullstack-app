const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis le back déployé sur Azure !' });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
