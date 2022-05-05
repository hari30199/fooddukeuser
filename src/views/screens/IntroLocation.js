import React from 'react';
import {SafeAreaView,View,Text,Platform,StyleSheet,Image,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from "react-native-web-swiper";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const IntroLocation = (props) => {
  const { route, navigation } = props
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 16);
  
  const imageWidth = dimensions.width;
  console.log(imageHeight,imageWidth)
  const onLocationEnablePressed = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
       if (data != 'already-enabled' && data != 'enabled') 
       return  console.log(data);
        
      }).catch(err => {
        console.log("Error " + err.message + ", Code : " + err.code);
      });
    }
  }

  return (
   
      <View style={{width:'100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
   <View style={{width:'100%',height:imageWidth}}>
   <Swiper     
       
                    from={1}
                    minDistanceForAction={0}
                    controlsProps={{
                      showsButtons:false,
                      dotsTouchable: false,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '',
                      autoplayDirection:'true',
                      autoplay:'true',
                      autoplayTimeout:'2',
                      nextTitleStyle: {  fontSize: 24, fontWeight: '500' },
                      PrevComponent: ({ onPress }) => (
                        <TouchableOpacity onPress={onPress}>
                        </TouchableOpacity>
                      ),
                    }}
                  >
                      <View style={{alignItems:"center"}}>
                      <Image resizeMode='contain' 
                      style={{ width: '100%', height: imageWidth}}
                      source={require('../../assets/intro1.png')}></Image>
                      </View>
                      <View style={{flex:1,alignItems:"center"}}>
                      <Image resizeMode='contain' 
                      style={{ width: '100%', height: imageWidth}}
                      source={require('../../assets/intro2.png')}></Image>
                      </View>
                      <View style={{flex:1,alignItems:"center"}}>
                      <Image resizeMode='contain' 
                      style={{ width: '100%', height: imageWidth}}
                      source={require('../../assets/intro3.png')}></Image>
                      </View>
                  </Swiper>
    </View>
      <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
      <View>
                  <Text style={{bottom:25,fontSize:25,color:'black',textAlign:'center'}}>Order from top & favourite restaurants</Text>
                  <Text style={{bottom:25,textAlign:'center'}}>Ready to see top restaurant to order?</Text>
                  <TouchableOpacity activeOpacity={1} style={{bottom:14}} 
                  onPress={
                    () => navigation.navigate('LocationView',onLocationEnablePressed())
                     }>
                      <Text style={styles.titleStyle}>
                      SETUP YOUR LOCATION
                      </Text>
                      </TouchableOpacity>
                      {/* <View style={{flexDirection:'row'}}>
                        <Text>Have an account ?</Text>
                      <TouchableOpacity  onPress={
                      () => navigation.navigate('Login')}>
                        <Text style={{color:'red',}}> Login</Text>
                      </TouchableOpacity>
                      </View> */}
                    </View>
    </View>
  </View>            
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
   

  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 14,
    color:'white',
    backgroundColor:'red',
    width:'100%',
    
  },
  centerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize:26,
    color:'white',
    bottom:40,
    fontWeight:'bold'

  },
  contentcontainer:{
    width: '94%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom:76,
    borderRadius:10,
    left:10
  }
});
export default IntroLocation;