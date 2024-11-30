import AsyncStorage from '@react-native-async-storage/async-storage';

const CITIES_KEY = 'savedCities';

export const saveCity = async (city) => {
  try {
    const savedCities = await AsyncStorage.getItem(CITIES_KEY);
    const cities = savedCities ? JSON.parse(savedCities) : [];
    if (!cities.includes(city)) {
      cities.push(city);
      await AsyncStorage.setItem(CITIES_KEY, JSON.stringify(cities));
    }
  } catch (error) {
    console.error('Error saving city:', error);
  }
};

export const getSavedCities = async () => {
  try {
    const savedCities = await AsyncStorage.getItem(CITIES_KEY);
    return savedCities ? JSON.parse(savedCities) : [];
  } catch (error) {
    console.error('Error getting saved cities:', error);
    return [];
  }
};

export const deleteCity = async (city) => {
  try {
    const savedCities = await AsyncStorage.getItem(CITIES_KEY);
    const cities = savedCities ? JSON.parse(savedCities) : [];
    const updatedCities = cities.filter(item => item !== city);
    await AsyncStorage.setItem(CITIES_KEY, JSON.stringify(updatedCities));
  } catch (error) {
    console.error('Error deleting city:', error);
  }
};
