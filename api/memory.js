import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.all('/memory', async (req, res) => {
  console.log("🛜 Received request:", req.method, req.body);
  try {
    const response = await fetch("https://albre.xyz/memory", {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("✅ Proxy fetched from albre.xyz:", data);
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy fetch error:", error.message || error);
    res.status(500).json({ error: 'Proxy failed' });
  }
});

