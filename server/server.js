const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Proxy endpoint for FatSecret token
app.post('/api/fatsecret/token', async (req, res) => {
  try {

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_FATSECRET_CLIENT_ID,
      client_secret: process.env.REACT_APP_FATSECRET_CLIENT_SECRET,
    });

    const response = await fetch('https://oauth.fatsecret.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error getting token:', error);
    res.status(500).json({ error: 'Failed to get token' });
  }
});

// Proxy endpoint for FatSecret API
app.get('/api/fatsecret/*', async (req, res) => {
  try {
    const token = await getToken();
    const query = new URLSearchParams(req.query).toString();
    
    const response = await fetch(`https://platform.fatsecret.com/rest/server.api?${query}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Failed to proxy request' });
  }
});

async function getToken() {
  const response = await fetch(`http://localhost:${PORT}/api/fatsecret/token`, {
    method: 'POST',
  });
  const data = await response.json();
  return data.access_token;
}

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}); 