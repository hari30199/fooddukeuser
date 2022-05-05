import React,{useState,useContext,useEffect} from 'react';
import {Text,View} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../../AuthContext';
import { useNavigation } from '@react-navigation/native';
export default function Resetpassword() {
  const [email,setemail] = useState([]);
  const [data, setData] = useState([]);
  const {userInfo, isLoading} = useContext(AuthContext);
  const navigation = useNavigation();
  
   const restpwd = () => {
       
       const email = userInfo.email
       console.log(email)
       fetch (`http://demo.foodduke.com/public/api/send-password-reset-mail?email=${email}`,
       {
           method:'POST',
           headers: {
            "content-type": "application/json",
           },
          
       })
       .then((response) => response.json())
       .then((json) => setData(json))
       .then((data) => JSON.stringify(data))
       .catch((error) => console.error(error))
       console.log(data)
   }
    return(
        <View>
            <Text style={{textAlign:'center',height:150,
          backgroundColor:'white',
          }}>Resetpassword </Text>
          <View>
            <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
            <TextInput 
        placeholder='enter mail'
          style={{backgroundColor:'white',width:200,textAlign:'center',
          padding:10,borderRadius:10}}
        >

        </TextInput>
            </View>
          </View>
          <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={ () => (restpwd())}>
        <Text style={{backgroundColor:'orange',width:200,textAlign:'center',
      padding:10,borderRadius:10}}>click</Text>
        <Text>{data.message}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
          navigation.navigate('VerifyOTP')
        }>

        <Text style={{backgroundColor:'orange',width:200,textAlign:'center',
      padding:10,borderRadius:10}}>Verify</Text>
        </TouchableOpacity>
          </View>
        
        
        </View>
        
    );
}
