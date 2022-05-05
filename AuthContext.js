import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Text,TextInput,View,Button,StyleSheet,TouchableOpacity,Image} from 'react-native'
import React, {createContext, useEffect, useState} from 'react';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import {  Overlay } from 'react-native-elements';

export const AuthContext = createContext();

export const AuthProvider = ({children,props}) => {
  const [userInfo, setUserInfo] = useState({});
  const [userinfo, setUserinfo] = useState({});
  const [googleuser, setgoogleuser] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [isvisible, setisVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [phone,setphone] = useState('');
  const [phonenumber,setphonenumber] = useState('');
  const [phonematcherror,setphonematcherror] = useState('');
  const phonematch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
 


  const toggleOverlay = () => {
    setisVisible(!isvisible);
  };

  const submit =() => {
    if ( phonenumber == null)
    return setphonenumber ('Enter phone')
     if (!phonematch.test(phone))
    return setphonematcherror ('Enter valid number')
    else 
    return Socaillogin(googleuser,phone,toggleOverlay(!isvisible))
  }


  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setgoogleuser({ user: null }); 
    } catch (error) {
      // console.errorgoogleuser
    }
  };


  const register = (name, email, phone,password) => {
    setIsLoading(true);

    axios
      .post(`https://demo.foodduke.com/public/api/register? name=${name}& email=${email}&phone=${phone}&password=${password}`, {
        name,
        email,
        phone,
        password, 
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        if(userInfo.data == 'Email or phone number already used' || userInfo.data.email == 'The email has already been taken.' )
        return alert ('Email or Phone already exists')
        // console.log(userInfo.data.email);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`https://demo.foodduke.com/public/api/login?email=${email}&password=${password}`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        if(userInfo.data == 'DONOTMATCH')
        return alert ('Email and Password mismatch')
        // alert(userInfo.data);
      })
      .catch(e => {
        alert(`login error ${e}`);
        setIsLoading(false);
      });
  };



                //  ---------Google login--------- //
  const googlelogin = async () => {
  GoogleSignin.configure({
    webClientId:
      '1022741760520-1r5eidqb13s2vgi0uq9q3qqvrob23gbo.apps.googleusercontent.com', 
   
   });
  try {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
    const { idToken } =  GoogleSignin.signIn()
      
    .then((user) => {
      console.log(user)
       var user = user
       setgoogleuser(user)
       Socaillogin(user)
       
      // GoogleSignin.getTokens().then((res)=>{
      //   let currentUser = res.data;
      // // alert( 'Login Successfull');
        
      //   var accessToken = res.accessToken
      //   console.log(idToken)
        
      //   
        
      // })
      .catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
      })
    })
  }})
  } catch (error) {
    console.log('Message', JSON.stringify(error));
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signing In');
    } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
      alert('Play Services Not Available or Outdated');
    }
     else {
      alert(error.message);
    }
  }
};
useEffect(()=>{
  GoogleSignin.configure({
    scopes:['email'],
    webClientId:
      '1022741760520-1r5eidqb13s2vgi0uq9q3qqvrob23gbo.apps.googleusercontent.com', 
   
   });
},[])


          //  ------------Social Login---------- //
const Socaillogin = (currentUser,phone = '') => {
  setIsLoading(true);
  console.log('aa',currentUser)
const id = currentUser.idToken

console.log(id)
const email = currentUser.user.email
console.log(email)
const name = currentUser.user.name
console.log(name)
const provider = 'google'
console.log(provider)
const verify_type = 'id_token'
console.log(verify_type)
console.log('hello',phone)
  
//  console.log(`https://meatapp.smartstorez.com/public/api/login?accessToken=${id}&email=${email}&name=${name}&provider=${provider}&verify_type=${verify_type}&phone=${phone}`)
  axios
    .post(`https://demo.foodduke.com/public/api/login?accessToken=${id}&email=${email}&name=${name}&provider=${provider}&verify_type=${verify_type}&phone=${phone}`, {
   phone
    })
    .then(res => {
      let userInfo = res.data;
      console.log("hel",userInfo)
      if (userInfo.enter_phone_after_social_login == true )
      return toggleOverlay (isvisible)
      // alert( 'Login Successfull');
      setUserInfo(userInfo.data);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
    })
    .catch(e => {
      alert(`login error ${e}`);
      setIsLoading(false);
    });
}; 

        //  --------phone number for socail login -------- //
const Socailloginphone = (currentUser,phone) => {
setIsLoading(true);
const id = currentUser.idToken
console.log(id)
const email = currentUser.user.email
console.log(email)
const name = currentUser.user.name
console.log(name)
const provider = 'google'
console.log(provider)
const verify_type = 'id_token'
console.log(verify_type)


  axios
    .post(`https://demo.foodduke.com/public/api/login?accessToken=${id}&email=${email}&name=${name}&provider=${provider}&verify_type=${verify_type}&phone=${phone}`, {
      phone
    })
    .then(res => {
      let userInfo = res.data;
      console.log(userInfo)
      // alert( 'Login Successfull');
      setUserInfo(userInfo.data);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
    })
    .catch(e => {
      alert(`login error ${e}`);
      setIsLoading(false);
    });
};       

  const registeradd = (address,latitude,longitude,house,landmark) => {
    setIsLoading(true);
     const token = userInfo.auth_token
     const id = userInfo.id
    axios
        .post(`https://demo.foodduke.com/public/api/save-address?token=${token}&user_id=${id}`, {
        address,
        latitude,
        longitude,
        house,
        landmark,
      })
      .then(res => {
        let userinfo = res.data;
        setUserinfo(userinfo);
        AsyncStorage.setItem('userinfo', JSON.stringify(userinfo));
        setIsLoading(false);
        console.log(Object.values(userinfo[0]));
        // alert('address saved success')
      })
      .catch(e => {
        console.log(`save add error ${e}`);
        setIsLoading(false);
      });
  };


  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `https://demo.foodduke.com/public/api/login?`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.auth_token}`},
        },
      )
      .then(res => {
        console.log(res);
        AsyncStorage.removeItem('userInfo');
        signOut()
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo.data) {
        setUserInfo(userInfo.data);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

 

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        userinfo,
        currentUser,
        googleuser,
        signOut,
        googlelogin,
        Socaillogin,
        register,
        login,
        registeradd,
        Socailloginphone,
        logout,
        signOut,
      }}>
      {children}
      <Overlay isVisible={isvisible} onBackdropPress={toggleOverlay}>
        <View style={{padding:30}}>
        <View style={{alignItems:'center',padding:25}}>
        <Image style={{width:80,height:80}}  
        source={require('./src/assets/usermobile.png')} />
        <View style={{right:13}}>
        <Text style={{top:15,fontFamily:'FontAwesome5_Solid',right:13}}>Enter Mobile Number</Text>
        </View>
        
        </View>
        
      <TextInput
          style={{borderWidth:0.8,borderColor:'#57575730',borderRadius:3,paddingLeft:6}}
          value={phone}
          placeholder="Mobile Number"
          onChangeText={text => setphone(text)}
          keyboardType={'numeric'}
          maxLength={12}
           />
          <View >
          {/* <Text>{phone != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{phoneerror}</Text>) }</Text> */}
         <Text>{!phonematch.test(phone) ? (<Text style={{color:'red',textAlign:'center',left:10,fontSize:12}}>{phonematcherror}</Text>):(<Text></Text>) }</Text>
         </View>
         <View style={{width:'100%',height:70,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity  style={{
            width:120,
            height:50,
            backgroundColor:!phonematch.test(phone) ?'#f3f3f3' : 'orange',
            padding:10,
            borderRadius:5,
            borderWidth:0.3,
            borderColor:'#57575730'}} onPress={()=> submit()}>
           <Text style={{textAlign:'center',
           fontFamily:'FontAwesome5_Solid',right:4,
           top:6,color:!phonematch.test(phone) ? '' :'white'}}>Confirm</Text>
           </TouchableOpacity>
         </View>
        </View>
      </Overlay>
    </AuthContext.Provider>
  );
};