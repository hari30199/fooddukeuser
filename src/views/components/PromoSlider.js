import React, { useEffect, useState } from 'react';
import { FlatList, Text, View,StyleSheet,Image,ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Geolocation, { getCurrentPosition } from 'react-native-geolocation-service';
import Swiper from "react-native-web-swiper";
// import position from '../../views/screens/Detail';
const PromoSlider = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [position,setposition] = useState();
  const [userLocation,setuserLocation] = useState();
  const [region,setregion] = useState();
  const navigation = useNavigation();
 
  
  useEffect(() =>{
   
        Geolocation.getCurrentPosition(
            (position) => {
              // console.log(position);
              setposition(position.coords)
            },
            (error) => {
              
              // console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
      
  },[])

  useEffect(() => {
      // const url =`http://meatapp.smartstorez.com/public/api/promo-slider?latitude=13.0623&longitude=77.5871 `
    fetch(`http://demo.foodduke.com/public/api/promo-slider?latitude=13.0623&longitude=77.5871 `,{
      method: 'POST', 
           
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify()
    })
    
      .then((response) =>(response.json()))
      .then((result) => {
        setData(result.mainSlides);
        
      })
      .then((json) => json.stringifiy(setData(json)))
      .then((response) =>(response.json()))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      console.log( fetch(`http://meatapp.smartstorez.com/public/api/promo-slider?latitude=13.0623&longitude=77.5871 `))
  }, [position]);
  
  return (

    <View style={styles.categories}>
      {isLoading ? <Text style={{color:'orange',top:20}}>Working on it...</Text> : 
      
      ( <View style={{  flexDirection: 'column', justifyContent:  'space-between'}}>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('ViewallScreens', {
                                    name: item.name,
                                    description:item.description,
                                    id:item.id,
                                    rating:item.rating,
                                    distance:item.distance,
                                    price_range:item.price_range
                                })
                              }
              >
                 <Swiper
                    from={2}
                    minDistanceForAction={0}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '',
                      autoplayDirection:'true',
                      autoplay:'true',
                      autoplayTimeout:'2.5',
                      nextTitleStyle: {  fontSize: 24, fontWeight: '500' },
                      PrevComponent: ({ onPress }) => (
                        <TouchableOpacity onPress={onPress}>
                        </TouchableOpacity>
                      ),
                    }}
                  >
                      <View >
                      <Image 
                      style={{ width: "100%", height: 210,}}
                      source={{ uri: `http://meatapp.smartstorez.com/${item.data.image}`}}></Image>
                      </View>
                     
                      
                  </Swiper>
                  
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
              height:"auto",
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

export default PromoSlider;
