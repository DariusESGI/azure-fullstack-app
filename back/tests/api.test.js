const axios = require('axios');

test('GET /api/hello renvoie un message texte', async () => {
  const maxRetries = 3;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get('https://backendfullstack-a5hhf8axd3cwcyf8.canadacentral-01.azurewebsites.net/api/hello');
      expect(response.status).toBe(200);
      expect(typeof response.data.message).toBe('string');
      return;
    } catch (err) {
      lastError = err;
      console.log(`Tentative ${i + 1} échouée, nouvelle tentative dans 5s...`);
      await delay(5000);
    }
  }

  throw lastError; // Si toutes les tentatives échouent
}, 30000); // Timeout Jest à 30s
