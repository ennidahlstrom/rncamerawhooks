import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './screens/Camera';
import Home from './screens/Home';
import styles from './styles/styles';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerTitle: "Text Recognition Demo"
          }} 
        />  
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            title: "Camera",
            headerTitle: "Scan eartag number"
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
