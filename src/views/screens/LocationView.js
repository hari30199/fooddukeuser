import React, { useState, useEffect,useContext } from 'react';

// import all the components we are going to use
import {SafeAreaView,View,Text,StyleSheet,Image,PermissionsAndroid,Platform,Button,TouchableOpacity,} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Popularlocations from '../components/Popularlocations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
const App = (props) => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const {  navigation } = props


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, maximumAge: 1000 }
    );


  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
    <View style={{width:'100%',height:560,}}>
    <GooglePlacesAutocomplete
      style={{zIndex: 2 ,}}
      placeholder='Search your area...'
      minLength={1} 
      autoFocus={false}
      returnKeyType={'search'} 
      listViewDisplayed='auto'  
      fetchDetails={true}
      onPress={(data,details) =>
        navigation.navigate('Detail', {
              lat:details.geometry.location.lat,
              lng:details.geometry.location.lng
          })
      }
      getDefaultValue={() => ''} 
      query={{
        key: 'AIzaSyCsSMOQKo0RE0mKvmqjQWMGhHmVVqqEmsU',
        language: 'en',  
      }} 
      styles={{
        textInputContainer: {
          width: '100%',
          borderColor:'#5757574f',
          borderWidth:0.3,
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}  
      currentLocation={true}
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch'
      GoogleReverseGeocodingQuery={{    
      }} 
      renderLeftButton={()=><Icon name="keyboard-arrow-left" size={32} color={'grey'} onPress={navigation.goBack}
      style={{backgroundColor:'white',height:44,padding:6}}
      />}
    />

{locationStatus != "You are Here" ?
            (
              <Text style={styles.currentloc}>Loading...</Text>
            ):(
              <TouchableOpacity style={styles.currentloc}  onPress={()=> navigation.navigate('Detail', {
                lat:[currentLatitude],
                lng:[currentLongitude]
            })
               }>  
              <Text style={{color:'black',left:8}}  ><Ionicons name='location-outline' size={16} color='green'/> Use current location</Text>
              </TouchableOpacity>
            )}
            
            
   {/* <Currentlocation/> */}
   <View>
   <Popularlocations />
   </View>
  
   {/* <SavedAddress/> */}
   
   <Text style={styles.boldText}>{locationStatus}</Text>
    </View>
    {/* <View style={{width:'80%',height:'80%',position:'absolute',top:170,opacity:0.1,left:30}}>
             <LottieView
             
                          source={require('../../assets/loc.json')}
                          colorFilters={[
                            {
                              keypath: 'button',
                              color: '#F00000',
                            },
                            {
                              keypath: 'Sending Loader',
                              color: '#F00000',
                            },
                          ]}
                          autoPlay
                          loop
              
                          />
                          </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  currentloc:{
    left:30,
    color:'black',
    bottom:190,
    fontSize:16,
    borderWidth:0.3,
    width:'50%',
    backgroundColor:'#eaecee',
    borderColor:'#eaecee',
    borderRadius:5,
    padding:8
},
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    right:400
  },
});

export default App;
