import React from "react";
import {  TouchableOpacity, View, StyleSheet,Image} from "react-native";
import Swiper from "react-native-web-swiper";
import BASEURL from '../../config'
export default function Trending() {
   
        return (
        <View style={styles.categorie} >
                  <Swiper
                    from={1}
                    minDistanceForAction={0}
                    controlsProps={{
                      dotsTouchable: true,
                      prevPos: 'left',
                      nextPos: 'right',
                      nextTitle: '',
                      autoplayDirection:'true',
                      autoplay:'true',
                      autoplayTimeout:'2',
                      nextTitleStyle: {  fontSize: 24, fontWeight: '500' },
                      PrevComponent: ({ onPress }) => (
                        <TouchableOpacity onPress={onPress}>
                        </TouchableOpacity>
                      ),
                    }}
                  ><View style={{flex:1,alignItems:"center",}}>
                      {/* <Image 
                      style={{ width: "100%", height: 210,}}
                      source={require('../../assets/offerr.png')}></Image> */}
                      </View>
                      <View style={{flex:1,alignItems:"center",}}>
                      <Image 
                      style={{ width: "100%", height: 210,}}
                      source={{
                        uri: `https://demo.foodduke.com/assets/img/slider/1636619684haVw9pQkUz.webp`
                      }}></Image>
                      </View>
                      <View style={{flex:1,alignItems:"center",}}>
                      <Image 
                      style={{ width: "100%", height: 210,}}
                      source={{
                        uri: `https://demo.foodduke.com/assets/img/slider/1635565310h6UvJgZX01.webp`
                      }}></Image>
                      </View>
                      
                  </Swiper>
               </View>
   
      
        );
    }
    const styles = StyleSheet.create({
        categorie:{
            width:"100%",
            height:250,
            top:26
        }
    });
