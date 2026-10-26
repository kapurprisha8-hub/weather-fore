# ⛅ SkyPulse - Weather Dashboard

> A clean, responsive, and beginner-friendly Weather Dashboard built with **React**, **Vite**, **HTML5**, and **CSS3**. Powered by the free **Open-Meteo API** (zero API keys required).

---

## 📸 Preview

```
+--------------------------------------------------------------------------+
|  ⛅ SkyPulse - Simple Weather Dashboard                    [ °C | °F ]   |
+--------------------------------------------------------------------------+
|  [ 🔍 Search city (e.g., London, Tokyo, New York)... ]   [ Search ]      |
|  Popular: [London] [New York] [Tokyo] [Paris] [Mumbai] [Sydney]          |
+--------------------------------------------------------------------------+
|  London, United Kingdom                                  ( ☀️ Clear Sky )|
|  Monday, Oct 26                                                          |
|                                                                          |
|  18°C                                               ▲ 20°C   ▼ 11°C      |
|  Feels like 17°C                                                         |
+--------------------------------------------------------------------------+
|  [ Humidity: 62% ]  [ Wind: 12 km/h ]  [ Pressure: 1015 hPa ]  [ Rain: 5%]|
+--------------------------------------------------------------------------+
|  5-Day Forecast                                                          |
|  [Today: 18°]  [Tue: 19°]  [Wed: 16°]  [Thu: 15°]  [Fri: 17°]            |
+--------------------------------------------------------------------------+
```

---

## ✨ Features

- 🔍 **Instant City Search**: Search any city in the world using Open-Meteo Geocoding.
- ⚡ **Popular Quick-Pick Chips**: Test instantly with 1-click popular cities (London, New York, Tokyo, Paris, Mumbai, Sydney).
- 🌡️ **Temperature Unit Toggle**: Effortlessly switch between Celsius (°C) and Fahrenheit (°F).
- 📊 **Detailed Weather Metrics**:
  - Current temperature & feels-like temperature.
  - Daily High & Low temperatures.
  - Humidity percentage.
  - Wind speed.
  - Atmospheric surface pressure (hPa).
  - Precipitation probability (rain chance %).
- 📅 **5-Day Weather Forecast**: Clear day-by-day outlook with weather condition icons and temperatures.
- 🎨 **Modern Glassmorphic Dark UI**: Custom vanilla CSS design with smooth animations and responsive mobile layout.
- 🔑 **Zero-Configuration Setup**: Uses the free Open-Meteo API. **No API keys or credit cards needed!** Anyone in your group can clone and run it immediately.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Responsive Flexbox & CSS Grid, Glassmorphism, CSS Variables)
- **API**: [Open-Meteo Weather & Geocoding API](https://open-meteo.com/)

---

## 🚀 Getting Started (Run Locally)

Follow these simple steps to run the project on your local machine:

### 1. Clone the repository
```bash
git clone <YOUR_REPOSITORY_URL>
cd Demo1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in browser
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📁 Project Folder Structure

```
Demo1/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and static media
│   ├── components/         # Reusable React components
│   │   ├── CurrentWeather.jsx  # Hero weather card
│   │   ├── ErrorMessage.jsx    # Error handling display
│   │   ├── Footer.jsx          # App footer & attribution
│   │   ├── ForecastCard.jsx    # Individual forecast day card
│   │   ├── ForecastList.jsx    # 5-day forecast container
│   │   ├── LoadingSpinner.jsx  # Loading state indicator
│   │   ├── Navbar.jsx          # Header with branding & unit switch
│   │   ├── SearchBar.jsx       # Input form & quick city chips
│   │   └── WeatherIcon.jsx     # Dynamic weather icon mapper
│   ├── services/
│   │   └── weatherApi.js   # Open-Meteo API integration & WMO codes
│   ├── App.css             # Main styling & animations
│   ├── App.jsx             # Main container & state manager
│   ├── index.css           # Design tokens, resets, & typography
│   └── main.jsx            # Application entry point
├── .gitignore              # Files excluded from Git
├── index.html              # HTML template & Google Fonts
├── package.json            # Project dependencies & scripts
├── README.md               # Documentation & team guide
└── vite.config.js          # Vite configuration
```

---

## 👥 Group Project Contribution Guide

To keep the repository clean and avoid merge conflicts, please follow this git workflow:

### 🌿 Git Branching Strategy
1. **Never commit directly to `main`**.
2. Create a new branch for each feature or bug fix:
   ```bash
   # Make sure your local main is up to date
   git checkout main
   git pull origin main

   # Create and switch to your feature branch
   git checkout -b feature/your-feature-name
   ```
   *Examples:* `feature/weather-alerts`, `feature/hourly-forecast`, `fix/mobile-padding`.

### ✍️ Commit Guidelines
Write clear, concise commit messages in the present tense:
```bash
git add .
git commit -m "Add hourly forecast slider component"
```

### 🚀 Pushing and Creating a Pull Request (PR)
1. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open GitHub and create a **Pull Request (PR)** against `main`.
3. Ask at least one teammate to review and approve before merging!

---

## 📜 License
This project is created for educational and group project demonstration purposes.
Weather data is provided by [Open-Meteo](https://open-meteo.com/) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
