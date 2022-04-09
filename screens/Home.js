import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './Camera';
import styles from '../styles/styles';

export default function Home({navigation, route}) {
  const Stack = createNativeStackNavigator();
  const [detectedCode, SetDetectedCode] = useState(null); // variable for rendering detected code

  useEffect(() => {
    if (route.params?.code) {
        SetDetectedCode(route.params?.code);
    }
  }, [route.params?.code]);

  return (
    <View style={styles.body}>
     <Text style={styles.headingText}>Vasikan neuvolakortti</Text>
   
     <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.button} >
              <Text style={styles.buttonText}>Scan Eartag Number</Text>
            </View>
          </View>
        </TouchableOpacity>
         { detectedCode 
         ? <Text style={styles.helpText}> Previously detected code: {detectedCode}</Text>
         : <Text style={styles.helpText}>You have not scanned a code.</Text>
         }
    </View>
  );
}
