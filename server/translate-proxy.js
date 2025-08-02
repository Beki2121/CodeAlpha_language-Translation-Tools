const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // <-- Replace with your real key

app.post('/api/translate', async (req, res) => {
  const { q, source, target } = req.body;
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        q,
        source,
        target,
        format: 'text'
      }
    );
    res.json(response.data.data.translations[0]);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`)); 