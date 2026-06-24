const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const MOONSHOT_API_KEY = 'sk-O9tYxozAc6LCLUciLzizZ7JeN92z4rq71SQSfRIGRN4wzL0C';
const MOONSHOT_URL = 'https://api.moonshot.ai/v1/chat/completions';

const SYSTEM_PROMPT = `Ești asistentul virtual oficial al restaurantului "Ristorante Casa Mia - Cucina di Fuoco", situat în Strada San Marco Nr. 1-5, Tunari, Ilfov. Telefon: 0768676141. Email: ristorantemia@gmail.com. Program: L-J 12:00-23:00, V-S 12:00-00:00, D 13:00-22:00. Rezervări doar telefonic sau pe email. Meniul include: supe, ciorbe, salate, paste, risotto, preparate din pui, porc, vită, miel, pește, fructe de mare, platouri, burgeri, pizza, deserturi, garnituri. Prețurile sunt în LEI și includ TVA. Alergeni disponibili la cerere. NU inventa preparate, ingrediente sau prețuri. Răspunde doar în română, elegant și concis. Dacă nu știi un răspuns, recomandă clientului să sune la 0768676141.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mesaje invalide' });
    }

    console.log('📨 Received chat request with', messages.length, 'messages');

    const payload = {
      model: 'kimi-k2.6',
      temperature: 1,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ]
    };

    console.log('🚀 Calling Moonshot API...');

    const response = await axios.post(MOONSHOT_URL, payload, {
      headers: {
        'Authorization': `Bearer ${MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 120000 // 2 minute pentru modele de reasoning
    });

    console.log('✅ Moonshot API responded successfully');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Moonshot API Error:', error.response?.data || error.message);
    console.error('Error code:', error.code);
    console.error('Error status:', error.response?.status);
    res.status(500).json({ error: 'Eroare la comunicarea cu AI-ul.' });
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = 3004;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ Ristorante Mia AI Server running on http://127.0.0.1:${PORT}`);
});
