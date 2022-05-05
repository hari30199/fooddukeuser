 import React, { useState } from 'react';
 import {StyleSheet, View,TextInput,Image, TouchableOpacity} from 'react-native';
 import Searchdrop from '../components/Searchdrop';
//  import {BlurView} from '@react-native-community/blur';
 export default function Search() {
   const [dataSource] = useState(['apple', 'biryani', 'chicken', 'fish', 'mutton','crab','shawarma','grill'])
  
   const [filtered, setFiltered] = useState(dataSource)
   const [searching, setSearching] = useState(false)
   const onSearch = (text) => {
     if (text) {
       setSearching(true)
       const temp = text.toLowerCase()
 
       const tempList = dataSource.filter(item => {
         if (item.match(temp))
           return item
       })
       setFiltered(tempList)
     }
     else {
       setSearching(false)
       setFiltered(dataSource)
     }
 
   }
   
   return (
     <View style={styles.container}>
          {/* <Image 
      style={styles.imagestyle}
      source={require('../../assets/Icon-location4.png')}
    /> */}
            
       <TextInput
         style={styles.inputContainer}
         placeholder="Search for shops or items.."
         placeholderTextColor='#c4c4c4'
         onChangeText={onSearch}
         editable={false}
       />
    
       <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
   
         <View style={{
           flexDirection: 'row',
           justifyContent: 'center',
         }}>
           {
             dataSource.map((item, index) => {
               return (
                 <View style={{
                   justifyContent: 'center',
                   alignItems: 'center',
                   height: 80, width: 80, 
                 }}>
                 </View>
               )
             })
           }
         </View>
 
       </View>
 
       
       {
         searching &&
         <Searchdrop 
          //  onPress={() => setSearching(false)}
           dataSource={filtered} />
       }
     </View>
   )
 }
 
 
 const styles = StyleSheet.create({
   container: {
     justifyContent: 'center',
     alignItems: 'center',
     flex: 1,
    bottom:34
   },
   inputContainer: {
    height: 48,
    width:'94%',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor:'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    position:'absolute',
    top:48
  },
  imagestyle: {
    height: 20,
    width: 20,
   left:310,
   top:60,
   zIndex:6,
  //  elevation:8,
   position:'absolute'
  },
 });
 