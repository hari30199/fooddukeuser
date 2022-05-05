import React, {useState,useRef} from 'react';
import {SafeAreaView,StyleSheet,View,Button,Platform,Image,Text,Animated} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
const App = (props) => {
const {navigation} = props
const [visible,setVisible] = useState(false)
const progress = useRef(new Animated.Value(1)).current;
const handleLikeAnimation = () => {
  Animated.timing(progress, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
  }).start();
};

  return (
    <SafeAreaView style={{flex:1}} >
      <View style={{backgroundColor:'white',flexDirection:'row',height:50}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:15}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:15,
        color:'black'
      }}>ALERTS</Text>
      </View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        {/* <TouchableOpacity onPress={handleLikeAnimation} > */}
        <Feather name="bell" size={250} color='#6c757d12'></Feather>
    
        {/* </TouchableOpacity> */}
     
    <Text style={{fontFamily:'FontAwesome5_Solid',color:'#6c757d1f'}}>No new alerts</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});

export default App;

