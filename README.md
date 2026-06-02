# 🌾 FarmIt

> Empowering marginal farmers across India with real-time market prices, weather intelligence, and direct access to buyers — built offline-first for rural connectivity.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/priyanshu/farmit)
[![Platform](https://img.shields.io/badge/platform-Android-green)](https://github.com/priyanshu/farmit)
[![Stack](https://img.shields.io/badge/stack-React%20Native%20%2B%20Supabase-blue)](https://github.com/priyanshu/farmit)
[![License](https://img.shields.io/badge/license-MIT-orange)](./LICENSE)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Overview](#api-overview)
- [Build & Deployment](#build--deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Team](#team)

---

## About the Project

FarmIt is a mobile application built specifically for **marginal farmers in India** — farmers who own less than 2.5 acres of land and are underserved by existing agri-tech solutions.

**The problem:** Marginal farmers sell their crops at significantly lower prices because they have no real-time access to mandi (market) rates, no early warning for weather events, and no direct channel to buyers — they depend entirely on middlemen.

**FarmIt solves this by:**
- Showing live mandi prices from 3,000+ APMC markets (via the Government of India's `data.gov.in` API)
- Sending rain and frost alerts via SMS — even with no internet
- Letting farmers photograph diseased crops and get an AI-powered diagnosis in Hindi
- Providing a direct marketplace to connect with buyers without a middlemen

**Who it's for:** Farmers with low-end Android phones, 2G/3G connectivity, and limited English literacy. The app works fully offline and supports voice readout in Hindi.

---

## Key Features

| Feature | Description |
|---|---|
| 📊 **Live Mandi Prices** | Daily crop prices from 3,000+ APMC markets, cached offline |
| 🌦️ **Weather Alerts** | Hyperlocal forecasts + SMS alerts for rain, frost, heatwaves |
| 🔬 **Crop Disease Scan** | Photo → Gemini AI → diagnosis + treatment advice in Hindi |
| 🛒 **Marketplace** | Direct farmer-to-buyer listings with UPI payments via Razorpay |
| 📴 **Offline-First** | Full functionality with no internet using WatermelonDB sync |
| 🗣️ **Voice Readout** | Hindi TTS for prices and alerts (for low-literacy users) |
| 🌐 **Multi-language** | Hindi, Punjabi, Marathi, Telugu (v1 ships Hindi) |
| 📱 **OTP Auth** | Phone number + OTP only — no email required |

---

## Tech Stack

### Mobile (React Native + Expo)

| Tool | Purpose |
|---|---|
| React Native + Expo SDK | Core mobile framework, OTA updates |
| Expo Router v3 | File-based navigation (tabs + deep links) |
| NativeWind v4 | Tailwind CSS for React Native |
| Zustand | Lightweight global state management |
| WatermelonDB | Offline-first local SQLite database |
| MMKV | Fast key-value cache (10x faster than AsyncStorage) |
| i18next | Internationalisation (Hindi, Punjabi, Marathi) |
| expo-speech | Hindi TTS voice readout |
| expo-camera | Crop disease photo capture |
| Axios | HTTP client with auth interceptors |

### Backend (Node.js + Supabase)

| Tool | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Supabase (PostgreSQL) | Primary database, auth, realtime, file storage |
| Supabase Auth | Phone OTP authentication |
| BullMQ + Redis | Background jobs and cron scheduling |
| Railway | Hosting for Node.js API + Redis |
| TypeScript | Type safety across the full stack |

### Integrations

| Service | Purpose |
|---|---|
| data.gov.in API | Free official mandi prices (3,000+ markets) |
| OpenWeatherMap | Weather forecasts and rain probability |
| Gemini 1.5 Flash | AI crop disease diagnosis (Hindi, multimodal) |
| Razorpay | UPI payments and marketplace payouts |
| MSG91 | SMS alerts for no-internet scenarios |
| Expo + FCM | Push notifications |

---

## Project Structure

```
farmit/
├── apps/
│   ├── mobile/                 # React Native (Expo) app
│   │   ├── app/                # Expo Router pages (file-based)
│   │   │   ├── (tabs)/         # Bottom tab screens
│   │   │   │   ├── index.tsx   # Home — mandi prices
│   │   │   │   ├── weather.tsx # Weather alerts
│   │   │   │   ├── scan.tsx    # Crop disease scan
│   │   │   │   └── market.tsx  # Marketplace
│   │   │   ├── auth/           # OTP login flow
│   │   │   └── _layout.tsx
│   │   ├── components/         # Reusable UI components
│   │   ├── lib/
│   │   │   ├── supabase.ts     # Supabase client setup
│   │   │   └── db/             # WatermelonDB models + schema
│   │   ├── store/              # Zustand state stores
│   │   ├── hooks/              # Custom React hooks
│   │   ├── i18n/               # Translation files (hi, pa, mr)
│   │   └── utils/              # Helpers, formatters
│   │
│   └── api/                    # Node.js + Express backend
│       ├── src/
│       │   ├── routes/         # Express route handlers
│       │   ├── jobs/           # BullMQ job definitions
│       │   ├── services/       # Business logic layer
│       │   └── middleware/     # Auth, error handling
│       └── supabase/
│           └── migrations/     # SQL migration files
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Expo Go app on your Android phone (for testing)
- A [Supabase](https://supabase.com) account (free tier is fine)

### 1. Clone the repository

```bash
git clone https://github.com/priyanshu/farmit.git
cd farmit
```

### 2. Set up the mobile app

```bash
cd apps/mobile
npm install
cp ../../.env.example .env.local
# Fill in your Supabase keys in .env.local
npx expo start
```

Scan the QR code with Expo Go on your Android phone.

### 3. Set up the backend API

```bash
cd apps/api
npm install
cp ../../.env.example .env
# Fill in your environment variables
npm run dev
```

The API runs on `http://localhost:3001`.

### 4. Run the Supabase database migrations

```bash
cd apps/api
npx supabase db push
```

Or paste the contents of `supabase/migrations/` into the Supabase SQL Editor and run them in order.

---

## Environment Variables

Create a `.env.local` file in `apps/mobile/` and a `.env` file in `apps/api/` using the template below.

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend API
EXPO_PUBLIC_API_URL=http://localhost:3001

# --- apps/api/.env only ---

# Supabase (server-side)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://...

# Redis (BullMQ)
REDIS_URL=redis://localhost:6379

# External APIs
OPENWEATHER_API_KEY=your-key
GEMINI_API_KEY=your-key
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
MSG91_API_KEY=your-key
MSG91_SENDER_ID=FARMIT
```

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

---

## Database Schema

Core tables in the Supabase (PostgreSQL) database:

```sql
-- Farmers (users)
farmers         (id, phone, name, location, preferred_language, created_at)

-- Crop records per farmer
crops           (id, farmer_id, crop_type, area_acres, sowing_date, harvest_date, status)

-- Daily mandi prices (fetched from data.gov.in)
mandi_prices    (id, crop_type, market_name, district, state, price_per_quintal, date)

-- Weather alerts by district
weather_alerts  (id, district, type, message_hi, message_en, valid_at)

-- Marketplace listings
listings        (id, farmer_id, crop_id, quantity_kg, asking_price, status, buyer_id)

-- Transactions
transactions    (id, listing_id, farmer_id, buyer_id, amount, upi_ref, status, created_at)

-- AI crop disease scans
disease_scans   (id, farmer_id, image_url, gemini_response, crop_type, created_at)
```

Full migration SQL is in `apps/api/supabase/migrations/`.

---

## API Overview

Base URL: `https://api.farmit.app` (production) / `http://localhost:3001` (dev)

All routes except `/auth/*` require a valid Supabase JWT in the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/otp/send` | Send OTP to phone number |
| POST | `/auth/otp/verify` | Verify OTP, return session |
| GET | `/prices?district=sonipat&crop=wheat` | Mandi prices for a district + crop |
| GET | `/weather?lat=28.9&lng=77.0` | Weather forecast + active alerts |
| POST | `/scan` | Upload crop photo, get disease diagnosis |
| GET | `/listings` | Marketplace listings (paginated) |
| POST | `/listings` | Create a new listing |
| POST | `/listings/:id/buy` | Initiate Razorpay payment for a listing |

---

## Build & Deployment

### Mobile — Android APK via EAS

```bash
cd apps/mobile

# Development build (for testing on real device)
npx eas build --platform android --profile development

# Production build (for Play Store)
npx eas build --platform android --profile production
```

OTA updates (bug fixes without a Play Store re-submission):

```bash
npx eas update --branch production --message "fix: price display bug"
```

### Backend — Deploy to Railway

```bash
# Connect repo to Railway via railway.app dashboard
# Set environment variables in Railway → Variables
# Railway auto-deploys on push to main
git push origin main
```

---

## Roadmap

### Phase 1 — Foundation ✅ In Progress
- [ ] Supabase schema + RLS policies
- [ ] Phone OTP auth (Supabase Auth)
- [ ] Expo app init + Supabase connection
- [ ] WatermelonDB offline layer

### Phase 2 — Core Value
- [ ] Mandi price display (data.gov.in)
- [ ] Weather display (OpenWeatherMap) with offline cache
- [ ] Hindi TTS voice readout
- [ ] BullMQ cron jobs (6am price refresh, 7am weather refresh)

### Phase 3 — AI + Alerts
- [ ] Crop disease scan (Gemini Flash API)
- [ ] SMS weather alerts (MSG91)
- [ ] FCM push notifications

### Phase 4 — Marketplace
- [ ] Farmer listing creation
- [ ] Razorpay UPI payment integration
- [ ] Realtime buyer notifications (Supabase Realtime)
- [ ] Transaction history

### Phase 5 — Polish
- [ ] Multi-language support (Punjabi, Marathi, Telugu)
- [ ] PostHog analytics
- [ ] EAS CI/CD via GitHub Actions
- [ ] Sentry error monitoring

---

## Contributing

This is currently a private project. If you're part of the FarmIt team:

1. Create a branch from `main` — `feat/your-feature` or `fix/your-bug`
2. Write clear, typed TypeScript
3. Test on a real Android device before raising a PR (emulators don't reflect low-end device performance)
4. Add a brief description of what changed and why in your PR

For any architectural decisions or schema changes, discuss in the team group before implementing.

---

## Team

| Name | Role |
|---|---|
| Manjeet Lodha | Founder / Developer |
| Priyanshu Sharma | Developer |

---

> **FarmIt** — Built with the belief that technology should reach the people who need it most, not just the ones who can afford it.