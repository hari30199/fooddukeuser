import React, { useEffect, useState,useContext } from 'react';
import { FlatList, Text, RefreshControl,View,StyleSheet,Image,ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../../../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import { ConstantClass } from './cartfind';
import BASEURL from '../../../config'
const FiltersScreen = (props) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Data, setdata] = useState([]);
  const [myloc,setmyloc] = useState("");
  const [myloct,setmyloct] = useState("");
  const navigation = useNavigation();
  const {userInfo,userinfo,isLoading} = useContext(AuthContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    _retrieveData()
   }, [myloc])
  
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
 }, [myloct])
 
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
  const lat = userinfo[i] == null ? (myloct ):((userinfo[0].latitude))
  const long =userinfo[i] == null  ? (myloc):((userinfo[0].longitude))
  
  ConstantClass.Email = lat
  ConstantClass.Password = long
    const token = userInfo.auth_token
    const favhotels = () => {
      fetch(`${BASEURL}/public/api/get-favorite-stores`,
      {
        method: 'POST', 
             
        headers:{
          'Content-Type':'application/json'
          },
              body: JSON.stringify({
                "token":token,
                "latitude": ConstantClass.Email,
                "longitude": ConstantClass.Password
              })
            })
      
        .then((response) => response.json())
        .then((data) => setData(data))
        .then((data) => JSON.stringify(data))
        .catch((error)=>{
          console.log("Api call error");
          alert(error.message);
       })
        .finally(() => setLoading(false));
         console.log(data)
    
    }
    useEffect(()=>{
      favhotels()
    },[])
    
    useEffect(() => {
      isFocused ? (favhotels()):(favhotels())
      }, [isFocused])

   
    var count = Object.entries(data).length;

    //  console.log(count)
  return (
    
    <View style={styles.categories}>
      <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:34,top:25}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:25,
        color:'black'
      }}>Favourites</Text>
      </View>
      <Spinner visible={isLoading} />
      {Loading ? 
      <View style={{left:20,backgroundColor:'white',top:30}}>
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
    </View> : 
      
      ( 
        count == 0 ? <Text style={{textAlign:'center',top:100,fontFamily:'FontAwesome5_Solid'}}>No Hotels Found</Text> :
      <View style={{  flexDirection: 'column',top:26, justifyContent:  'space-between'}}>

        
          <FlatList
            data={data}
            keyExtractor={({ item}, index) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Hoteldetails', {
                                    id:item.id,                
                                    slug:item.slug,
                                    name:item.name
                                })
                            }
              >
              <View style={styles.fhotel1} >

{/* -------------------Delivery hotels--------------------- */}

<View style={styles.fhotelimg} >
<ImageBackground 
style={{ width: '94%', height: 66,justifyContent:"center",borderRadius:20}}
source={{
  uri: `${BASEURL}/${item.image}`
}}
>

</ImageBackground>
</View>
<View style={styles.fhoteltitle} >

  <Text style={styles.htitle} >{item.name}</Text>

  <Text style={styles.hdes}  >{item.description}</Text>
  <View style={styles.hdetails}  >
  <Icon size={15}
  name ='star' color={'orange'} style={{left:35,}} />
      <View style={styles.hrate} >
       <Text style={styles.rating}>{item.rating}</Text></View>
      <View style={styles.hrate} >
      {/* <Image
       style={{ width: 8, height: 10,justifyContent:"center",bottom:3,}}
       source={require('../../../assets/catergories/lo.png')}></Image> */}
       <EvilIcons style={{bottom:3,left:3}} color='#565656' name='location' size={15}></EvilIcons>
       <Text adjustsFontSizeToFit={true}
       numberOfLines={1} 
       style={styles.hdist}> {item.distance}</Text>
       <Text  style={{left:4,bottom:3}}>km</Text>
       </View>
      <View style={styles.hprice} >
      {/* <Image
      style={{ width:10, height: 10,right:20}}
      source={require('../../../assets/Path.png')}></Image> */}
      <AntDesign style={{right:20}} name='wallet' size={13}></AntDesign>
      <Image
      style={{ width:9, height: 9,right:18,top:1}}
      source={require('../../../assets/rupee.png')}></Image>
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
              width:'110%',
              height:'auto',
              right:20
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
              width:"34.5%",
              height:18,
              alignItems:"center",
              flexDirection:"row",
              fontSize:12,
              color:"#7F7F7F",
              alignItems:"center",
              justifyContent:"center",
              flexWrap:'wrap',
              bottom:2,
              // right:
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
          },
          filtermain:{
            backgroundColor:'orange',
            padding:10,
            borderRadius:20,
            color:'white',
            fontWeight:'bold',
            fontSize:16,
          },
          filtername:{
            padding:10,
            borderRadius:20,
            color:'white',
            fontWeight:'bold',
            fontSize:16,
            
          }
      
      });

export default FiltersScreen;
