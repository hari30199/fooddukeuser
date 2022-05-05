import React, {useContext, useState} from 'react';
import {Button,Text,TextInput,TouchableOpacity,View,Image,StyleSheet,} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../../AuthContext';

export const Saveadd = ({navigation}) => {
  const [address, setaddress] = useState(null);

  const {isLoading, registeradd} = useContext(AuthContext);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={address}
          placeholder="address"
          onChangeText={text => setaddress(text)}
        />
          <TouchableOpacity onPress={() => {
            registeradd(address);
          }}>
            <Text style={styles.button}>Save Address</Text>
       </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: 20,justifyContent:'center'}}>
          <Text>Already have an accoutn? </Text>

          
        </View>
        
      </View>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  
    alignItems: 'center',
 
  },
  wrapper: {
    width: '80%',
    top:40
  },
  input: {
    width:'100%',
    backgroundColor:'#f2f4f9',
    borderRadius:6,
    marginBottom:30,
    height:56,
    paddingLeft:30
  },
  link: {
    color: 'orange',
    
  },
  button:{
    backgroundColor:'orange',
        color:'white',
        height:44,
        textAlign:'center',
        borderRadius:5,
        paddingTop:12,
        fontWeight:'bold',
        fontSize:16
  },
  head:{
    backgroundColor:'#f2f4f9',
    width:'100%',
    height:200,
    },
backbutn:{
  backgroundColor:'#f2f4f9',
  width:'100%',
  top:10
    },
    login:{
        top:80,
        fontWeight:'bold',
        fontSize:20,
        color:'black',
        left:16,
        fontFamily: "Segoe UI",
    },
    log:{
        top:90,
        left:16
    },
    content:{
        width:'100%',
        height:400,
        alignItems:'center'
    },
});

export default Saveadd;
