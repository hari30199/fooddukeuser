import React,{useState,useContext,useEffect} from 'react';
import {Modal,SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity,TextInput,Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import BASEURL from '../../config'

export default function AccountScreen (props)   {
    const {  navigation } = props
    const [data, setData] = useState([]);
    const [email, setemail] = useState('');
    const [errormsg,seterrormsg] = useState('');
    const [erroremailmsg,seterroremailmsg] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const emailmatch = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    const handlesubmit = () => {
      if (email == null )
      return seterrormsg('enter email')
       if (!emailmatch.test(email))
      return seterroremailmsg ('enter valid email')
      else
      return restpwd(email)
      }

      const restpwd = (email) => {
       
        const usermail = email 
        console.log(usermail)

        fetch (`${BASEURL}/public/api/send-password-reset-mail?email=${usermail}`,
        {
            method:'POST',
            headers: {
             "content-type": "application/json",
            },
           
        })
        .then((response) => response.json())
        .then((json) => setData(json),setShowModal(!showModal))
        .catch((error) => console.error(error))
        .finally(()=> setLoading(false))
        console.log(data)
    }
     
    // const otpScreen = () =>{
    //   if (data.success == true)
    //   return alert('Reset Otp sent to email'), navigation.navigate('Updatepassword',{
    //     otpemail : email
    //   })
    // }
    const otpScreen = () =>{
      if (data.message == 'Password reset mail sent')
      return  navigation.navigate('Updatepassword',{
        otpemail : email
      })
     else return console.log('ddd')
  }
  
  return (
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
                  name="email"
                  placeholder="Email Address"
                  style={styles.efield}
                  onChangeText={text => setemail(text)}
                  value={email}
                  keyboardType="email-address"
                />
                   <View style={{bottom:20}}>
                     <Text>{email != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errormsg}</Text>) }</Text>
                    <Text>{!emailmatch.test(email) ? (<Text style={{color:'red',textAlign:'center',left:10}}>{erroremailmsg}</Text>):(<Text></Text>) }</Text>
                    </View>
                <TouchableOpacity style={{width:'100%',}}
                onPress={()=>handlesubmit(email)}
             
                >
                  <Text style={styles.button}>SEND OTP ON EMAIL</Text>
                </TouchableOpacity>
                
              
   
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
          <View style={styles.modal}>
            
            {isLoading ? (
              otpScreen()
            ):(
          
              <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{width:200,height:200,position:'absolute',top:-28}}>
             <LottieView
                          source={require('../../assets/loadingorder.json')}
                          colorFilters={[
                            {
                              keypath: 'button',
                              color: '#F00000',
                            },
                            {
                              keypath: 'Sending Loader',
                              color: '#F00000',
                            },
                          ]}
                          autoPlay
                          loop
              
                          />
                          </View>
            
          </View>
        </View>
              
             
            )}
           
          </View>
        </Modal>

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
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 75,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
          modalText: {
            marginBottom: 15,
            textAlign: "center"
          }
 
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
