import React, { useEffect, useState,useContext } from 'react';
import {  TouchableOpacity, View, StyleSheet,Image,Text} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {FlatListSlider} from 'react-native-flatlist-slider';
import BASEURL from '../../config'
import SwiperFlatList from 'react-native-swiper-flatlist';
export default function Trending() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    
  fetch(`${BASEURL}/public/api/promo-slider`,{
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
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    

    return () => {
      setData({}); 
    };
}, []);

        return (
          isLoading ? <View>
            <SkeletonPlaceholder>
              <View style={{width:'100%',height:200}}></View>
            </SkeletonPlaceholder>
          </View>:
        <View style={styles.categorie} >
                       <SwiperFlatList
                       autoplay
                       autoplayDelay={5}
                       index={0}
                       autoplayLoop
                       data={data}
                       renderItem={({ item }) => 
                       <Image resizeMode="cover" style={{ width:400,height:300}} 
                       source={{uri :`${BASEURL}/${item.data.image}`}} />}
                       showPagination
                       
                      
                         />
                         
               </View>
                   
      
        );
    }
    const styles = StyleSheet.create({
        categorie:{
            // width:"100%",
           
        }
    });