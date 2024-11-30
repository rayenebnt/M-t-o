
// HomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('./Image/logo.png')} // Chemin relatif vers votre image
        style={styles.logoImage}
      />
      <Image
        source={{ uri: 'https://example.com/your-weather-image.png' }} // Remplacez par une image pertinente pour la météo
        style={styles.headerImage}
      />
      <Text style={styles.title}>What is the Weather?</Text>
      <Text style={styles.description}>
        Découvrez les conditions météorologiques actuelles pour n'importe quelle ville.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SearchBar')} // Assurez-vous que 'SearchBar' est le nom de votre écran
      >
        <Text style={styles.buttonText}>Rechercher une Ville</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('SavedCities')} // Assurez-vous que 'SavedCities' est le nom de votre écran
      >
        <Text style={styles.secondaryButtonText}>Voir les Villes Enregistrées</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', // Couleur de fond douce
    padding: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: -120,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#87ceeb',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
