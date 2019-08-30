import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles, searchStyles } from './styles'
import { useHeading, useLocation, requestLocationPermission, Position, Angle } from './geo';
import { LinearGradient } from 'expo-linear-gradient';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ProgressBar, Colors } from 'react-native-paper';
import { progress } from './progress';
import { GOOGLE_API_KEY } from './secrets';


export default function App() {
  
  requestLocationPermission();

  const heading: Angle = useHeading();
  const location: Position = useLocation();

  var start: Position = null;
  var finish: Position = null;

  return (
    <LinearGradient colors={['#2F80ED', '#56CCF2']} style={styles.background}>
      <View style={styles.search}>
        <View style={styles.searchBoundingBox}>
          <GooglePlacesAutocomplete
            placeholder='Where are you going?'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            fetchDetails={true}
            listViewDisplayed='true'
            onPress={(data, details=null) => { start = location; finish = data; }}
            renderDescription={row => row.description}
            GooglePlacesDetailsQuery={{fields: 'formatted_address'}}
            GooglePlacesSearchQuery={{rankby: 'distance'}}
            query={{key: GOOGLE_API_KEY, language: 'en'}}
            styles={searchStyles}
            nearbyPlacesAPI='GooglePlacesSearch'
          />
        </View>
      </View>
      <View style={styles.pointer}>
        <View style={styles.pointerBoundingBox}>
          <Image
            source={require('./img/arrow.png')}
            style={{width: '100%', height: '100%', transform: [{rotate: `${360-heading}` + 'deg'}]}}
          />
        </View>
      </View>
      <View style={styles.progressBoundingBox}>
        <ProgressBar
          progress={(360.0 - heading) / 360.0}
          color={Colors.yellow700}
          style={styles.progress}
        />
      </View>
    </LinearGradient>
  );
}
