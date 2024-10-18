import axios from "axios";

const URL = 'https://api.weatherapi.com/v1/forecast.json'
const FORECAST_DAYS = 5

export async function fetchForecast(location: any) {
  return await axios({
    url: URL,
    method: "get",
    params: {
      q: location,
      days: FORECAST_DAYS,
      key: process.env.WEATHER_API_KEY,
    },
    responseType: "json",
  })
    .then((response) => {
      const city = response.data.location.name;
      const country = response.data.location.country;
      const locationName = `${city}, ${country}`;
      const weatherData = response.data.forecast.forecastday.map((forecastDay: any)=>{
        return {
            date: forecastDay.date,
            temperatureMinC: forecastDay.day.mintemp_c,
            temperatureMaxC: forecastDay.day.maxtemp_c,
            temperatureMinF: forecastDay.day.mintemp_f,
            temperatureMaxF: forecastDay.day.maxtemp_f,

            sunriseTime: forecastDay.astro.sunrise,
            sunsetTime: forecastDay.astro.sunset,
            moonriseTime: forecastDay.astro.moonrise,
            moonsetTime: forecastDay.astro.moonset,
        }
      });

      return {
        locationName,
        weatherData,
      }
    })
    .catch((error) => {
      console.error(error);
      const locationName = `${city}, ${country}`;
      throw new Error(`Failed to fetch forecast for ${locationName}`);
    });
}

