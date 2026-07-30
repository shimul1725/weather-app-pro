// ১. DOM এলিমেন্ট ধরে ফেলা
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const locationBtn = document.querySelector("#locationBtn");
const statusMessage = document.querySelector("#statusMessage");
const weatherInfo = document.querySelector("#weatherInfo");

const cityNameEl = document.querySelector("#cityName");
const tempEl = document.querySelector("#temperature");
const descEl = document.querySelector("#description");
const humidityEl = document.querySelector("#humidity");
const windSpeedEl = document.querySelector("#windSpeed");
const forecastContainer = document.querySelector("#forecastContainer");

// ২. Weather Data Fetch & Render
// ১. Weather Code থেকে থিম ও ইমোজি পাওয়ার হেল্পার ফাংশন
const getWeatherDetails = (code) => {
  // Clear / Sunny
  if (code === 0) return { theme: "theme-sunny", desc: "Clear Sky", emoji: "☀️" };
  
  // Mainly Clear / Particaly Cloudy / Overcast
  if (code >= 1 && code <= 3) return { theme: "theme-cloudy", desc: "Cloudy", emoji: "⛅" };
  
  // Fog
  if (code >= 45 && code <= 48) return { theme: "theme-cloudy", desc: "Foggy", emoji: "🌫️" };
  
  // Rain / Drizzle / Shower
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { theme: "theme-rainy", desc: "Rainy", emoji: "🌧️" };
  }
  
  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return { theme: "theme-snowy", desc: "Snowy", emoji: "❄️" };
  }

  // Thunderstorm
  if (code >= 95 && code <= 99) return { theme: "theme-rainy", desc: "Thunderstorm", emoji: "⛈️" };

  // Default
  return { theme: "theme-sunny", desc: "Clear", emoji: "🌤️" };
};

// ২. মূল Weather Fetch ফাংশন (আপডেট)
const fetchWeatherData = async (lat, lon, locationName) => {
  try {
    statusMessage.innerText = "Fetching weather details...";
    weatherInfo.style.display = "none";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();

    const currentWeather = data.current_weather;
    const currentHumidity = data.hourly.relative_humidity_2m[0];

    // Weather code দিয়ে থিম, বিবরণ ও ইমোজি নির্ধারণ
    const { theme, desc, emoji } = getWeatherDetails(currentWeather.weathercode);

    // 🎨 Dynamic Theme Apply (Body Class Change)
    document.body.className = ""; // আগের সব থিম রিমুভ করা
    document.body.classList.add(theme); // নতুন থিম যুক্ত করা

    // DOM-এ ডাটা আপডেট
    cityNameEl.innerText = locationName;
    tempEl.innerText = `${currentWeather.temperature}°C`;
    descEl.innerText = desc;
    windSpeedEl.innerText = `${currentWeather.windspeed} km/h`;
    humidityEl.innerText = `${currentHumidity}%`;

    // হিরো কার্ডের ইমোজি আপডেট
    const weatherEmojiEl = document.querySelector(".weather-emoji");
    if (weatherEmojiEl) weatherEmojiEl.innerText = emoji;

    // ৫ দিনের Forecast রেন্ডার
    forecastContainer.innerHTML = "";
    
    for (let i = 0; i < 5; i++) {
      const dateStr = data.daily.time[i];
      const maxTemp = data.daily.temperature_2m_max[i];

      const dateObj = new Date(dateStr);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      if (i === 0) forecastItem.classList.add("active");

      forecastItem.innerHTML = `
        <p class="date">${dayName}</p>
        <p style="font-size: 18px; margin: 6px 0;">${emoji}</p>
        <p class="temp">${maxTemp}°</p>
      `;
      forecastContainer.appendChild(forecastItem);
    }

    statusMessage.innerText = "";
    weatherInfo.style.display = "block";

  } catch (error) {
    statusMessage.innerText = "Failed to load weather data!";
    console.error(error);
  }
};

// ৪. শহরের নাম দিয়ে সার্চ
const getWeatherByCity = async () => {
  const city = cityInput.value.trim();
  if (!city) {
    statusMessage.innerText = "Please enter a city name!";
    return;
  }

  try {
    statusMessage.innerText = "Searching location...";
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      statusMessage.innerText = "City not found!";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    fetchWeatherData(latitude, longitude, `${name}, ${country}`);

  } catch (error) {
    statusMessage.innerText = "Error searching city!";
  }
};

// ৫. Geolocation Functionality
const getWeatherByLocation = () => {
  if (navigator.geolocation) {
    statusMessage.innerText = "Getting your current location...";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon, "Your Location 📍");
      },
      () => {
        statusMessage.innerText = "Location access denied!";
      }
    );
  } else {
    statusMessage.innerText = "Geolocation is not supported.";
  }
};

// ইভেন্ট লিসেনার
searchBtn.addEventListener("click", getWeatherByCity);
locationBtn.addEventListener("click", getWeatherByLocation);
cityInput.addEventListener("keyup", (e) => e.key === "Enter" && getWeatherByCity());