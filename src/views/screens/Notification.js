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

// import React, { useEffect, useState,useContext } from 'react';
// import {  TouchableOpacity, View, StyleSheet,Image,Text} from "react-native";
// import Swiper,{Autoplay} from "react-native-web-swiper";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// import {FlatListSlider} from 'react-native-flatlist-slider';
// import BASEURL from '../../config'
// export default function Trending() {
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
    
//   fetch(`${BASEURL}/public/api/promo-slider`,{
//     method: 'POST', 
         
//     headers: {
//       'Accept': '*/*',
//       'Content-Type': 'application/json',
//   },
//   body: JSON.stringify()
//   })
  
//     .then((response) =>(response.json()))
//     .then((result) => {
//       // console.log(result.mainSlides[0].data)
//       var i=0
//       for ( i=0; i<result.mainSlides.length; i++)
//       setData(result.mainSlides);
      
//     })
//     .catch((error) => console.error(error))
//     .finally(() => setLoading(false));
   
// }, []);
// const images = [
//   {
//    image:`${BASEURL}/${data.image}`,
  
//   },
//  ]

//  const slider = (i) =>{
//   var i= 0 
//   const views = [];
//   for (i=0; i<data.length;i++){
//     views.push(
      
//       <FlatListSlider
//       data={`${BASEURL}/${data[i].data.image}`}
//       height={240}
//       timer={5000}
//       onPress={item => alert(JSON.stringify(item))}
//       // contentContainerStyle={{paddingHorizontal: 16}}
//       // indicatorContainerStyle={{position:'absolute', bottom: 20}}
//       indicatorActiveColor={'orange'}
//       indicatorInActiveColor={'#ffffff'}
//       indicator={true}
//       indicatorActiveWidth={24}
//       animation
//      />
//     )
//   }
//   return views
// }   


// // const img = `${BASEURL}/${data[i].data.image}`
  

//         return (
//           isLoading ? <View>
//             <SkeletonPlaceholder>
//               <View style={{width:'100%',height:200}}></View>
//             </SkeletonPlaceholder>
//           </View>:
//         <View style={styles.categorie} >
                  
//                      {slider()}
//                </View>
   
      
//         );
//     }
//     const styles = StyleSheet.create({
//         categorie:{
//             width:"100%",
//             right:8
//         }
//     });