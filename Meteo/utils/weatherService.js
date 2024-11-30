import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude,
        longitude,
        hourly: 'temperature_2m,relative_humidity_2m,pressure_msl,windspeed_10m,winddirection_10m',
        daily: 'temperature_2m_max,temperature_2m_min,weathercode',
        current_weather: true,
        timezone: 'auto',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch weather data.');
  }
};
