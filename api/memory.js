import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.all('/memory', async (req, res) => {
  try {
    const response = await fetch('https://albre.xyz/memory', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Memory proxy running on port ${PORT}`);
});
