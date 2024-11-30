import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Card, Title, TextInput, Button, Divider, List } from 'react-native-paper';
import { getSavedCities, saveCity, deleteCity } from '../utils/storage';

function SavedCitiesScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      const savedCities = await getSavedCities();
      setCities(savedCities);
      setLoading(false);
    };

    loadCities();
  }, []);

  const handleAddCity = async () => {
    if (newCity.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer le nom d\'une ville.');
      return;
    }

    await saveCity(newCity);
    const savedCities = await getSavedCities();
    setCities(savedCities);
    setNewCity('');
  };

  const handleDeleteCity = async (city) => {
    await deleteCity(city);
    const savedCities = await getSavedCities();
    setCities(savedCities);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.header}>Villes sauvegardées</Title>
          <FlatList
            data={cities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <List.Item
                title={item}
                right={() => <Button onPress={() => handleDeleteCity(item)}>Supprimer</Button>}
              />
            )}
            ItemSeparatorComponent={() => <Divider />}
          />
          <TextInput
            mode="outlined"
            label="Ajouter une ville"
            value={newCity}
            onChangeText={setNewCity}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAddCity} style={styles.button}>
            Ajouter
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default SavedCitiesScreen;
