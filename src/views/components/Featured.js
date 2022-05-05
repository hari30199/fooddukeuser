import React, { useEffect, useState,useContext } from 'react';
import { FlatList, Text, View,StyleSheet,Image,ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const Featured = () => {
  const [Loading,setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [myloc,setmyloc] = useState("");
  const [myloct,setmyloct] = useState("");
  const navigation = useNavigation();
  const {userInfo,userinfo,isLoading} = useContext(AuthContext);

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

  var i = 0
  const lat = userinfo[i] == null && userinfo[i] == undefined ? (13.0623 ):((userinfo[0].latitude))
  const long =userinfo[i] == null && userinfo[i] == undefined ? (77.5871):((userinfo[0].longitude))

  const oflinedata = () =>{
    fetch(`http://demo.foodduke.com/public/api/get-selfpickup-restaurants?latitude=${myloct}&longitude=${myloc}` ,
    {
      method: 'POST', 
           
            headers: {
              'Content-Type': 
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
    
      .then((response) => response.json())
      .then((json) => setData(json))
      .then((data) => JSON.stringify(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
     
  }
  
  const fetchData =  () => {
      fetch(`http://demo.foodduke.com/public/api/get-selfpickup-restaurants?latitude=${lat}&longitude=${long}` ,
    {
      method: 'POST', 
           
            headers: {
              'Content-Type': 
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
    
      .then((response) => response.json())
      .then((json) => setData(json))
      .then((data) => JSON.stringify(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
     
  }
  {userInfo.auth_token ? (
    useEffect(()=>{
      fetchData();
    },[lat,long])
  ):(
    useEffect(()=>{
      oflinedata();
    },[myloct,myloc])
  )}
  
  // Number of Hotels //

  var count = Object.keys(data). length;


  return (
      
    <View style={styles.categories}>
       <Spinner visible={isLoading} />
      {Loading ?
       <View style={{left:20}}>
       <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", alignItems: "center",margin:10 }}>
         <View style={{ width: 60, height: 60, borderRadius: 10 }} />
         <View style={{ marginLeft: 20 }}>
           <View style={{ width: 250, height: 20, borderRadius: 4 }} />
           <View
             style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
           />
         </View>
       </View>
       <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
         <View style={{ width: 60, height: 60, borderRadius: 10 }} />
         <View style={{ marginLeft: 20 }}>
           <View style={{ width: 250, height: 20, borderRadius: 4 }} />
           <View
             style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
           />
         </View>
       </View>
       <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
         <View style={{ width: 60, height: 60, borderRadius: 10 }} />
         <View style={{ marginLeft: 20 }}>
           <View style={{ width: 250, height: 20, borderRadius: 4 }} />
           <View
             style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
           />
         </View>
       </View>
       <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
         <View style={{ width: 60, height: 60, borderRadius: 10 }} />
         <View style={{ marginLeft: 20 }}>
           <View style={{ width: 250, height: 20, borderRadius: 4 }} />
           <View
             style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
           />
         </View>
       </View>
     </SkeletonPlaceholder>
     </View> 
      : 
      
      ( <View style={{  flexDirection: 'column', justifyContent:  'space-between'}}>
        {count == 0? <Text style={{bottom:40,fontSize:12,width:'50%',fontFamily:'FontAwesome5_Solid'}} >         NO SHOPS NEAR YOU</Text>: (
        <Text  style={{bottom:40,fontSize:12,width:'50%',fontFamily:'FontAwesome5_Solid'}}>         {count}  SHOPS NEAR YOU</Text>)}
        
          <FlatList
            data={data}
            keyExtractor={({ item}, index) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Hoteldetails', {
                                    name: item.name,
                                    description:item.description,
                                    id:item.id,
                                    rating:item.rating,
                                    distance:item.distance,
                                    price_range:item.price_range,
                                    image:item.image,
                                    slug:item.slug
                                })
                            }
              >
              <View style={styles.fhotel1} >

{/* -------------------Delivery hotels--------------------- */}

<View style={styles.fhotelimg} >
<ImageBackground 
style={{ width: '100%', height: 88,justifyContent:"center",borderRadius:20}}
source={{
  uri: `http://demo.foodduke.com${item.image}`
}}
>

</ImageBackground>
</View>
<View style={styles.fhoteltitle} >

  <Text style={styles.htitle} >{item.name}</Text>

  <Text style={styles.hdes}  >{item.description}</Text>
  <View style={styles.hdetails}  >
  <Image
       style={{ width: 13, height: 12,justifyContent:"center",alignItems:"center",left:30}}
       source={require('../../assets/star.png')}></Image>
      <View style={styles.hrate} >
       <Text style={styles.rating}>{item.rating}</Text></View>
      <View style={styles.hrate} >
      <Image
       style={{ width: 8, height: 10,justifyContent:"center",bottom:3,}}
       source={require('../../assets/catergories/lo.png')}></Image>
       <Text adjustsFontSizeToFit={true}
       numberOfLines={1}
       style={styles.hdist}> {item.distance}</Text>
       <Text style={{left:4,bottom:3}}>km</Text>
       </View>
      <View style={styles.hprice} >
      <Image
       style={{ width:10, height: 10,justifyContent:"center",right:20}}
       source={require('../../assets/Path.png')}></Image>
       <Text style={{fontSize:12,color:'grey',right:16}}>{item.price_range}</Text></View>
  </View>
</View>

</View>
              </TouchableOpacity>
            )}
          />
          
         
        </View>
        
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
          categories:{
              width:'100%',
              height:'auto',
          },
          categoriesname:{
              width:'100%',
              height:40,
          },
          catname:{
              fontSize:16,
              marginTop:10,
              fontWeight:'bold',
              color:"black",
              left:20
          },
          fhotel:{
              width:"100%",
              height:"auto",
          },
          fhotel1:{
              width:"100%",
              height:120,
              backgroundColor:"white",
              borderRadius:10,
              marginTop:10,
              flexDirection:"row",
              left:20
          },
          fhotelimg:{
              width:"25%",
              height:85,
              borderRadius:10,
              marginLeft:15,
              marginTop:14,
              alignItems:"center",
              justifyContent:"center"
          },
          fhoteltitle:{
              width:"70%",
              height:120, 
              
          },
          htitle:{
              marginTop:14,
              marginLeft:10,
              fontWeight:"bold",
              fontSize:16,
              color:"black" 
          },
          hdes:{
              marginLeft:10,
              color:"grey",
              fontSize:12,
              marginTop:6,
              height:18
          },
          hdetails:{
              width:"95%",
              height:50,
              marginTop:8,
              marginLeft:10,
              borderTopColor: '#cfcfcf',
              borderTopWidth: 0.3,
              flexDirection:"row",
              alignItems:'center',
              justifyContent:"center",
              // flexWrap:1
          },
          hrate:{
              width:"28%",
              height:26,
              borderRightColor: '#cfcfcf',
              borderRightWidth: 0.3,
              alignItems:"center",
              paddingTop:6,
              flexDirection:"row",
              fontSize:12,
              color:"#7F7F7F",
              justifyContent:"center"
          },
          hdist:{
              width:"34%",
              height:18,
              alignItems:"center",
              flexDirection:"row",
              fontSize:12,
              color:"#7F7F7F",
              alignItems:"center",
              justifyContent:"center",
              flexWrap:'wrap',
              bottom:2
          },
          hprice:{
              width:"42%",
              height:26,
              alignItems:"center",
              flexDirection:"row",
              justifyContent:'center',
              color:"#7F7F7F",
          },
          rating:{
              right:10,
              bottom:3,
              left:8,
              color:'grey',
              fontSize:12
          }
      
      });

export default Featured;
