import React,{useState,useContext,useEffect} from 'react';
import {Image,Text,View,SafeAreaView,TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function VerifyOTP(props) {
 
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  const [resetOTP, setresetOTP] = useState('')
  const {  navigation } = props
  const {otpemail} = props.route.params;


   const VerifyOTP = (resetOTP) => {
        
     const code = resetOTP
      console.log(code)
      console.log(otpemail)
       fetch (`http://demo.foodduke.com/public/api/verify-password-reset-otp`,
       {
           method:'POST',
           headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            "email":otpemail,
            "code":code,
          }),
          
       })
       .then((response) => response.json())
       .then((json) => {setData(json),newpasswordscreen(otpemail,resetOTP)})
       .then((data) => JSON.stringify(data))
       .catch((error) => console.error(error))
       console.log(data)
   }
   const newpasswordscreen = (otpemail,resetOTP) => {
     if (data.success != true)
     return alert('success'), navigation.navigate('VerifyOTP',{
       aaemail: otpemail,
       aacodeotp : resetOTP,
     })
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
                  name="Otp"
                  placeholder="Enter otp"
                  style={styles.efield}
                  onChangeText={text => setresetOTP(text)}
                  value={resetOTP}
                  keyboardType="email-address"
                />
                <TouchableOpacity style={{width:'100%',}}
                onPress={()=>VerifyOTP(resetOTP)}
             
                >
                  <Text style={styles.button}>Verify OTP</Text>
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