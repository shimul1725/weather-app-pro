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
const fetchWeatherData = async (lat, lon, locationName) => {
  try {
    statusMessage.innerText = "Fetching weather details...";
    weatherInfo.style.display = "none";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();

    const currentWeather = data.current_weather;
    const currentHumidity = data.hourly.relative_humidity_2m[0];

    // DOM-এ বর্তমান ডাটা বসানো
    cityNameEl.innerText = locationName;
    tempEl.innerText = `${currentWeather.temperature}°C`;
    descEl.innerText = `Wind: ${currentWeather.windspeed} km/h`;
    windSpeedEl.innerText = `${currentWeather.windspeed} km/h`;
    humidityEl.innerText = `${currentHumidity}%`;

    // ৩. ৫ দিনের Forecast রেন্ডার
    forecastContainer.innerHTML = "";
    
    for (let i = 0; i < 5; i++) {
      const dateStr = data.daily.time[i];
      const maxTemp = data.daily.temperature_2m_max[i];

      // তারিখ থেকে দিনের নাম (যেমন Wed, Thu) বের করা
      const dateObj = new Date(dateStr);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      
      // উদাহরণ হিসেবে ৩ নম্বর দিনকে active রাখা হয়েছে ডিজাইনের মতো
      if (i === 2) forecastItem.classList.add("active");

      forecastItem.innerHTML = `
        <p class="date">${dayName}</p>
        <p style="font-size: 18px; margin: 6px 0;">🌤️</p>
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