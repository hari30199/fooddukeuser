import React, { useEffect, useState,useContext } from 'react';
import { FlatList, Text,VirtualizedList, RefreshControl,View,StyleSheet,Image,ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/Entypo';
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import BASEURL from '../../config'

const delivery = () => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [myloc,setmyloc] = useState("");
  const [myloct,setmyloct] = useState("");
  const navigation = useNavigation();
  const {userInfo,userinfo,isLoading} = useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();  


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData(true);
   
  }, []);


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
  isFocused ? (_retrieveData()):(_retrieveData())
  }, [myloc,isFocused])
 
 
const retrieveData = async () => {
 try {
   const value = await AsyncStorage.getItem('myloct')
   if(value !== null) {

   }
   setmyloct(value)
   
 } catch(e) {
 console.log('error',e)
 }
}
useEffect(() => {
  isFocused ? (retrieveData()):(retrieveData())
   }, [myloct,isFocused])
 var run = 0
  var i = 0
  var lat = userinfo[i] == null ? (myloct ):((userinfo[0].latitude))
  var long =userinfo[i] == null  ? (myloc):((userinfo[0].longitude))
  console.log(lat , long)
  const oflinedata = () =>{
    if (run == 1  && myloct != '' && myloc != '' ){
      
    // console.log('run1',run)
    fetch(`${BASEURL}/public/api/get-delivery-restaurants?latitude=${myloct}&longitude=${myloc}` ,
    {
      method: 'POST', 
           
            headers: {
              'Content-Type': 
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
    
      // .then((response) => response.json())
      // .then((json) => setData(json))
      // .then((data) => JSON.stringify(data))
      // .catch((error) => console.error(error))
      // .finally(() => setLoading(false));
      // console.log(data)
      .then((response) =>(response.json()))
      .then((result) => {
        console.log('name',result)
        // console.log('loaction',myloc,myloct)

         setData(result);
        if ( result.length == 0 ){
        //   run = 1
        //   console.log('loaction',myloc,myloct)
        // oflinedata()
        
        }

         run=0
        
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }
    else{
      retrieveData()
      _retrieveData()
      run = 1

      // console.log('loaction',myloc,myloct)
   // oflinedata()
    }
      
  }

  const fetchData =  () => {
    if ( lat != '' && long != '' ){
      fetch(`${BASEURL}/public/api/get-delivery-restaurants?latitude=${lat}&longitude=${long}` ,
    {
      method: 'POST', 
           
            headers: {
              'Content-Type': 
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
    
          .then((response) =>(response.json()))
          .then((result) => {
            // console.log('name',result[0].is_active)
            setData(result);
            
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        }
        else {
         lat = userinfo[i] == null ? (myloct ):((userinfo[0].latitude))
         long =userinfo[i] == null  ? (myloc):((userinfo[0].longitude))
         console.log('fetchdata',lat,long)
        // fetchData()
        }
  }
  {userInfo.id ? (
    useEffect(()=>{
    isFocused ? (fetchData()):(fetchData())

    return () => {
      setData({}); 
    };
    },[isFocused,lat,long])
  ):(
    useEffect(()=>{
      if (run == 0){
        run = 1
    
    isFocused ? (oflinedata()):(oflinedata())
    // console.log('hotel',myloct,myloc)
  }
  return () => {
    setData({}); 
  };
    },[isFocused,myloct,myloc])
    
  )}
  // Number of Hotels //
  var count = Object.keys(data). length;
  
  // console.log(data.name)

  return (
    
    <View style={styles.categories}>
      <Spinner visible={isLoading} />
      {Loading ? 
      <View style={{left:20,backgroundColor:'white'}}>
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
      ( <View style={{  flexDirection: 'column', justifyContent:  'space-between'}}>
        {Loading && count == 0? <Text style={{bottom:40,fontSize:14,width:'50%',fontFamily:'FontAwesome5_Solid'}} >          NO SHOPS NEAR YOU</Text>: (
        <Text  style={{bottom:40,fontSize:12,width:'50%',fontFamily:'FontAwesome5_Solid'}}>         {count} SHOPS NEAR YOU</Text>)}
        
          <FlatList
            data={data}
            
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            keyExtractor={({ item}, index) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Hoteldetails', {
                                    id:item.id,
                                    name:item.name,
                                    slug:item.slug
                                })
                            }
              >
              <View style={styles.fhotel1} >

{/* -------------------Delivery hotels--------------------- */}

<View style={styles.fhotelimg} >
<Image
style={{ width: 100, height: 100, resizeMode: 'contain', justifyContent:"center",borderRadius:2}}
source={{
  uri: `${BASEURL}/${item.image}`
}}
>

</Image>
</View>
<View style={styles.fhoteltitle} >
  
  {/* <Text style={styles.htitle} >{item.name}
  {item.id == 7 ? (
    <View style={{flexDirection:'row',bottom:10,left:10}}>
    <View style={{left:14,zIndex:2,bottom:16}}>
    <Icon name='arrow-right'color={'white'} size={34}></Icon>
    </View>
     
   <Text style={{backgroundColor:'orange',height:23, color:'white',fontSize:14, width:100,textAlign:'right',bottom:10}}>
    Featured    </Text>
  </View>
  // <Text >Featured</Text>
  ):(<Text></Text>)}
  </Text>  */}
   <View style={{flexDirection:'row',width:'92%',height:40,justifyContent:'center',alignItems:'center'}}>
     <View style={{width:item.is_featured == 1 ?'60%':'100%'}}>
     <Text style={{fontWeight:"bold",
              fontSize:16,
              color:"black" ,
              fontFamily:'FontAwesome' ,left:7}}>{item.name}</Text>
     </View>
     {item.is_featured == 1 ? (
     <View style={{flexDirection:'row',width:'38%',alignItems:'flex-end'}}>
    <View style={{left:12,zIndex:2,bottom:5}}>
    <Icon name='arrow-right'color={'white'} size={34}></Icon>
    </View>
     
   <Text style={{fontWeight:'bold', backgroundColor:'orange',height:23, color:'white',fontSize:14,textAlign:'right',bottom:10,right:3}}>    Featured  </Text>
  </View>):(<Text></Text>)}
   </View>

  
  <Text style={styles.hdes} numberOfLines={1}  >{item.description}</Text>
  {item.is_active == 0?(<Text style={{height:16,fontSize:12,bottom:8,left:10,color:'red'}}><AntDesign name='exclamationcircle' size={12} color='red'/>  Not Accepting Orders</Text>):(<Text style={{height:0}}></Text>) }
  

 
  <View style={styles.hdetails}  >
        <Icon size={15} style={{left:34,bottom:2}}
                    name ='star' color={'orange'} />
      <View style={styles.hrate} >
       <Text style={styles.rating}>{item.rating}</Text></View>
      <View style={styles.hrate} >
      {/* <Image
       style={{ width: 8, height: 10,justifyContent:"center",bottom:3,}}
       source={require('../../assets/catergories/lo.png')}></Image> */}
       <EvilIcons style={{bottom:3,left:3}} color='#565656' name='location' size={15}></EvilIcons>
       <Text adjustsFontSizeToFit={true}
       numberOfLines={1} minLength={2}
       style={styles.hdist}> {Math.round((item.distance + Number.EPSILON) * 100) / 100}</Text>
       <Text style={{left:1,bottom:4}}>km</Text>
       </View>
      <View style={styles.hprice} >
      <AntDesign style={{right:22}} name='wallet' size={14}></AntDesign>
      <Image
       style={{ width:10, height: 10,justifyContent:"center",right:20}}
       source={require('../../assets/rupee.png')}></Image>
        
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
              height:200, 
              // justifyContent:'space-evenly'
          },
          htitle:{
              marginTop:14,
              marginLeft:10,
              fontWeight:"bold",
              fontSize:16,
              color:"black" ,
              fontFamily:'FontAwesome' ,
              
          },
          hdes:{
              marginLeft:10,
              color:"grey",
              fontSize:12,
              marginTop:6,
              width:'80%' ,
              // paddingBottom:8,
              height:26 ,
              fontFamily:'FontAwesome' ,
              
          },
          hdetails:{
              width:"95%",
              height:40,
              // marginTop:8,
              marginLeft:10,
              flexDirection:"row",
              alignItems:'center',
              justifyContent:"center",
              // flexWrap:1
              fontFamily:'FontAwesome' ,
              borderTopColor: '#57575730',
              borderTopWidth: 0.3,
          },
          hrate:{
              width:"28%",
              height:26,
              borderRightColor: '#57575730',
              borderRightWidth: 0.3,
              alignItems:"center",
              paddingTop:6,
              flexDirection:"row",
              fontSize:12,
              color:"#7F7F7F",
              justifyContent:"center",
              fontWeight:500
          },
          hdist:{
              width:"43%",
              height:18,
              alignItems:"center",
              flexDirection:"row",
              fontSize:12,
              color:"#7F7F7F",
              alignItems:"center",
              justifyContent:"center",
              flexWrap:'wrap',
              fontFamily:'FontAwesome',
              fontWeight:'500'
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
              fontSize:12,
              fontFamily:'FontAwesome'
          }
      
      });

export default delivery;
