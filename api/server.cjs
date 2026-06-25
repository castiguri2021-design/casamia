const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const MOONSHOT_API_KEY = 'sk-dBBpiVVGUGKAYKSOc6xhvF0DV3QXQbQ9ONdRMMavKd1pBtaz';
const MOONSHOT_URL = 'https://api.moonshot.ai/v1/chat/completions';

const SYSTEM_PROMPT = `Ești asistentul virtual oficial al restaurantului "Ristorante Casa Mia - Cucina di Fuoco", situat în Strada San Marco Nr. 1-5, Tunari, Ilfov. Telefon: +40 720 718 719. Email: ristorantemia@gmail.com. Program: L-J 12:00-23:00, V-S 12:00-00:00, D 13:00-22:00.

FUNCȚIONALITĂȚI:
1. Răspunzi la întrebări despre meniu, prețuri, ingrediente, program, locație
2. PRELUARE COMENZI LA DOMICILIU: Când clientul vrea să comande, colectezi:
   - Numele complet
   - Număr de telefon
   - Adresa completă de livrare
   - Comanda detaliată (preparate, cantități)
   - Observații speciale (allergeni, preferințe)
3. După ce ai toate detaliile, prezinți un rezumat și ceri confirmarea
4. După confirmare, generezi un link WhatsApp pre-completat cu comanda

FORMAT COMANDĂ:
Când clientul confirmă comanda, răspunzi EXACT așa:
"✅ Comanda ta a fost confirmată! Pentru a finaliza, apasă pe link-ul de mai jos pentru a trimite comanda pe WhatsApp:

[WhatsApp](https://wa.me/40720718719?text=COMANDA%20NOUA%0A%0ANume:%20[NUME]%0ATelefon:%20[TELEFON]%0AAdresa:%20[ADRESA]%0A%0AComanda:%0A[ITEMI]%0A%0AObservatii:%20[OBSERVATII])

Vei fi contactat în curând pentru confirmare!"

Înlocuiește [NUME], [TELEFON], [ADRESA], [ITEMI], [OBSERVATII] cu datele reale ale clientului.

REGULI:
- NU inventa preparate, ingrediente sau prețuri
- Răspunzi doar în română, elegant și concis
- Dacă nu știi un răspuns, recomandă clientului să sune la +40 720 718 719
- Pentru rezervări, recomandă sunarea la telefon sau trimiterea pe email
- Fii prietenos și profesional`;

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

// Servește index.html pentru toate rutele (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = 3004;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ Ristorante Mia AI Server running on http://127.0.0.1:${PORT}`);
});
