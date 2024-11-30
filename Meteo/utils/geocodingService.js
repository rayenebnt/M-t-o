import axios from 'axios';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getCoordinates = async (city) => {
  try {
    const response = await axios.get(GEOCODING_URL, {
      params: {
        name: city,
      },
    });
    if (response.data.results && response.data.results.length > 0) {
      const { latitude, longitude } = response.data.results[0];
      return { latitude, longitude };
    } else {
      throw new Error('City not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Unable to fetch coordinates.');
  }
};
