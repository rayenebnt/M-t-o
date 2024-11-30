import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { saveCity } from '../utils/storage';

// Import the local image
import background from '../assets/animation.jpg';

function HomeScreen({ navigation }) {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    if (city.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer le nom d\'une ville.');
      return;
    }

    await saveCity(city);
    navigation.navigate('Detail', { city });
  };

  return (
    <ImageBackground 
      style={styles.background}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Rechercher une ville</Title>
            <TextInput
              mode="outlined"
              label="Entrez le nom d'une ville"
              value={city}
              onChangeText={setCity}
              style={styles.input}
              placeholder="Paris, New York, Tokyo..."
            />
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={handleSearch} style={styles.button}>
                Rechercher
              </Button>
              <Button mode="outlined" onPress={() => navigation.navigate('SavedCities')} style={styles.button}>
                Villes sauvegardées
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover', // Adjusts the image to cover the entire background
    alignSelf: 'stretch',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better contrast
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    margin: 16,
    elevation: 4,
    borderRadius: 10, // Adding slight border radius for modern look
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency for a soft look
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
    color: '#FFF',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default HomeScreen;
