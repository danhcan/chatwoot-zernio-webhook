import express from 'express';
import dotenv from 'dotenv';
import { handleChatwootWebhook } from './chatwoot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/webhook/chatwoot', async (req, res) => {
  try {
    console.log('Received Chatwoot webhook:', JSON.stringify(req.body, null, 2));
    await handleChatwootWebhook(req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
  console.log(`Chatwoot webhook URL: http://localhost:${PORT}/webhook/chatwoot`);
});
