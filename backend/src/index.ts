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

// 🌤️ Weather Forecast Route
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude query parameters are required' });
    }
    if (!apiKey) {
      return res.status(500).json({ error: 'Weather API key missing configuration' });
    }

    // Call OpenWeather using metric units for Celsius
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);
    const data = response.data;

    // Send only the vital data points your farmers need to see
    res.json({
      success: true,
      location: data.name,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      wind_speed: data.wind.speed
    });

  } catch (error: any) {
    console.error('Weather Fetch Error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch weather forecast data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});