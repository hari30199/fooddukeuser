import React from 'react';
import {ActivityIndicator,Image, View} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
    <Image style={{width:250,height:250}}
     source={require('../../assets/loader.gif')} >
  </Image>
  </View>
  );
};

export default SplashScreen;