# 🌤️ Weather App Pro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![API](https://img.shields.io/badge/API-Open--Meteo-blue)](https://open-meteo.com/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

**Weather App Pro** is a responsive, feature-rich web application built with Vanilla JavaScript, HTML5, and CSS3. It leverages the **Open-Meteo API** to provide accurate real-time weather metrics and daily forecasts for locations worldwide without requiring API keys.

---

## 📢 Announcement

> 🆕 **What's New in Version 2.0!**
> - 🚀 **Performance Boost:** Optimized API calls for 30% faster load times.
> - 🎨 **UI Overhaul:** Added dark mode support and updated modern UI design.
> - 📱 **Mobile Responsive:** Fixed mobile navigation drawer and responsive layout bugs.
> - 🔒 **Security:** Updated authentication token handling and API request safety.

---

## 🌟 Key Features

- 🔍 **Global City Search:** Instantly fetch weather conditions for any city around the globe.
- 📍 **One-Click Geolocation:** Get live local weather based on your current geographical coordinates.
- 📅 **5-Day Forecast:** View daily high and low temperatures to plan your week ahead.
- 💨 **Detailed Metrics:** Displays real-time details including temperature, wind speed, and humidity.
- 📱 **Fully Responsive:** Sleek, modern UI tailored for seamlessly operating across mobile, tablet, and desktop screens.
- ⚡ **Lightweight & Fast:** Built with pure Vanilla JS — no heavy frameworks or external dependencies required.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox/Grid), ES6+ JavaScript
* **API Integration:** [Open-Meteo Geocoding & Weather Forecast API](https://open-meteo.com/)
* **Icons & Styling:** Modern UI components with responsive CSS media queries

---

## 🌐 Preview & Live Demo

![Portfolio Banner](docs/readme-banner.png)

🔗 **[Click Here for Live Demo](https://your-demo-link.vercel.app)**

---

## 📂 Project Structure

```text
weather-app-pro/
│
├── index.html          # Main HTML structure
├── styles/
│   └── style.css       # Custom CSS styling & responsive layouts
├── js/
│   └── app.js          # Core JavaScript & API fetch logic
├── docs/
│   └── readme-banner.png  # Banner image for README
└── README.md           # Project documentation
```

---

## 🏗️ System Architecture & Data Flow

The diagram below illustrates how client-side user interactions trigger asynchronous requests to external API services and dynamically render UI updates:

```text
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                             BROWSER (CLIENT SIDE)                           │
 │                                                                             │
 │   ┌──────────────────────┐                 ┌─────────────────────────────┐  │
 │   │     HTML Structure   │  ◄───────────►  │     CSS Styling & Themes    │  │
 │   │ (Input, Buttons, Cards)                 │ (Glassmorphism, Dynamic BG) │  │
 │   └──────────┬───────────┘                 └─────────────────────────────┘  │
 │              │                                                            │
 │              │ (User Interactions: Search Click / Keypress / Geolocation)   │
 │              ▼                                                            │
 │   ┌──────────────────────────────────────────────────────────────────────┐  │
 │   │                        JAVASCRIPT (ENGINE)                           │  │
 │   │                                                                      │  │
 │   │  1. DOM Event Listener capturing inputs                              │  │
 │   │  2. Triggers async/await fetch request                               │  │
 │   │  3. Parses weathercode & dynamically updates DOM & CSS Classes       │  │
 │   └──────────────────┬───────────────────────────────▲───────────────────┘  │
 └──────────────────────┼───────────────────────────────┼──────────────────────┘
                        │                               │
         (1. HTTP GET)  │ `geocoding-api.open-meteo`    │ (2. Returns Lat/Long &
        city name search│ `api.open-meteo.com`          │    Weather JSON Data)
                        ▼                               │
 ┌──────────────────────────────────────────────────────┴──────────────────────┐
 │                             EXTERNAL WEATHER API                            │
 │                                                                             │
 │                   ┌──────────────────────────────────────┐                  │
 │                   │   Open-Meteo Cloud Servers / DB      │                  │
 │                   └──────────────────────────────────────┘                  │
 └─────────────────────────────────────────────────────────────────────────────┘
