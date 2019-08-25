import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useHeading, useLocation } from './geo';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  
  const heading = useHeading();
  const location = useLocation();

  return (
    <LinearGradient 
      colors={['#2F80ED', '#56CCF2']}
      style={styles.background}>
      <Text>Hello!</Text>
      <Text>{heading}</Text>
      <Text>{location}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
