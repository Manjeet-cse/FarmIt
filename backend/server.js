const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ── Middleware ────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── API Routes ───────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api', require('./routes/expertRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));

// ── Weather API (mock) ──────────────────────────
app.get('/api/weather', (req, res) => {
  res.json({
    success: true,
    data: {
      location: 'Guna, Madhya Pradesh',
      temperature: 28,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: 12,
      feelsLike: 30,
      uvIndex: 7,
      visibility: 10,
      forecast: [
        { day: 'Tomorrow', temp: 26, condition: 'Partly Cloudy', icon: 'partly_cloudy_day' },
        { day: 'Wednesday', temp: 22, condition: 'Rain', icon: 'rainy' },
        { day: 'Thursday', temp: 29, condition: 'Sunny', icon: 'wb_sunny' },
        { day: 'Friday', temp: 27, condition: 'Cloudy', icon: 'cloud' },
        { day: 'Saturday', temp: 25, condition: 'Rain', icon: 'rainy' },
      ],
      alerts: [
        { type: 'warning', message: 'Heavy rainfall expected tomorrow afternoon. Secure harvested crops.' },
      ],
      cropImpact: [
        { crop: 'Wheat', status: 'Safe', detail: 'Current weather is optimal for grain filling stage.' },
        { crop: 'Mustard', status: 'Risk', detail: 'High humidity may increase aphid attack risk. Monitor closely.' },
      ],
    },
  });
});

// ── Health Check ─────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🌾 FarmIt API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      crops: '/api/crops',
      products: '/api/products',
      orders: '/api/orders',
      experts: '/api/experts',
      bookings: '/api/bookings',
      community: '/api/community',
      weather: '/api/weather',
    },
  });
});

// ── Error Handler (must be last) ─────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║  🌾 FarmIt Backend Server                    ║
║  Mode: ${process.env.NODE_ENV || 'development'}                          ║
║  Port: ${PORT}                                 ║
║  API:  http://localhost:${PORT}/api             ║
╚══════════════════════════════════════════════╝
  `);
});
