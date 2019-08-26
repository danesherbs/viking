import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useHeading, useLocation } from './geo';
import { LinearGradient } from 'expo-linear-gradient';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ProgressBar, Colors } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg'


export default function App() {
  
  const heading = useHeading();
  const location = useLocation();

  return (
    // <LinearGradient 
    //   colors={['#2F80ED', '#56CCF2']}
    //   style={styles.background}>
    //   <Text>{heading}</Text>
    //   <Text>{location}</Text>
    // </LinearGradient>
    
    // <View style={{flex: 1}}>
    //   <View style={{flex: 1, backgroundColor: 'powderblue'}} />
    //   <View style={{flex: 2, backgroundColor: 'skyblue'}} />
    //   <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    // </View>

    <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.background}>
      <View style={{flex: 1, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center'}}/>
      <View style={{flex: 2, backgroundColor: 'skyblue'}}>
        <Svg height="20" width="20" style={{rotation: heading}}>
          <Path
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
              fill="white"
          />
        </Svg>
      </View>
      <View style={{flex: 3, backgroundColor: 'steelblue'}}>
        <ProgressBar progress={heading / 360.0} color={Colors.yellow700} style={{height: 100}} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  search: {
    backgroundColor: 'black',  // rgba(0,0,0,0)
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});
