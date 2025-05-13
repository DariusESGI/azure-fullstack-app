const axios = require('axios');

test('GET /api/hello renvoie un message texte', async () => {
  const response = await axios.get('https://backendfullstack-a5hhf8axd3cwcyf8.canadacentral-01.azurewebsites.net/api/hello');
  expect(response.status).toBe(200);
  expect(typeof response.data.message).toBe('string');
}, 100000); 
