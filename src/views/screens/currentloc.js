import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions,TouchableOpacity,Text,Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
const GOOGLE_PLACES_API_KEY = 'AIzaSyCsSMOQKo0RE0mKvmqjQWMGhHmVVqqEmsU'; 



const App = () => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const navigation = useNavigation();
  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };

  return (
    <View style={styles.container}>

      <GooglePlacesAutocomplete
        styles={styles.searchbar}
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        GooglePlacesDetailsQuery={{
          fields: 'geometry',
        }}
        fetchDetails={true}
        onPress={onPress}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} 
      />
     
      <View>
    <TouchableOpacity 
      onPress={() => navigation.navigate('Detail')}>
        <Text style={{fontSize:16,color:'skyblue',left:30,position:'relative',bottom:200,}}>Use current Location</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:335,
    position:'relative' 

  },
  searchbar: {
    description: {
      fontWeight: 'bold',
      width:'80%'
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
      width:'80%'
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      top: 50,
      width:'90%',
      left:20
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
      borderWidth: 0,
    },
    listView: {
      backgroundColor: 'rgba(192,192,192,0.9)',
      top: 46,
      zIndex:5,
      width:'90%',
      left:20
    },
  },
});

export default App;
