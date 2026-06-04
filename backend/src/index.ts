import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'FarmIt API is running smoothly' });
});

// 🌾 Secure Mandi Prices Route
app.get('/api/mandi', async (req, res) => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Backend API key is missing configuration' });
    }

    // Call data.gov.in securely from your server
    const govUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=20`;
    const response = await axios.get(govUrl);

    // Send the records block directly to the mobile app
    const records = response.data.records || [];
    res.json({ success: true, count: records.length, data: records });

  } catch (error: any) {
    console.error('Error fetching government data:', error.message);
    res.status(500).json({ success: false, error: 'Failed to retrieve Mandi data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});