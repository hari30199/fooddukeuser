import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

import Curtaincarousel from '../components/Curtaincarousel';

export default function Curtains(){
    return(
       <View style={styles.categories} >
          <View style={styles.categoriesname} >  
          </View>
          <Curtaincarousel/>
       </View>
    );
}
const styles = StyleSheet.create({
    categories:{
        width:'100%',
        height:150,
        
    },
    categoriesname:{
        width:'100%',
        height:40,
        
    },
    catname:{
        fontSize:18,
        marginTop:5,
        marginLeft:15,
        fontWeight:'bold',
        color:'black'
    }

});