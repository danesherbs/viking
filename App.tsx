import React from 'react';
import { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useHeading, useLocation, requestLocationPermission, Position, Angle } from './geo';
import { LinearGradient } from 'expo-linear-gradient';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { ProgressBar, Colors } from 'react-native-paper';
import { progress } from './progress';
import { GOOGLE_API_KEY } from './secrets';


function JourneyProgressBar(props) {
  if (props.start && props.current && props.finish) {
    return (
      <ProgressBar
          progress={progress(props.start, props.current, props.finish)}
          color={Colors.yellow700}
          style={styles.progress}
      />
    );
  }

  return null;  // journey is undefined
}

function JourneyDirection(props) {
  if (props.location && props.finish) {
    return (
      <Image
        source={require('./img/arrow.png')}
        style={{width: '100%', height: '100%', transform: [{rotate: `${360-props.heading}` + 'deg'}]}}
      />
    );
  }

  return null;  // journey is undefined
}

function App() {
  
  requestLocationPermission();

  const heading: Angle = useHeading();
  const location: Position = useLocation();
  const [start, setStart] = useState<Position>(undefined);
  const [finish, setFinish] = useState<Position>(undefined);

  console.log(`(start, location, finish): ((${start}), (${location}), (${finish}))`)

  return (
    <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.background}>
      <View style={styles.search}>
        <GooglePlacesAutocomplete
          placeholder='Where are you going?'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          fetchDetails={true}
          listViewDisplayed='true'
          onPress={(_, {geometry: { location: { lat, lng } } }) => { setStart(location); setFinish([parseFloat(lat), parseFloat(lng)]) }}
          renderDescription={row => row.description}
          GooglePlacesDetailsQuery={{fields: 'formatted_address'}}
          GooglePlacesSearchQuery={{rankby: 'distance'}}
          query={{key: GOOGLE_API_KEY, language: 'en'}}
          styles={searchStyles}
          nearbyPlacesAPI='GooglePlacesSearch'
        />
      </View>
      <View style={styles.pointer}>
        <JourneyDirection heading={heading} />
      </View>
      <View style={styles.progressBoundingBox}>
        <JourneyProgressBar start={start} current={location} finish={finish} />
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1
  },

  search: {
    backgroundColor: 'powderblue',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  searchBoundingBox: {
    backgroundColor: 'black',
    width: '85%',
  },

  pointerBoundingBox: {
    backgroundColor: 'blue',
    width: 350,
    height: 350,
  },

  pointer: {
    backgroundColor: 'skyblue',
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressBoundingBox: {
    backgroundColor: 'steelblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progress: {
    width: '85%',
    transform: [{ scaleY: 12.0 }],
  },
});

const searchStyles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    position: 'absolute',
    top: '50%',
    width: '80%',
    left: '-40%',
  },

  listView: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    position: 'absolute',
    top: '90%',
    width: '80%',
    left: '-40%',
  },

  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },

  predefinedPlacesDescription: {
    color: '#1faadb',
  },

  description: {
    fontWeight: 'bold',
  },
});

const nativeSearchStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingBottom: 13,
    paddingTop: 13,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  input: {
    marginLeft: 6,
    overflow: 'hidden',
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#dcdce1',
    borderRadius: 9,
    minHeight: 36,
    marginLeft: 8,
    marginRight: 8,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
  buttonTextStyle: {
    color: '#007aff',
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
  },
  buttonTextDisabled: {
    color: '#cdcdcd',
  },
  cancelButtonContainer: {
    position: 'absolute',
  },
});


export default App;