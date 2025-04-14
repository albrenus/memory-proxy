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
      body: ['POST', 'PUT', 'PATCH'].includes(req.method.toUpperCase())
  ? JSON.stringify(req.body)
  : undefined,
    });

    const data = await response.json();
    console.log("✅ Proxy fetched from albre.xyz:", data);
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy fetch error:", error.message || error);
    res.status(500).json({ error: 'Proxy failed' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Memory proxy running on port ${PORT}`);
});
