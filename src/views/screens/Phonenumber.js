import React,{useState,useContext,useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity,TextInput,Button, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../AuthContext';


export default function AccountScreen (props)   {
    const {  navigation } = props
    const [phone,setphone] = useState('');
    const [phonenumber,setphonenumber] = useState('');
    const [phonematcherror,setphonematcherror] = useState('');
    
    const {Socailloginphone} = useContext(AuthContext);

    const phonematch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    
    const submit =() => {
      if ( phonenumber == null)
      return setphonenumber ('enter phone')
       if (!phonematch.test(phone))
      return setphonematcherror ('enter valid number')
      else 
      return Socailloginphone(phone) 
    }
  
  return (
    <SafeAreaView style={{backgroundColor: 'white',height:800}}>

      <View style={styles.head}>
          <View style={styles.backbutn}>
           <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{left:30}} />
         </View>
         <View style={{flexDirection:'row',height:155}}>
         <View style={{width:'60%'}}>
             <Text style={styles.login}>Enter Phone number</Text>
         </View>
         <View style={{width:'50%'}}>
         <Image
           style={{ width: '46%', height: 150,justifyContent:"center",left:50}}
            source={require('../../assets/Forget.png')}></Image>
         </View>
      </View>
      </View>
  
      <View style={styles.content}>
      
          <View style={styles.fields}>
          <TextInput
          style={styles.input}
          value={phone}
          placeholder="Enter Phone"
          onChangeText={text => setphone(text)}
           />
          <View style={{bottom:20}}>
          <Text>{phone != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{phoneerror}</Text>) }</Text>
         <Text>{!phonematch.test(phone) ? (<Text style={{color:'red',textAlign:'center',left:10}}>{phonematcherror}</Text>):(<Text></Text>) }</Text>
     
         </View>
            
                <TouchableOpacity style={{width:'100%',}}
                onPress={()=>submit()}
                >
               <Text style={styles.button}>proceed</Text>
                </TouchableOpacity>
                
      </View>
      

      </View>
     

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
      fields:{
        width:'80%',
        height:200,
        alignItems:'center',
        top:30
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
          input: {
            width:'100%',
            borderRadius:6,
            marginBottom:30,
            height:56,
            paddingLeft:30,
            backgroundColor:'white',
            borderBottomWidth:0.3
          },
 
});

// import React,{useContext,useState} from 'react';
// import {Text,View,TextInput} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AuthContext } from '../../../AuthContext';
// import Spinner from 'react-native-loading-spinner-overlay';
// export default function  ForgetPassword (){
    
//     const [email, setEmail] = useState(null);
//     const {isLoading, forgetpassword} = useContext(AuthContext);
//     const [forgetpwd, setforgetpwd] = useState({});
    

      
     
// return(
//   <View>
//     <Spinner visible={isLoading} />
//    <TextInput
//   placeholder='email'
//   value={email}
//   onChangeText={text => setEmail(text)}
//   >

//   </TextInput>
//   <TouchableOpacity onPress={()=>forgetpassword(email)}>
//   <Text>snd otp</Text>
//   </TouchableOpacity>
  
//   </View>
  
// );
// }
