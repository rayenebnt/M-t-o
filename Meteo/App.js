import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SavedCitiesScreen from './screens/SavedCitiesScreen';
import SearchBar from './screens/SearchBar';

const Stack = createStackNavigator();




function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="SearchBar" component={SearchBar} />
        <Stack.Screen name="SavedCities" component={SavedCitiesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
