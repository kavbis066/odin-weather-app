const API_KEY = "YSLPBFVPZU3ANVTU363LBB9HM";
const BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";


async function getWeather(location, unit = "metric") {
    const params = new URLSearchParams({
        unitGroup: unit,
        include: "current,days",
        elements:
            "datetime,tempmax,tempmin,temp,feelslike,humidity,windspeed,pressure,visibility,conditions,icon",
        key: API_KEY,
        contentType: "json",
    });

    const url =
        `${BASE_URL}${encodeURIComponent(location)}?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Could not find that location. Please check your spelling."
        );
    }

    const data = await response.json();
    return processWeatherData(data);
}

function processWeatherData(data) {
    const current = data.currentConditions;
    return {
        location: {
            city: data.resolvedAddress,
            timezone: data.timezone,
        },
        current: {
            temperature: current.temp,
            feelsLike: current.feelslike,
            humidity: current.humidity,
            windspeed: current.windspeed,
            pressure: current.pressure,
            visibility: current.visibility,
            conditions: current.conditions,
            icon: current.icon,
            datetime: current.datetime,
        },
        forecast: data.days.slice(0, 7).map((day) => ({
            date: day.datetime,
            max: day.tempmax,
            min: day.tempmin,
            conditions: day.conditions,
            icon: day.icon,
        })),
    };
}

export {
    getWeather,
};