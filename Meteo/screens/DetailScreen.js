import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Card, Title, Paragraph, Divider, Avatar } from "react-native-paper";
import { getWeather } from "../utils/weatherService";
import { getCoordinates } from "../utils/geocodingService";
import { getWeatherDescription } from "../utils/weatherDescriptions";
import { formatHour } from "../utils/timeFormatter";

function DetailScreen({ route }) {
  const { city } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { latitude, longitude } = await getCoordinates(city);
        const data = await getWeather(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Paragraph style={styles.errorText}>Erreur: {error}</Paragraph>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Paragraph style={styles.errorText}>
          Aucune donnée météo disponible
        </Paragraph>
      </View>
    );
  }

  const { current_weather, hourly, daily } = weatherData;

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer1}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.city}>{city}</Title>
            <View style={styles.currentWeatherContainer}>
              <Avatar.Icon
                size={64}
                icon="weather-sunny"
                style={styles.weatherIcon}
              />
              <View style={styles.currentWeatherDetails}>
                <Paragraph style={styles.temp}>
                  Température actuelle: {current_weather.temperature}°C /{" "}
                  {(current_weather.temperature * 9) / 5 + 32}°F
                </Paragraph>
                <Paragraph style={styles.detail}>
                  Météo: {getWeatherDescription(current_weather.weathercode)}
                </Paragraph>
                <Paragraph style={styles.detail}>
                  Vitesse du vent: {current_weather.windspeed} m/s
                </Paragraph>
                <Paragraph style={styles.detail}>
                  Direction du vent: {current_weather.winddirection}°
                </Paragraph>
                <Paragraph style={styles.detail}>
                  Humidité: {hourly.relative_humidity_2m[0]}%
                </Paragraph>
                <Paragraph style={styles.detail}>
                  Pression: {hourly.pressure_msl[0]} hPa
                </Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Divider style={styles.divider} />
      </ScrollView>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.scrollContainer2}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Title style={styles.header}>Températures horaires</Title>
              {hourly.temperature_2m.slice(0, 24).map((temp, index) => (
                <Paragraph key={index} style={styles.detail}>
                  {formatHour(index)}: {temp}°C / {(temp * 9) / 5 + 32}°F
                </Paragraph>
              ))}
            </View>
            <Divider style={styles.divider} />
            <View style={styles.column}>
              <Title style={styles.header}>Prévisions sur 5 jours</Title>
              {daily.temperature_2m_max.slice(0, 5).map((tempMax, index) => (
                <View key={index}>
                  <Paragraph style={styles.detail}>
                    {formatDate(daily.time[index])}:
                  </Paragraph>
                  <Paragraph style={styles.detail}>
                    Température maximale: {tempMax}°C / {(tempMax * 9) / 5 + 32}°F
                  </Paragraph>
                  <Paragraph style={styles.detail}>
                    Température minimale: {daily.temperature_2m_min[index]}°C /{" "}
                    {(daily.temperature_2m_min[index] * 9) / 5 + 32}°F
                  </Paragraph>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles existants
  scrollContainer1: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#E0FFFF" , // Couleur bleu clair
  }, 
  scrollContainer2: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#E0FFFF" , // Couleur bleu clair
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 4,
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  currentWeatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  weatherIcon: {
    backgroundColor: "#FFA500",
    marginRight: 16,
  },
  currentWeatherDetails: {
    flex: 1,
  },
  temp: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
    color: "#666",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#444",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  divider: {
    marginVertical: 16,
  },
});

export default DetailScreen;
