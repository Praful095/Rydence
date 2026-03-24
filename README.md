# 🚗 Rydence
### *See the surge. Beat the price.*

> A ride-sharing app that solves surge pricing frustration for urban Indian commuters — with real-time transparency, smart wait predictions, and live price forecasts.

<br/>

![Rydence Banner](https://img.shields.io/badge/Rydence-Transparent%20Pricing-14B8A6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xOC45MiA2LjAxQzE4LjcyIDUuNDIgMTguMTYgNSAxNy41IDVoLTExYy0uNjYgMC0xLjIxLjQyLTEuNDIgMS4wMUw0IDEydjhjMCAuNTUuNDUgMSAxIDFoMWMuNTUgMCAxLS40NSAxLTF2LTFoMTJ2MWMwIC41NS40NSAxIDEgMWgxYy41NSAwIDEtLjQ1IDEtMXYtOGwtMi4wOC01Ljk5ek02LjUgMTZjLS44MyAwLTEuNS0uNjctMS41LTEuNVMxNS42NyAxMyA2LjUgMTNzMS41LjY3IDEuNSAxLjUtLjY3IDEuNS0xLjUgMS41em0xMSAwYy0uODMgMC0xLjUtLjY3LTEuNS0xLjVTMTYuNjcgMTMgMTcuNSAxM3MxLjUuNjcgMS41IDEuNS0uNjcgMS41LTEuNSAxLjV6TTUgMTFsMS41LTQuNWgxMUwxOSAxMUg1eiIvPjwvc3ZnPg==)
![Version](https://img.shields.io/badge/version-1.0.0-10B981?style=for-the-badge)
![Go](https://img.shields.io/badge/Go-1.22-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-F59E0B?style=for-the-badge)

<br/>

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 😤 The Problem

Every urban commuter in India has felt this:

> *You open Ola or Uber. ₹180 ride. You wait 2 minutes.*
> *Price jumps to ₹310. No explanation. No warning. No choice.*

Surge pricing is **real** — but it's also **completely opaque**. Riders have zero visibility into:

- ❌ **WHY** prices are high right now
- ❌ **IF** waiting a few minutes will save money
- ❌ **WHERE** prices are headed in the next 30 minutes

This creates frustration, blind decisions, and erodes trust in ride-sharing platforms.

---

## 💡 The Solution

**Rydence** is a surge pricing transparency layer for ride-sharing. It gives riders three superpowers:

| Superpower | What it does |
|---|---|
| ⚡ **Know WHY** | See the exact reasons: rain, rush hour, events, driver shortage |
| ⏳ **Know IF** | Smart prediction: "Wait 8 mins → Save ₹52" with confidence score |
| 📈 **Know WHERE** | Live 30-minute price forecast chart to book at the perfect moment |

> **MVP Focus:** This is NOT a full Uber clone. The entire product is focused on one moment — *should I book now or wait?* Everything else is secondary.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥 Frontend | [rydence.vercel.app](https://rydence.vercel.app) |
| ⚙️ Backend API | [rydence-backend.onrender.com](https://rydence-backend.onrender.com) |

**Quick API test:**
```bash
curl https://rydence-backend.onrender.com/api/v1/ride-info?scenario=rain
```

---

## ✨ Features

### 🔴 Surge Indicator
- Color-coded badge: `LOW` (green) / `MEDIUM` (amber) / `HIGH` (red)
- Human-readable reason chips: "Heavy rain", "Rush hour", "Event nearby"
- Animated surge bar showing intensity level
- Percentage increase over base price

### ⏳ Wait & Save Prediction
- Clear recommendation: *"Wait 8 mins → Save ₹52"*
- Confidence score with visual bar: LOW / MEDIUM / HIGH
- Based on simulated demand-supply trend analysis
- Context-aware messaging per scenario

### 📉 Price Trend Indicator
- Direction: Increasing / Decreasing / Stable
- Color-coded with icons (📈📉➡️)
- Description: *"Price dropping in next 10–15 mins"*

### 📊 Price Forecast Chart
- Pure SVG chart — no external chart library
- Plots price over next 30 minutes
- Animated "Now" dot, dashed grid lines, Y-axis price labels
- Time labels: Now, 5m, 10m ... 30m

### 📍 Location Intelligence
- Browser GPS auto-detection (with permission)
- Reverse geocoding via OpenStreetMap Nominatim
- Type-ahead destination search — anywhere in India
- Debounced search (600ms) to respect Nominatim rate limits

### 🔒 Smart Price Gate
- Pricing info hidden until both pickup + destination are confirmed
- Friendly empty state with feature preview
- Scenario switcher to simulate real-world conditions

### 🎨 Modern UI
- Light mode with glassmorphism cards
- Gradient hero header (teal → emerald → cyan)
- Smooth CSS animations (fadeUp, float, shimmer skeleton)
- Fully responsive: mobile → tablet → desktop
- Live clock with date in header

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Go 1.22** | Core language |
| **Gin** | HTTP framework — fast, minimal |
| **Modular Monolith** | Architecture pattern |

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool |
| **Tailwind CSS v4** | Styling |
| **Axios** | HTTP client |
| **Nominatim API** | Free geocoding (no API key) |

### Infrastructure
| Service | Purpose |
|---|---|
| **Render** | Go backend hosting (free) |
| **Vercel** | React frontend hosting (free) |
| **GitHub** | Version control + CI/CD |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│         React 18 + Vite + Tailwind v4           │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │SurgeCard │  │WaitCard  │  │ TrendCard    │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│  ┌─────────────────────────────────────────────┐ │
│  │         LocationSearch + PriceChart         │ │
│  └─────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────┘
                     │ GET /api/v1/ride-info
                     ▼
┌─────────────────────────────────────────────────┐
│                BACKEND (Go + Gin)                │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │              Gin Router                     │ │
│  │         Middleware: CORS, Logger            │ │
│  └──────────┬───────────────┬─────────────────┘ │
│             │               │                   │
│    ┌────────▼───┐  ┌────────▼────┐  ┌─────────┐ │
│    │   Surge    │  │  Predictor  │  │  Trend  │ │
│    │   Engine   │  │   Service   │  │Analyzer │ │
│    └────────────┘  └─────────────┘  └─────────┘ │
│             │               │            │       │
│    ┌────────▼───────────────▼────────────▼─────┐ │
│    │     Mock Data Store (In-memory Go maps)   │ │
│    └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           EXTERNAL (Free, No API Key)            │
│        OpenStreetMap Nominatim API               │
│     Reverse Geocoding + Location Search          │
└─────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
rydence/
│
├── backend/                    # Go + Gin API
│   ├── config/
│   │   └── config.go           # App config, surge thresholds
│   ├── handlers/
│   │   └── pricing.go          # HTTP handlers (thin layer)
│   ├── middleware/
│   │   └── cors.go             # CORS middleware
│   ├── models/
│   │   └── pricing.go          # Request/Response structs
│   ├── services/
│   │   ├── surge.go            # Surge calculation engine
│   │   ├── predictor.go        # Wait & Save prediction logic
│   │   └── trend.go            # Price trend analyzer
│   ├── go.mod
│   ├── go.sum
│   └── main.go                 # Entry point, Gin setup
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── api/
    │   │   ├── rideApi.js       # Backend API calls
    │   │   └── locationApi.js   # Nominatim geocoding
    │   ├── components/
    │   │   ├── RideInfo.jsx     # Main page, all state
    │   │   ├── SurgeCard.jsx    # Pricing + surge level
    │   │   ├── WaitCard.jsx     # Wait & Save recommendation
    │   │   ├── TrendCard.jsx    # Price trend direction
    │   │   ├── PriceChart.jsx   # SVG forecast chart
    │   │   └── LocationSearch.jsx # Search with dropdown
    │   ├── App.jsx
    │   ├── index.css            # Tailwind + animations
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

```bash
go version    # go1.22+
node --version # v18+
git --version
```

### 1. Clone the repo

```bash
git clone https://github.com/YOURUSERNAME/rydence.git
cd rydence
```

### 2. Run the backend

```bash
cd backend
go mod download
go run main.go
```

Backend starts at `http://localhost:8080`

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`

### 4. Open in browser

```
http://localhost:5173
```

Allow location permission when prompted → search a destination → see live pricing! ✅

---

## 📡 API Reference

### Base URL
```
http://localhost:8080/api/v1
```

### Endpoints

#### `GET /ride-info` — Main endpoint
Returns pricing + prediction + trend in one call.

**Query Parameters:**

| Param | Type | Values | Default |
|---|---|---|---|
| `scenario` | string | `rain` \| `normal` \| `event` \| `late` | `normal` |

**Example:**
```bash
curl http://localhost:8080/api/v1/ride-info?scenario=rain
```

**Response:**
```json
{
  "pricing": {
    "current_price": 248,
    "base_price": 180,
    "surge_pct": 38,
    "surge_level": "HIGH",
    "reasons": ["Heavy rain", "Rush hour", "High demand area"],
    "display_price": "₹248"
  },
  "prediction": {
    "should_wait": true,
    "wait_minutes": 8,
    "save_amount": 52,
    "confidence": "MEDIUM",
    "confidence_pct": 62,
    "message": "Demand easing as rain slows"
  },
  "trend": {
    "direction": "DECREASING",
    "label": "Decreasing",
    "description": "Price dropping in next 10–15 mins",
    "price_points": [248, 242, 230, 218, 210, 200, 196, 198, 196]
  }
}
```

#### Other Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/pricing?scenario=` | Surge pricing only |
| GET | `/predict?scenario=` | Prediction only |
| GET | `/trend?scenario=` | Trend only |

### Scenarios

| Scenario | Surge | Wait Recommendation |
|---|---|---|
| `rain` | HIGH (+38%) | Wait 8 mins → Save ₹52 |
| `normal` | LOW (+3%) | Book now |
| `event` | HIGH (+72%) | Wait 20 mins → Save ₹90 |
| `late` | MEDIUM (+17%) | Book now (stable) |

---

## ☁️ Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect GitHub repo

```
Root Directory:  backend
Runtime:         Go
Build Command:   go build -o rydence .
Start Command:   ./rydence
```

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → Import GitHub repo
2. Set Root Directory to `frontend`
3. Framework: Vite (auto-detected)
4. Deploy ✅

### Update API URL before deploying

In `frontend/src/api/rideApi.js`:
```js
const BASE_URL = 'https://your-app.onrender.com/api/v1'
```

---

## 🗺 Roadmap

- [x] Surge indicator with reasons
- [x] Wait & Save prediction with confidence
- [x] Price trend + 30-min forecast chart
- [x] GPS location detection
- [x] India-wide destination search
- [x] Light mode glassmorphism UI
- [x] Responsive design (mobile + tablet + desktop)
- [x] Backend deployed on Render
- [x] Frontend deployed on Vercel
- [ ] Real weather API integration (OpenWeatherMap)
- [ ] Real events API integration
- [ ] Push notifications for price drops
- [ ] Multiple ride types (Auto, Mini, Sedan)
- [ ] Price history for repeated routes
- [ ] PWA (installable on phone)
- [ ] User accounts + saved routes

---

## 🧠 Key Design Decisions

**Why Modular Monolith over Microservices?**
For an MVP, microservices add deployment complexity, network latency between services, and operational overhead. A modular monolith gives us clean code separation while staying simple to deploy and debug. We split into microservices only when we need to scale individual components independently.

**Why pure SVG chart over Chart.js / Recharts?**
Zero dependencies, full control over styling, smaller bundle size, and the chart logic is simple enough (9 data points, line + area) that a library would be overkill.

**Why Nominatim over Google Maps API?**
Google Maps requires a credit card and costs money at scale. Nominatim is free, no API key needed, and covers all of India with high accuracy. Fair use limit (1 req/sec) is handled via 600ms debounce.

**Why simulated data over real APIs?**
MVP focus — the goal is to validate the UI/UX decision-making pattern, not build data pipelines. Real weather + demand APIs can be swapped in later by replacing the service layer functions only.

---

## 👩‍💻 Author

**Prafful Pathak**
- GitHub: [@Praful095](https://github.com/Praful095)
- LinkedIn: [linkedin.com/in/YOURPROFILE](https://linkedin.com/in/praffulpathak098)

Built in 3 days as a production-oriented MVP.
Stack: Go · Gin · React · Tailwind · Vercel · Render

---

## 📄 License

MIT License — feel free to use, modify, and build on this.

---

<div align="center">

**Rydence** — *See the surge. Beat the price.* 🚗

Made with ❤️ for urban India

</div>
