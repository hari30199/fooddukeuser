import React,{useState,useEffect,useContext,useRef} from 'react';
import {Animated,Image,ScrollView, StyleSheet,View,Text,Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../AuthContext';
import AsyncStorage from '@react-native-community/async-storage';  
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import call from 'react-native-phone-call';
import LottieView from "lottie-react-native";


// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

 export default function OrderDetailscreen (props)  {
  const [data, setData] = useState([]);
  const [result, setresult] = useState([]);
  const [results, setresults] = useState([]);
  const [items, setitems] = useState([]);
  const [myloc,setmyloc] = useState("");
  const [myloct,setmyloct] = useState("");
  const [mylocation,setmylocation] = useState("Select address")
  const { id ,orderid,orderstatus} = props.route.params;
  const [isLoading, setLoading] = useState(true);
  const {userinfo,userInfo} = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const { route, navigation } = props
  
  const progress = useRef(new Animated.Value(0)).current;
  const [hasLiked, setHasLiked] = useState(false);
 

  const handleLikeAnimation = () => {
    const newValue = hasLiked ? 1 : 0;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasLiked(!hasLiked);
  };
  var [lat,setlat] = useState ('')
  var [long,setlong] = useState ('')
    console.log(id)
  


 
    const triggerCall = () => {
      const phone = results.phone
      const result =  phone

      const args = {
        number: result,
        prompt: true,
      };
      call(args).catch(console.error);
    };


    useEffect(() => {
      _retrieveData()
     }, [])
    
   const _retrieveData = async () => {
     try {
       const value = await AsyncStorage.getItem('myloc')
       if(value !== null) {
       }
       setmyloc(value)
       
     } catch(e) {
     }
   }
   useEffect(() => {
    retrieveData()
   }, [])
   
  const retrieveData = async () => {
   try {
     const value = await AsyncStorage.getItem('myloct')
     if(value !== null) {
  
     }
     setmyloct(value)
     
   } catch(e) {
  
   }
  }
  useEffect(() => {
    _retrieve()
   }, [mylocation])
   
 const _retrieve = async () => {
   try {
    
     const mylocation = await AsyncStorage.getItem('mylocation')
     if(mylocation !== null) {
 
     }
     setmylocation(mylocation)
     
   } catch(e) {
 
   }
 }
//  const onRefresh = React.useCallback(() => {
//   setRefreshing(true);
//   // setlat(true), 
//   // setlong(true),

//   wait(1000).then(() => setRefreshing(false));
// }, []);

    const token = userInfo.auth_token
    const userid = userinfo.id
    // const Orderdetails = () =>{
    //     fetch(`https://meatapp.smartstorez.com/api/get-orders-detail` ,
        
    //       {
    //         method: 'POST', 
                 
    //               headers: {
    //                 "content-type": "application/json",
    //               },
    //               body: JSON.stringify({
    //                 "token":token,
    //                 "order_id":id,
    //               })
    //             })
              
    //             .then((response) => response.json())
    //             .then((json) => setData(json))
    //             .then((data) => JSON.stringify(data))
    //             .catch((error) => console.error(error))
    //             .finally(() => setLoading(false));
    //           }
    //           useEffect(() => {
    //             Orderdetails()
    //            }, [])


    const Delivery = async  () => {
      await fetch('https://demo.foodduke.com/public/api/update-user-info',{
          method:'POST',
          headers: {
            "content-type": "application/json",
          },
          body:JSON.stringify({
            "token":token,
             "unique_order_id":orderid,
             "user_id":userid
          })
        })
        .then((response) =>(response.json()))
        .then((result) => {
          console.log('hello',result.delivery_details)
          setresult(result.data)
          setresults(result.delivery_details) 
          setlat(result.delivery_details.delivery_lat), 
          setlong(result.delivery_details.delivery_long)
         })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
          //  console.log('item',data)
        // const timer = setTimeout(() => {
        //   Delivery();
        // }, 8000);
    
        // return () => clearTimeout(timer);
      } 
      
                       
       
        useEffect(() => {
          isFocused ? (Delivery(),console.log('helloworld')):(Delivery())
          }, [isFocused])

  var i = 0;
  
  var userlat = userinfo[i] == null && userinfo[i] == undefined ? (myloct ):((userinfo[0].latitude))
  var userlong =userinfo[i] == null && userinfo[i] == undefined ? (myloc):((userinfo[0].longitude))
  //  lat =  data[i] != undefined ? (data[i]?.restaurant?.latitude):(1111)
  //  long = data[i] != undefined ? (data[i]?.restaurant?.longitude):(1111)
  // if(userlat != '')
  // locationview()

  // async function locationview () {
  //   await delay(1000)
  // }

      var lat1 =  userlat
      var lat2 =  userlong
  

 
 var i = 0;
 console.log('hello',lat1,lat2)
 
 
 return (
  isLoading ? (   
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
          <Image style={{width:250,height:250}}
           source={require('../../assets/loader.gif')} >
        </Image>
        </View>):(
<View style={{ flex: 1, }}>
  <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
  <Icon name="arrow-back-ios" size={24}  onPress={navigation.goBack} style={{left:20,top:25}} />
  <Text style={{
    fontSize:18,
    fontWeight:'500',
    left:40,
    top:25,
    color:'black'
  }}>{orderid}</Text>
  </View>

  <View style={{ flex: 1,flexBasis:'auto', backgroundColor: 'white',}}>
    <ScrollView >
    <View>
      {orderstatus == 'Order Picked Up' ? (
        
        <View style={styles.container}>
    <MapView
    style={styles.maps}
    showsUserLocation={true}
    // onMapReady={initialRegion}
    initialRegion={{
      latitude:Number(lat1) , 
      longitude:Number(lat2) ,
      latitudeDelta: 0.00005,
      longitudeDelta:  0.0021,
    }}>
    <MapView.Marker
    
     coordinate={{"latitude":Number(userlat),
     "longitude":Number(userlong)}}>
       <Image style={{width:20,height:30}}
       source={require('../../assets/markerhome.png')}>

       </Image>
     </MapView.Marker>
    <MapView.Marker 
    image={require('../../assets/markerdelivery.png')}
    coordinate={{"latitude":Number(lat),
                 "longitude":Number(long)}} />
    <MapViewDirections
      origin={{"latitude":Number(userlat),
      "longitude":Number(userlong)}}
      destination={{"latitude":Number(lat),
                    "longitude":Number(long)}}
      apikey="AIzaSyCsSMOQKo0RE0mKvmqjQWMGhHmVVqqEmsU"
      strokeWidth={3}
      strokeColor="black"
    />
  </MapView>
 
 <View style={{top:20}}>
 <View style={{width:'100%',height:50,alignItems:'center',flexDirection:'row',flex:1,justifyContent:'center',bottom:6,}}>
     <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>{results.name} is your delivery valet today.                     </Text>
     <TouchableOpacity onPress={triggerCall} style={{fontFamily:'FontAwesome5_Solid',color:'black',borderWidth:0.3,textAlign:'center',padding:9,flexDirection:'row'}}>
     <Text style={{fontFamily:'FontAwesome5_Solid',color:'black',right:4}}>Call Now</Text>
     <SimpleLineIcons name='call-out' size={14} color="black" />
     </TouchableOpacity>
     
   </View>
   <View style={{width:'100%',height:46,borderWidth:0.3,borderColor:'grey', alignItems:'center',flexDirection:'row',flex:1,justifyContent:'center',bottom:5}}>
     <Text style={{fontFamily:'FontAwesome5_Solid'}}>Delivery Pin : </Text>
     <Text style={{fontFamily:'FontAwesome5_Solid',color:'orange'}}>{result.delivery_pin}</Text>
   </View>
          <View style={{width:'94%',height:80,left:10,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
        <View style={{width:'60%',height:300,left:10}}>
            <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Vroom Vroom !!</Text>
            <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Order has been placed up and is on its way</Text>
        </View>
        <View style={{width:70,height:70,}}></View>
        <Image  style={{width:70,height:70,transform: [{ scaleX: -1 }]}}  
     source={{uri:'https://demo.foodduke.com/assets/img/order-onway.gif'}} />
    </View>
        <View style={{width:'94%',height:80,top:10,left:10,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
        <View style={{width:'60%',height:300,left:10}}>
            <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>{orderstatus}</Text>
            <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>On the way to pick up your order</Text>
        </View>
        <View style={{width:70,height:70,}}></View>
        <Image  style={{width:70,height:70,}} 
     source={{uri:'https://meatapp.smartstorez.com/assets/img/order-onway.gif' }} />
    </View>
     <View style={{width:'94%',height:80,left:10,top:20,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
     <View style={{width:'60%',height:300,left:10}}>
         <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Chef at work!!</Text>
         <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Restaurant is preparing your order</Text>
     </View>
     <View style={{width:70,height:70,}}></View>
     <Image  style={{width:70,height:70,}} 
  source={{uri:'https://demo.foodduke.com/assets/img/order-preparing.gif' }} />
 </View>
 <View style={{width:'94%',height:100,left:10,top:24,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3,bottom:30}}>
          <View style={{width:'60%',height:300,left:10}}>
              <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Order Placed Successfully</Text>
              <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Waiting for the restaurant to confirm your order</Text>
          </View>
          <View style={{width:70,height:70,}}></View>
          <Image  style={{width:70,height:70,}} 
    source={{uri:'https://demo.foodduke.com/assets/img/order-placed.gif' }} />
      </View>
 </View>  
 
 </View>

     ):(<Text style={{height:0}}></Text>)}
     {orderstatus == 'Preparing Order' ? (
       <View>
        <View style={{width:'94%',height:80,left:10,top:10,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
        <View style={{width:'60%',height:300,left:10}}>
            <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Chef at work!!</Text>
            <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Restaurant is preparing your order</Text>
        </View>
        <View style={{width:70,height:70,}}></View>
        <Image  style={{width:70,height:70,}} 
     source={{uri:'https://demo.foodduke.com/assets/img/order-preparing.gif' }} />
    </View>
     <View style={{width:'94%',height:80,left:10,top:26,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
     <View style={{width:'60%',left:10}}>
         <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Order Placed Successfully</Text>
         <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Waiting for the restaurant to confirm your order</Text>
     </View>
     <View style={{width:70,height:70,}}></View>
     <Image  style={{width:70,height:70,}} 
source={{uri:'https://demo.foodduke.com/assets/img/order-placed.gif' }} />
 </View></View>
      ):(<Text style={{height:0}}></Text>)
      }
    {orderstatus == 'Delivery Guy Assigned' ? (
      <View>
         <View style={{width:'94%',height:80,left:10,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
         <View style={{width:'60%',height:300,left:10}}>
             <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>{orderstatus}</Text>
             <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>On the way to pick up your order</Text>
         </View>
         <View style={{width:70,height:70,}}></View>
         <Image  style={{width:70,height:70,}} 
      source={{uri:'https://demo.foodduke.com/assets/img/order-onway.gif' }} />
     </View>
      <View style={{width:'94%',height:80,left:10,top:20,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
      <View style={{width:'60%',height:300,left:10}}>
          <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Chef at work!!</Text>
          <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Restaurant is preparing your order</Text>
      </View>
      <View style={{width:70,height:70,}}></View>
      <Image  style={{width:70,height:70,}} 
   source={{uri:'https://demo.foodduke.com/assets/img/order-preparing.gif' }} />
  </View>
  <View style={{width:'94%',height:80,left:10,top:32,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
          <View style={{width:'60%',left:10}}>
              <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Order Placed Successfully</Text>
              <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Waiting for the restaurant to confirm your order</Text>
          </View>
          <View style={{width:70,height:70,}}></View>
          <Image  style={{width:70,height:70,}} 
    source={{uri:'https://demo.foodduke.com/assets/img/order-placed.gif' }} />
      </View>
  </View>
      ):(<Text style={{height:0}}></Text>)}
     
  {orderstatus == 'Order Placed' ? (
      
      <View style={{width:'94%',height:80,left:10,top:3,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
          <View style={{width:'60%',left:10}}>
              <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>Order Placed Successfully</Text>
              <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Waiting for the restaurant to confirm your order</Text>
          </View>
          <View style={{width:70,height:70,}}></View>
          <Image  style={{width:70,height:70,}} 
    source={{uri:'https://demo.foodduke.com/assets/img/order-placed.gif' }} />
      </View>
  ):(<Text></Text>)}
    </View>
    
    </ScrollView>
  
  </View>
 
  {/* fill space at the bottom*/}
  <View style={{ justifyContent: 'flex-end',height:0 }}/>
        <View style={styles.bottomView}>
        <TouchableOpacity  
        onPress={() =>{Delivery(),handleLikeAnimation()}}>
          <View style={{flexDirection:'row',width:220,top:4}}>
          <Text style={styles.textStyle}>Refresh order Status</Text> 
       <LottieView style={{width:25,height:25,left:5,bottom:1}} progress={progress}  source={require('../../assets/orderrefresh.json')}/>
          </View>
       
        </TouchableOpacity>
      </View>
 
</View>
        )
);
}

const styles = StyleSheet.create({
containerMain: {
flex: 1,
backgroundColor:'white',
},
container: {
backgroundColor:'white'
},
bottomView: {
width: '100%',
height: 50,
// top:40,
backgroundColor: '#9ccc67',
justifyContent: 'center',
alignItems: 'center',
justifyContent:'center',
// bottom:0,
flexDirection:'row'
},
textStyle: {
color: '#fff',
fontSize: 18,
fontFamily:'FontAwesome5_Solid'
},
maps: {
width: Dimensions.get('screen').width,
height: 300,
},
bottomview:{
  width: '100%',
  height: 50,
  backgroundColor: '#9ccc67',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
}
});