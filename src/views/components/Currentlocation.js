import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';

export default function Currentlocation () {
    const navigation = useNavigation();
    const [position,setposition] =useState([''])
    const [latitude,setlatitude] =useState([''])
    const [longitude,setlongitude] =useState([''])
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
            //   console.log(`${position.coords.latitude}${position.coords.longitude}`);
            const latitude = JSON.stringify(position.coords.latitude);
             setlatitude([latitude]);
             const longitude = JSON.stringify(position.coords.longitude);
             setlongitude([longitude]);
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        return () => {
            setposition(position)
        }
    }, [])
    return(
        <View>
            <TouchableOpacity onPress={() =>
                              navigation.navigate('Detail', {
                                    lat:[latitude],
                                    lng:[longitude]
                                })
                            }>
            <Text style={styles.currentlocation}><Icon name="location-pin"  size={14} /> use Current location</Text>
            </TouchableOpacity>

        </View>
       


    );
}

const styles = StyleSheet.create({
    currentlocation:{
        left:30,
        color:'orange',
        bottom:260,
        fontSize:16,
        
    }
})