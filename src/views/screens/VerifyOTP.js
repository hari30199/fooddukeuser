import React,{useState,useContext,useEffect} from 'react';
import {Image,Text,View,SafeAreaView,StyleSheet, Alert} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BASEURL from '../../config'
export default function VerifyOTP(props) {

  const [data, setData] = useState([]);
  const {  navigation } = props
  const [password, setpassword] = useState([]);
  const {aaemail,aacodeotp} = props.route.params;
  const [errormsg, seterrormsg] = useState('');
  const [errorpassmatchmsg, seterrormatchpassmsg] = useState('');
  const passwordmatch = /^.*(?=.{8,})/
  console.log('hello',aaemail,aacodeotp)
  const handlesubmit = () => {
    if (password == null )
    return seterrormsg('Enter Password')
     if (!passwordmatch.test(password))
    return seterrormatchpassmsg('Password must contain atleat 8 characters')
    else
    return updatepassword(aaemail,aacodeotp,password)
    }
  
   const updatepassword = (aaemail,aacodeotp,password) => {
        
       const usermail = aaemail 
       console.log(usermail)
       const otp = aacodeotp
       console.log(otp)
       console.log(password)

       fetch (`${BASEURL}/public/api/change-user-password`,
       {
           method:'POST',
           headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            "email": usermail,
            "code":otp,
            "password":password
          }),
          
       })
       .then((response) => response.json())
       .then((json) => {setData(json),Homescreen()})
       .then((data) => JSON.stringify(data))
       .catch((error) => console.error(error))
       console.log(data)
   }
   
  const Homescreen = () => {
    if (data.success == true)
      return alert(data.message), navigation.navigate('Login')
    
  }

    return(
      <SafeAreaView style={{backgroundColor: 'white',height:800}}>

      <View style={styles.head}>
          <View style={styles.backbutn}>
           <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{left:30}} />
         </View>
         <View style={{flexDirection:'row',height:155}}>
         <View style={{width:'60%'}}>
             <Text style={styles.login}>RESET PASSWORD</Text>
             <Text style={styles.log}>Enter your email address to continue</Text>
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
                  name="password"
                  placeholder="Enter password"
                  style={styles.efield}
                  onChangeText={text => setpassword(text)}
                  value={password}
                  keyboardType="password"
                />
                 <View style={{bottom:20}}>
                  <Text>{ password != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errormsg}</Text>) }</Text>
                  <Text>{ passwordmatch.test(password)? (<Text></Text>):( <Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{errorpassmatchmsg}</Text>) }</Text>
                  </View>
                <TouchableOpacity style={{width:'100%',}}
                onPress={()=>handlesubmit(aaemail,aacodeotp,password)}
             
                >
                  <Text style={styles.button}>change password</Text>
                </TouchableOpacity>
                
              
   
      </View>


      </View>
     

    </SafeAreaView>
        
    );
}
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
      efield:{
          width:'100%',
          backgroundColor:'white',
          borderBottomColor:'silver',
          borderBottomWidth:1,
          marginBottom:30,
          height:56,
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
        but:{
            backgroundColor:'white',
            color:'#b8b8b8',
            height:44,
            textAlign:'center',
            borderRadius:5,
            paddingTop:12,
            fontWeight:'bold',
            fontSize:12,
            borderWidth:1,
            borderColor:'#b8b8b8'
            },
        errorText: {
            fontSize: 12,
            color: '#ffa29c',
            bottom:26,
            right:80
          },
 
});