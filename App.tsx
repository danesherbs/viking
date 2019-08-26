import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useHeading, useLocation, requestLocationPermission } from './geo';
import { LinearGradient } from 'expo-linear-gradient';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ProgressBar, Colors } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg'


export default function App() {
  
  const heading = useHeading();
  const location = useLocation();
  
  requestLocationPermission();

  return (
    <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.background}>
      <View style={styles.search}/>
      <View style={styles.pointer}>
        {/* <Svg height="100%" width="100%" viewBox="0 0 70 70" style={{}}>
          <Path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="white" />
        </Svg> */}
        <View style={styles.pointerBoundingBox}>
          <Image source={require('./img/arrow.png')} style={{width: '100%', height: '100%', transform: [{rotate: `${360-heading}` + 'deg'}]}}/>
        </View>
        {/* <View style={{backgroundColor: 'yellow', width: 50, height: 50}} /> */}
        {/* <View style={{backgroundColor: 'orange', width: 50, height: 50}} /> */}
        {/* <View style={{backgroundColor: 'green', width: 50, height: 50}} /> */}
      </View>
      <View style={styles.progressBoundingBox}>
        <ProgressBar progress={heading / 360.0} color={Colors.yellow700} style={styles.progress} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },

  search: {
    flex: 2,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  pointerBoundingBox: {
    backgroundColor: 'blue',
    width: 350,
    height: 350
  },

  pointer: {
    flex: 6,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },

  progressBoundingBox: {
    flex: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center'
  },

  progress: {
    width: '85%',
    transform: [{ scaleY: 12.0 }],
  },
});
