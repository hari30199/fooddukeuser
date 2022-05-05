    import React, { useEffect, useState,useContext } from 'react';
    import {  TouchableOpacity, View, StyleSheet,Image,Text} from "react-native";
    import Swiper,{Autoplay} from "react-native-web-swiper";
    import SkeletonPlaceholder from "react-native-skeleton-placeholder";
    export default function Trending() {
      const [isLoading, setLoading] = useState(true);
      const [data, setData] = useState([]);
    
      useEffect(() => {
        
      fetch(`https://demo.foodduke.com/public/api/promo-slider`,{
        method: 'POST', 
             
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify()
      })
      
        .then((response) =>(response.json()))
        .then((result) => {
          // console.log(result.mainSlides[0].data)
          var i=0
          for ( i=0; i<result.mainSlides.length; i++)
          setData(result.mainSlides[i].data);
          
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
         console.log(data.image)
        // console.log( fetch(`http://meatapp.smartstorez.com/public/api/promo-slider?latitude=13.0623&longitude=77.5871 `))
    }, []);
            return (
              isLoading ? <View>
                <SkeletonPlaceholder>
                  <View style={{width:'100%',height:200}}></View>
                </SkeletonPlaceholder>
              </View>:
            <View style={styles.categorie} >
                      <Swiper
                         
                        minDistanceForAction={0}
                        controlsProps={{
                          dotsTouchable: true,
                          prevPos: 'left',
                          nextPos: 'right',
                          nextTitle: '',
                          Autoplay:{
                            delay:100
                          },
                          // autoplayDirection:forHorizontalIOS,
                          // Autoplay:true,
                          // AutoplayTimeout:'0',
                            
                          nextTitleStyle: {  fontSize: 24, fontWeight: '500' },
                          PrevComponent: ({ onPress }) => (
                            <TouchableOpacity onPress={onPress}>
                            </TouchableOpacity>
                          ),
                        }}
                      >
                          <View style={{flex:1,alignItems:"center",}}>
                          <Image 
                          style={{ width: "100%", height: 210,}}
                          source={{
                            uri: `https://demo.foodduke.com/${data.image}`
                          }}></Image>
                          </View>
                          {/* <View style={{flex:1,alignItems:"center",}}>
                          <Image 
                          style={{ width: "100%", height: 210,}}
                          source={{
                            uri: `https://meatapp.smartstorez.com/assets/img/slider/1635565310h6UvJgZX01.webp`
                          }}></Image>
                          </View>
                          <View style={{flex:1,alignItems:"center",}}>
                          <Image 
                          style={{ width: "100%", height: 210,}}
                          source={{
                            uri: `https://meatapp.smartstorez.com/assets/img/slider/1635565310h6UvJgZX01.webp`
                          }}></Image>
                          </View> */}
                      </Swiper>
                   </View>
       
          
            );
        }
        const styles = StyleSheet.create({
            categorie:{
                width:"100%",
                height:200,
            }
        });