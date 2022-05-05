import React, { useEffect, useState } from 'react';
import { FlatList, Text, View,StyleSheet,Image,ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// import Geolocation from 'react-native-geolocation-service';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const delivery = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mylocation,setmylocation] = useState("")
  const navigation = useNavigation();
 
  useEffect(() => {
   
    fetch(`https://demo.foodduke.com/public/api/popular-geo-locations`,{
      method: 'POST', 
           
            headers: {
              'Content-Type': 'application/json'
            },
          })
          
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      console.log('places',data)
     
  }, []);
  const count = Object.keys(data). length;
  return (
    <View style={styles.categories}>  
       {isLoading ? 
       <SkeletonPlaceholder>
       <View style={{flexDirection:'row'}}>
       <View style={{margin:10}}>
         <View style={{ top:10 }}>
         </View>
          <View
             style={{ marginTop: 6, width: 100, height: 40, borderRadius: 30 }}
           />
       </View>
       <View style={{margin:10}}>
         <View style={{ top:10 }}>
         </View>
          <View
             style={{ marginTop: 6, width: 100, height: 40, borderRadius: 30 }}
           />
       </View>
       <View style={{margin:10}}>
         <View style={{ top:10 }}>
         </View>
          <View
             style={{ marginTop: 6, width: 100, height: 40, borderRadius: 30 }}
           />
       </View>
       
       </View>
     </SkeletonPlaceholder>
       : 
      
      ( <View >
        <Text style={{left:30,fontWeight:'bold',color:'#ababab',bottom:16,height:30}} >POPULAR PLACES</Text>
        {count == 0 ?(
              <Text style={{textAlign:'center'}}>Currently No places Avaliable </Text>
        ):(
          <View style={{height:200}}>
          <FlatList 
              horizontal={true}
              data={data}
              // ItemSeparatorComponent={FlatListItemSeparator}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <TouchableOpacity style={{width:'100%',height:70}}
                              onPress={() =>
                                navigation.navigate('Detail', {
                                      lat:(item.latitude) ,
                                      lng: (item.longitude)
                                  })
                              }
                >
                    
                <View style={{flexDirection:'row',color:'red',}}>
                   
                    <Text style={styles.text}>{item.name} </Text>
                </View>
                
                </TouchableOpacity>
              )}
            />
            </View>
        )

        }
  
      
          
        </View>
      )}
         {/* <Text style={{top:80,left:40,fontWeight:'bold',color:'#ababab',borderBottomColor:'black',borderBottomWidth:1,width:'22%'}}>Saved places</Text>
         <Text style={{fontSize:14,top:100,left:40,width:'80%'}} numberOfLines={4}>{mylocation}</Text>  */}
    </View>
  );
};
const styles = StyleSheet.create({
          categories:{
              width:'100%',
              height:200,
              bottom:150
          },
          text:{
            // marginRight:10,
            borderRadius:28,
            borderWidth:0.5,
            backgroundColor:'#d4d4d4',
            borderColor:'#f2f4f9',
            fontSize:16,
            fontWeight:'bold',
            height:'auto',
             marginLeft:24,
              padding:10
          }
      
      });

export default delivery;