/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ \"./src/weather.js\");\n\n\n\n// ==============================\n// DOM ELEMENTS\n// ==============================\nconst searchForm = document.querySelector(\".search-form\");\nconst searchInput = document.querySelector(\"#location-search\");\nconst weather = document.querySelector(\".weather\");\nconst loading = document.querySelector(\".loading\");\nconst error = document.querySelector(\".error\");\nconst errorMessage = document.querySelector(\".error-message\");\nconst unitButtons = document.querySelectorAll(\".unit-button\");\n\n// Current weather\nconst city = document.querySelector(\".city\");\nconst country = document.querySelector(\".country\");\nconst date = document.querySelector(\".date\");\nconst weatherIcon = document.querySelector(\".weather-icon\");\nconst temperature = document.querySelector(\".temperature-value\");\nconst temperatureUnit = document.querySelector(\".temperature-unit\");\nconst conditions = document.querySelector(\".conditions\");\nconst feelsLike = document.querySelector(\".feels-like\");\nconst humidity = document.querySelector(\".humidity\");\nconst wind = document.querySelector(\".wind\");\nconst pressure = document.querySelector(\".pressure\");\nconst visibility = document.querySelector(\".visibility\");\nconst forecast = document.querySelector(\".forecast\");\n\n// ==============================\n// STATE\n// ==============================\nlet currentUnit = \"metric\";\nlet currentLocation = \"Delhi\";\n\n// ==============================\n// WEATHER ICONS\n// ==============================\nconst weatherIcons = {\n    \"clear-day\": \"☀️\",\n    \"clear-night\": \"🌙\",\n    \"partly-cloudy-day\": \"⛅\",\n    \"partly-cloudy-night\": \"☁️\",\n    cloudy: \"☁️\",\n    rain: \"🌧️\",\n    snow: \"❄️\",\n    fog: \"🌫️\",\n    wind: \"💨\",\n    thunderstorm: \"⛈️\",\n};\n\n// ==============================\n// FETCH WEATHER\n// ==============================\nasync function loadWeather(location) {\n    showLoading();\n    hideError();\n    try {\n        const weatherData = await (0,_weather__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location, currentUnit);\n        displayWeather(weatherData);\n        currentLocation = location;\n    } catch (error) {\n        showError(error.message);\n    } finally {\n        hideLoading();\n    }\n}\n\n// ==============================\n// DISPLAY WEATHER\n// ==============================\nfunction displayWeather(data) {\n    weather.classList.remove(\"hidden\");\n\n    // Location\n    city.textContent = data.location.city;\n    country.textContent = getCountryName(data.location.city);\n\n    // Current weather\n    temperature.textContent = Math.round(data.current.temperature);\n    temperatureUnit.textContent = currentUnit === \"metric\" ? \"°C\" : \"°F\";\n    conditions.textContent = data.current.conditions;\n    feelsLike.textContent = `Feels like ${Math.round(data.current.feelsLike)}°`;\n\n    // Icon\n    weatherIcon.textContent = getWeatherIcon(data.current.icon);\n\n    // Details\n    humidity.textContent = `${Math.round(data.current.humidity)}%`;\n    wind.textContent = `${Math.round(data.current.windspeed)} ${\n            currentUnit === \"metric\"\n                ? \"km/h\"\n                : \"mph\"\n        }`;\n    pressure.textContent = `${Math.round(data.current.pressure)} hPa`;\n    visibility.textContent = `${Math.round(data.current.visibility)} ${\n            currentUnit === \"metric\"\n                ? \"km\"\n                : \"mi\"\n        }`;\n\n    // Date\n    date.textContent = formatDate(data.current.datetime);\n\n    // Forecast\n    displayForecast(data.forecast);\n\n    // Background\n    updateBackground(data.current.icon);\n}\n\n// ==============================\n// FORECAST\n// ==============================\nfunction displayForecast(days) {\n    forecast.innerHTML = \"\";\n\n    days.forEach((day) => {\n        const forecastCard = document.createElement(\"article\");\n        forecastCard.classList.add(\"forecast-card\");\n\n        const dayName = document.createElement(\"p\");\n        dayName.classList.add(\"forecast-day\");\n        dayName.textContent = formatDay(day.date);\n\n        const icon = document.createElement(\"div\");\n        icon.classList.add(\"forecast-icon\");\n        icon.textContent = getWeatherIcon(day.icon);\n\n        const condition = document.createElement(\"p\");\n        condition.classList.add(\"forecast-condition\");\n        condition.textContent = day.conditions;\n\n        const temperatures = document.createElement(\"div\");\n        temperatures.classList.add(\"forecast-temperatures\");\n\n        const max = document.createElement(\"strong\");\n        max.textContent = `${Math.round(day.max)}°`;\n\n        const min = document.createElement(\"span\");\n        min.textContent = `${Math.round(day.min)}°`;\n\n        temperatures.append(max, min);\n        forecastCard.append(\n            dayName,\n            icon,\n            condition,\n            temperatures\n        );\n        forecast.appendChild(forecastCard);\n    });\n}\n\n// ==============================\n// SEARCH FORM\n// ==============================\nsearchForm.addEventListener(\"submit\", async (event) => {\n        event.preventDefault();\n        const location =\n            searchInput.value.trim();\n        if (!location) {\n            return;\n        }\n        await loadWeather(location);\n        searchInput.value = \"\";\n    });\n\n// ==============================\n// UNIT TOGGLE\n// ==============================\nunitButtons.forEach((button) => {\n    button.addEventListener(\"click\", async () => {\n            const newUnit = button.dataset.unit;\n            if (newUnit === currentUnit) return;\n            \n            currentUnit = newUnit;\n\n            unitButtons.forEach((unitButton) => {\n                    unitButton.classList.remove(\"active\");\n                });\n            button.classList.add(\"active\");\n            await loadWeather(currentLocation);\n        }\n    );\n});\n\n// ==============================\n// LOADING\n// ==============================\nfunction showLoading() {\n    loading.classList.remove(\"hidden\");\n    weather.classList.add(\"hidden\");\n}\n\nfunction hideLoading() {\n    loading.classList.add(\"hidden\");\n}\n\n// ==============================\n// ERROR\n// ==============================\nfunction showError(message) {\n    errorMessage.textContent = message;\n    error.classList.remove(\"hidden\");\n    weather.classList.add(\"hidden\");\n}\n\nfunction hideError() {\n    error.classList.add(\"hidden\");\n}\n\n// ==============================\n// HELPERS\n// ==============================\nfunction getWeatherIcon(icon) {\n    return weatherIcons[icon] || \"🌤️\";\n}\n\nfunction formatDay(dateString) {\n    const date = new Date(`${dateString}T12:00:00`);\n\n    return date.toLocaleDateString(\"en-US\", {\n            weekday: \"short\",\n        });\n}\n\nfunction formatDate(dateString) {\n    const date = new Date(`1970-01-01T${dateString}`);\n\n    return date.toLocaleTimeString(\"en-US\", {\n            hour: \"numeric\",\n            minute: \"2-digit\",\n        });\n}\n\nfunction getCountryName(location) {\n    const parts = location.split(\",\");\n\n    return parts.length > 1\n        ? parts[parts.length - 1].trim()\n        : \"\";\n}\n\n// ==============================\n// DYNAMIC BACKGROUND\n// ==============================\nfunction updateBackground(icon) {\n    document.body.className = \"\";\n    if (icon.includes(\"rain\") || icon.includes(\"showers\")) {\n        document.body.classList.add(\"rainy\");\n    } else if (icon.includes(\"snow\")) {\n        document.body.classList.add(\"snowy\");\n    } else if (icon.includes(\"clear-day\")) {\n        document.body.classList.add(\"sunny\");\n    } else if (icon.includes(\"clear-night\")) {\n        document.body.classList.add(\"night\");\n    } else if (icon.includes(\"cloud\")) {\n        document.body.classList.add(\"cloudy\");\n    } else {\n        document.body.classList.add(\"default\");\n    }\n}\n\n// ==============================\n// INITIAL WEATHER\n// ==============================\nloadWeather(\"Delhi\");\n\n//# sourceURL=webpack://odin-weather-app/./src/index.js?\n}");

/***/ },

/***/ "./src/weather.js"
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getWeather: () => (/* binding */ getWeather)\n/* harmony export */ });\nconst API_KEY = \"YSLPBFVPZU3ANVTU363LBB9HM\";\nconst BASE_URL =\n    \"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/\";\n\n\nasync function getWeather(location, unit = \"metric\") {\n    const params = new URLSearchParams({\n        unitGroup: unit,\n        include: \"current,days\",\n        elements:\n            \"datetime,tempmax,tempmin,temp,feelslike,humidity,windspeed,pressure,visibility,conditions,icon\",\n        key: API_KEY,\n        contentType: \"json\",\n    });\n\n    const url =\n        `${BASE_URL}${encodeURIComponent(location)}?${params}`;\n\n    const response = await fetch(url);\n\n    if (!response.ok) {\n        throw new Error(\n            \"Could not find that location. Please check your spelling.\"\n        );\n    }\n\n    const data = await response.json();\n    return processWeatherData(data);\n}\n\nfunction processWeatherData(data) {\n    const current = data.currentConditions;\n    return {\n        location: {\n            city: data.resolvedAddress,\n            timezone: data.timezone,\n        },\n        current: {\n            temperature: current.temp,\n            feelsLike: current.feelslike,\n            humidity: current.humidity,\n            windspeed: current.windspeed,\n            pressure: current.pressure,\n            visibility: current.visibility,\n            conditions: current.conditions,\n            icon: current.icon,\n            datetime: current.datetime,\n        },\n        forecast: data.days.slice(0, 7).map((day) => ({\n            date: day.datetime,\n            max: day.tempmax,\n            min: day.tempmin,\n            conditions: day.conditions,\n            icon: day.icon,\n        })),\n    };\n}\n\n\n\n//# sourceURL=webpack://odin-weather-app/./src/weather.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;