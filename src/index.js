import "./../style.css";
import { getWeather } from "./weather";

// ==============================
// DOM ELEMENTS
// ==============================
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#location-search");
const weather = document.querySelector(".weather");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const errorMessage = document.querySelector(".error-message");
const unitButtons = document.querySelectorAll(".unit-button");

// Current weather
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const date = document.querySelector(".date");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature-value");
const temperatureUnit = document.querySelector(".temperature-unit");
const conditions = document.querySelector(".conditions");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const forecast = document.querySelector(".forecast");

// ==============================
// STATE
// ==============================
let currentUnit = "metric";
let currentLocation = "Delhi";

// ==============================
// WEATHER ICONS
// ==============================
const weatherIcons = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "☁️",
    cloudy: "☁️",
    rain: "🌧️",
    snow: "❄️",
    fog: "🌫️",
    wind: "💨",
    thunderstorm: "⛈️",
};

// ==============================
// FETCH WEATHER
// ==============================
async function loadWeather(location) {
    showLoading();
    hideError();
    try {
        const weatherData = await getWeather(location, currentUnit);
        displayWeather(weatherData);
        currentLocation = location;
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// ==============================
// DISPLAY WEATHER
// ==============================
function displayWeather(data) {
    weather.classList.remove("hidden");

    // Location
    city.textContent = data.location.city;
    country.textContent = getCountryName(data.location.city);

    // Current weather
    temperature.textContent = Math.round(data.current.temperature);
    temperatureUnit.textContent = currentUnit === "metric" ? "°C" : "°F";
    conditions.textContent = data.current.conditions;
    feelsLike.textContent = `Feels like ${Math.round(data.current.feelsLike)}°`;

    // Icon
    weatherIcon.textContent = getWeatherIcon(data.current.icon);

    // Details
    humidity.textContent = `${Math.round(data.current.humidity)}%`;
    wind.textContent = `${Math.round(data.current.windspeed)} ${
            currentUnit === "metric"
                ? "km/h"
                : "mph"
        }`;
    pressure.textContent = `${Math.round(data.current.pressure)} hPa`;
    visibility.textContent = `${Math.round(data.current.visibility)} ${
            currentUnit === "metric"
                ? "km"
                : "mi"
        }`;

    // Date
    date.textContent = formatDate(data.current.datetime);

    // Forecast
    displayForecast(data.forecast);

    // Background
    updateBackground(data.current.icon);
}

// ==============================
// FORECAST
// ==============================
function displayForecast(days) {
    forecast.innerHTML = "";

    days.forEach((day) => {
        const forecastCard = document.createElement("article");
        forecastCard.classList.add("forecast-card");

        const dayName = document.createElement("p");
        dayName.classList.add("forecast-day");
        dayName.textContent = formatDay(day.date);

        const icon = document.createElement("div");
        icon.classList.add("forecast-icon");
        icon.textContent = getWeatherIcon(day.icon);

        const condition = document.createElement("p");
        condition.classList.add("forecast-condition");
        condition.textContent = day.conditions;

        const temperatures = document.createElement("div");
        temperatures.classList.add("forecast-temperatures");

        const max = document.createElement("strong");
        max.textContent = `${Math.round(day.max)}°`;

        const min = document.createElement("span");
        min.textContent = `${Math.round(day.min)}°`;

        temperatures.append(max, min);
        forecastCard.append(
            dayName,
            icon,
            condition,
            temperatures
        );
        forecast.appendChild(forecastCard);
    });
}

// ==============================
// SEARCH FORM
// ==============================
searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const location =
            searchInput.value.trim();
        if (!location) {
            return;
        }
        await loadWeather(location);
        searchInput.value = "";
    });

// ==============================
// UNIT TOGGLE
// ==============================
unitButtons.forEach((button) => {
    button.addEventListener("click", async () => {
            const newUnit = button.dataset.unit;
            if (newUnit === currentUnit) return;
            
            currentUnit = newUnit;

            unitButtons.forEach((unitButton) => {
                    unitButton.classList.remove("active");
                });
            button.classList.add("active");
            await loadWeather(currentLocation);
        }
    );
});

// ==============================
// LOADING
// ==============================
function showLoading() {
    loading.classList.remove("hidden");
    weather.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

// ==============================
// ERROR
// ==============================
function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove("hidden");
    weather.classList.add("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

// ==============================
// HELPERS
// ==============================
function getWeatherIcon(icon) {
    return weatherIcons[icon] || "🌤️";
}

function formatDay(dateString) {
    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
            weekday: "short",
        });
}

function formatDate(dateString) {
    const date = new Date(`1970-01-01T${dateString}`);

    return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
}

function getCountryName(location) {
    const parts = location.split(",");

    return parts.length > 1
        ? parts[parts.length - 1].trim()
        : "";
}

// ==============================
// DYNAMIC BACKGROUND
// ==============================
function updateBackground(icon) {
    document.body.className = "";
    if (icon.includes("rain") || icon.includes("showers")) {
        document.body.classList.add("rainy");
    } else if (icon.includes("snow")) {
        document.body.classList.add("snowy");
    } else if (icon.includes("clear-day")) {
        document.body.classList.add("sunny");
    } else if (icon.includes("clear-night")) {
        document.body.classList.add("night");
    } else if (icon.includes("cloud")) {
        document.body.classList.add("cloudy");
    } else {
        document.body.classList.add("default");
    }
}

// ==============================
// INITIAL WEATHER
// ==============================
loadWeather("Delhi");