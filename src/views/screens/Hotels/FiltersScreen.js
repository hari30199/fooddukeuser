import React, { useEffect, useState,useContext } from 'react';
import { FlatList, Text, RefreshControl,View,StyleSheet,Image,ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../../../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import  EvilIcons  from 'react-native-vector-icons/EvilIcons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import BASEURL from '../../../config'

const FiltersScreen = (props) => {
  const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Data, setdata] = useState([]);
  const [myloc,setmyloc] = useState("");
  const [myloct,setmyloct] = useState("");
  const { itemsid} = props.route.params;
  const navigation = useNavigation();
  const {userInfo,userinfo,isLoading} = useContext(AuthContext);
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
  // console.log(lat , long)

  
  const arr =[]
  var filterlenght = itemsid.length
 
  const oflinedata = (id) =>{

     if(id != undefined ){
       var ins = itemsid.indexOf(id)
       if(ins != -1){
         itemsid.splice(ins,1)
       }
       else
      itemsid.push(id)
     }
    
 

    fetch(`${BASEURL}/public/api/get-delivery-restaurants?latitude=${myloct}&longitude=${myloc}&category_ids=${itemsid}` ,
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
  
  const fetchData =  (id) => {
    if(id != undefined ){
      var ins = itemsid.indexOf(id)
      if(ins != -1){
        itemsid.splice(ins,1)
      }
      else
     itemsid.push(id)
    }
   
    
      fetch(`${BASEURL}/public/api/get-delivery-restaurants?latitude=${lat}&longitude=${long}&category_ids=${arr}` ,
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
  

   const Filterbuttons = () =>{
  
    fetch(`${BASEURL}/public/api/get-menu-categories`,{
      method:'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify()
    })
    
    .then((response) => response.json())
    .then((json) => setdata(json))
    .then((Data) => JSON.stringify(Data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

  }

useEffect(()=>{
  Filterbuttons();
},[])

  const itemlistexist = (id) =>{
    const found = Data.find(el => el.item_id === id); 
    if (!found)  
    return true
    else 
    return false
    
     }
     var count = Object.keys(data). length;
    //  console.log(count)
  return (
    
    <View style={styles.categories}>
      <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:40,top:25}} />
     
      </View>
      
      <View style={{flexDirection:'row',left:30,top:20}}>
      {/* <View style={{zIndex:10}}>
          {filterlenght != 0 ?(
            <Text style={styles.filtermain} >Filters  ({filterlenght})</Text>
          ):(
            <Text style={styles.filtermain} >Filters  </Text>
          )}
        
        </View> */}
      <ScrollView   style={{flexDirection:'row'}}
      horizontal={true}
       showsHorizontalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10,width:750,flexDirection:'row'}} >
      
          {filterlenght != 0 ?(
            <Text style={styles.filtermain} >Filters  ({filterlenght})</Text>
          ):(
            <Text style={styles.filtermain} >Filters  </Text>
          )}
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Data}
            keyExtractor={( item , index) => item.id}
            renderItem={({ item }) =>(
              <View >
             {itemlistexist?(
              <TouchableOpacity 
              onPress={()=>oflinedata(item.id)}
              style={{
               backgroundColor: (itemsid != undefined && itemsid.indexOf(item.id) != -1) ? '#60b246' : 'white',
               borderColor: (itemsid != undefined && itemsid.indexOf(item.id) != -1) ? 'white' : '#cfcfcf',
               borderWidth:1,
               borderRadius:20,
               marginLeft:6,
               marginRight:12
              }}
              >
               <Text style={[styles.filtername,{zIndex:-10,color:(itemsid != undefined && itemsid.indexOf(item.id) != -1) ? 'white' : 'orange',}]} >    {item.name}    </Text>
            
              
               </TouchableOpacity>
             ):(
             <Text>Currently Not Avaliable</Text>
             )  }
             </View>  
      )}
          />
        </View>
        </ScrollView>
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
       style={styles.hdist}> {Math.round((item.distance + Number.EPSILON) * 100) / 100}</Text>
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
              width:"43%",
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
