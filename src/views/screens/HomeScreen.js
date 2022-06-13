import Search from '../components/Search';
import React, {Suspense, useState,useEffect,useContext} from 'react';
import {Image,PixelRatio,RefreshControl,StyleSheet,Text,View,TouchableOpacity,Button} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../../AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import TextTicker from 'react-native-text-ticker'
import {ScrollView} from 'react-native-virtualized-view'
 
const HomeScreen = (props) => {
  const { route, navigation } = props
  const [mylocation,setmylocation] = useState("Select address")
  const [refreshing, setRefreshing] = React.useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const {userinfo,isLoading} = useContext(AuthContext);
  
  const Nearyou = React.lazy(() => import('../components/Nearyou'));
  const Blog = React.lazy(()=> import('../components/Blog'))
  const Curtains = React.lazy(()=> import('../components/Curtains'))

 
   const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
   const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setmylocation(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    _retrieveData()
   }, [mylocation])
   
 const _retrieveData = async () => {
   try {
    
     const mylocation = await AsyncStorage.getItem('mylocation')
     if(mylocation !== null) {
 
     }
     setmylocation(mylocation)
     
   } catch(e) {
 
   }
 }

 const goToFoo = () => {
  navigation.navigate('LocationView')
}

  var i =0

  return (
   <SafeAreaView>
     <ScrollView
   
     >     
        <View style={style.header}>
      <Image 
      style={style.logo}
      source={require('../../assets/foodlogo.png')}
    />
     {!userinfo.auth_token ? (
         
         <View style={style.location}>
         {(userinfo[i] == null && userinfo[i] == undefined) ? ( 
           <View>
             <TouchableOpacity onPress={
               () => goToFoo()}>
                 <View style={{width:32,height:42,position:'absolute',top:-8,right:100}}>
                  <LottieView
                               source={require('../../assets/hloc.json')}
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
                               </View>
               <TextTicker
                style={{left:25,top:6,width:100,height:100}}
               duration={8000}
               loop
               bounce = {false}
               repeatSpacer={20}
               marqueeDelay={1000}
             >
               {mylocation}
             </TextTicker>
             </TouchableOpacity>
             </View>
           ):(
             <View style={{flexDirection:'row'}}>
             <TouchableOpacity onPress={
               () => goToFoo()}>
                  <View style={{width:32,height:42,position:'absolute',top:-8,right:100}}>
                  <LottieView
                  
                               source={require('../../assets/hloc.json')}
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
                               </View>
               
               <TextTicker
                style={{left:25,top:6,width:100,height:100}}
               duration={8000}
               loop
               bounce = {false}
               repeatSpacer={20}
               marqueeDelay={1000}
             >
               {Object.values(userinfo[i].address)}
             </TextTicker>
             </TouchableOpacity>
             </View>
           )}
         
        
           </View>
         ):(
              
         <View style={style.location}>
             <View style={{flexDirection:'row'}}>
             <TouchableOpacity onPress={
               () => goToFoo()}>
                  <View style={{width:32,height:42,position:'absolute',top:-8,right:100}}>
                  <LottieView
                  
                               source={require('../../assets/hloc.json')}
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
                               </View>
               <Text style={{left:26,top:6}}>{mylocation}</Text>
               <TextTicker
                style={{left:25,top:6,width:100,height:100}}
               duration={8000}
               loop
               bounce = {false}
               repeatSpacer={20}
               marqueeDelay={1000}
             >
               {mylocation}
             </TextTicker>
             </TouchableOpacity>
             </View>
           </View>
         )}
   
      </View>
       <Suspense fallback={  <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
           <Image style={{width:250,height:250}}
            source={require('../../assets/loader.gif')} >
         </Image>
         </View>}>
      <TouchableOpacity onPress={
          () => navigation.navigate('Explore')}>
       <Search/>
      </TouchableOpacity>
      <Blog />
     <View style={style.View}>

      </View>
      <View style={{bottom:40}}>
      <Curtains />
      </View>
      <View  style={{bottom:2}}>
       
        <Nearyou/>
        
     
      </View>      
      </Suspense>  
    </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    justifyContent:'center',
    paddingHorizontal: 20,
    backgroundColor:'white',
    height:60,
    // alignItems:'center'
  },
  logo:{
      width: PixelRatio.getPixelSizeForLayoutSize(44),
      height: PixelRatio.getPixelSizeForLayoutSize(7),
      top:9
    },
    location:{
        color:'black',
        alignSelf:'flex-end',
        width:"26%",
        height:20,
        alignItems:"center",
        marginRight:4,
        bottom:14
    },
    View:{
       width:'100%',
       height:30,
       flexDirection:'row',
       top:68,
       zIndex:6,
       alignItems:'center',

    },
    imagestyle: {
      height: 20,
      width: 20,
     left:340,
     top:62,
     backgroundColor:'white',
     
    },
  });

export default HomeScreen;

