import React, {useContext, useState,useEffect} from 'react';
import {Button,KeyboardAvoidingView, Text,TextInput,TouchableOpacity,View,Image,StyleSheet,} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../../AuthContext';
import LottieView from 'lottie-react-native';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [data, setData] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [errormsg, seterrormsg] = useState('');
  const [erroremailmsg, seterroremailmsg] = useState('');
  const [errorpassmsg, seterrorpassmsg] = useState('');
  const [errorpassmatchmsg, seterrormatchpassmsg] = useState('');
  const [nameerrormsg, setnameerrormsg] = useState('');
  const [namematcherrormsg, setnamematcherrormsg] = useState('');
  const [errorphone, seterrorPhone] = useState(null);
  const [errorphonematch, seterrorPhonematch] = useState(null);
  const [missmatchpassword, setmissmatchpassword] = useState(null);
  const [itemdata, setitemdata] = useState([]);
  const namematch = /^[a-zA-Z ]{3,30}$/
  const emailmatch = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  const passwordmatch = /^.*(?=.{8,})/
  const phonematch = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  const {isLoading, register,googlelogin} = useContext(AuthContext);
  
  const submit = () =>{
      if (name == null && email == null && phone == null && password == null  )
      return  setnamematcherrormsg('min 3 & no special characters  & number'),
      seterroremailmsg ('Enter your valid Email'),
      seterrorPhonematch ('Enter your valid number'),
      seterrormatchpassmsg('Password must contain atleat 8 characters')
      else if (name == null )
      return setnamematcherrormsg('min 3 & no special characters  & number')
      else if (!namematch.test(name))
      return setnamematcherrormsg('min 3 & no special characters  & number')
       else if (email == null )
      return seterroremailmsg ('Enter your valid Email')
      else if (!emailmatch.test(email))
      return seterroremailmsg ('Enter your valid Email')
      else if ( phone == null)
      return seterrorPhonematch ('Enter your valid number')
      else if (!phonematch.test(phone))
      return seterrorPhonematch ('Enter your valid number')
      else if (password == null)
      return seterrormatchpassmsg('Password must contain atleat 8 characters')
      else if (!passwordmatch.test(password))
      return seterrormatchpassmsg('Password must contain atleat 8 characters')
      else if (password != confirmpassword)
      return setmissmatchpassword('Password do not match')
      else
      return register(name,email,phone,password)
 }

 const redirect = () =>{
   if (itemdata.value == false)
   return otpsend(email)
   else return register(name,email,phone,password)
 }

  const otpsend = (email) =>{
  const usermail = email 
  console.log('mail',usermail)

  fetch (`http://demo.foodduke.com/public/api/send-password-reset-mail?email=${usermail}`,
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
  checkotp()
}
const checkotp = () =>{
  if (data?.success != 'true' )
  return alert('otp sent to your mobile number'),navigation.navigate('OTPscreen',{
    email: email,
    name:name,
    phone:phone,
    password:password
  })
}


 const otpverification = () =>{
  fetch(`http://demo.foodduke.com/public/api/get-setting/enSOV`,{
    method:'GET',
    headers: {
      'Content-Type': 
        'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => setitemdata(json))
  .then((itemdata) => JSON.stringify(itemdata))
  .catch((error) => console.error(error))
  .finally(() => isLoading(false));
  console.log('itemdata',itemdata.value)
}

useEffect(()=>{
 otpverification()
},[])
  return (
    isLoading ? 
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
    <Image style={{width:250,height:250}}
     source={require('../../assets/loader.gif')} >
  </Image>
  </View>
  :
  <View  style={styles.container}>

 
    <ScrollView>
    <View style={{alignItems:'center'}}>
      <Spinner visible={isLoading} />
      <View style={styles.head}>
      <View style={styles.backbutn}>
            <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{left:30}} />
          </View>
          <View style={{flexDirection:'row',height:155}}>
          <View style={{width:'50%'}}>
              <Text style={styles.login}>Register</Text>
              <Text style={styles.log}>Register now for free</Text>
          </View>
          <View style={{width:'50%'}}>
          <Image
            style={{ width: '100%', height: 150,justifyContent:"center",left:18}}
             source={require('../../assets/login.png')}></Image>
          </View>
       </View>
      </View>
    
      <View style={styles.wrapper}>
      <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "height"}
           
         >
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
          maxLength={25}
        />
        <View style={{bottom:4}}>
        {/* <Text>{name == null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{nameerrormsg}</Text>) }</Text> */}
       <Text>{ name == null ? (<Text style={{color:'red',textAlign:'center',left:10}}>{namematcherrormsg}</Text>):(<Text></Text>) }</Text>
        </View>
      
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
          maxLength={50}
        />
        <View style={{bottom:4}}>
        {/* <Text>{email != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errormsg}</Text>) }</Text> */}
         <Text>{!emailmatch.test(email) ? (<Text style={{color:'red',textAlign:'center',left:10}}>{erroremailmsg}</Text>):(<Text></Text>) }</Text>
         </View>
        <TextInput
          style={styles.input}

          value={phone}
          keyboardType={'numeric'}
          placeholder="Enter phone"
          onChangeText={text => setPhone(text)}
          maxLength={10}
        />
        <View style={{bottom:4}}>
        {/* <Text>{ phone != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errorphone}</Text>) }</Text> */}
        <Text>{ phonematch.test(phone)? (<Text></Text>):( <Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{errorphonematch}</Text>) }</Text>
        </View>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          maxLength={25}
          secureTextEntry
        />
        <View style={{bottom:4}}>
         {/* <Text>{ password != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errorpassmsg}</Text>) }</Text> */}
         <Text>{ passwordmatch.test(password)? (<Text></Text>):( <Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{errorpassmatchmsg}</Text>) }</Text>
       </View>
       <TextInput
          style={styles.input}
          value={confirmpassword}
          placeholder="Confirm password"
          onChangeText={text => setconfirmpassword(text)}
          maxLength={25}
          secureTextEntry
        />
        <View style={{bottom:4}}>
         {/* <Text>{ password != null ? (<Text></Text>):(<Text style={{color:'red',textAlign:'center',left:10}}>{errorpassmsg}</Text>) }</Text> */}
         <Text>{ password == confirmpassword? (<Text></Text>):( <Text style={{color:'red',textAlign:'center',left:10,bottom:10}}>{missmatchpassword}</Text>) }</Text>
       </View>
          <TouchableOpacity 
            onPress={()=>submit()}>

            <Text style={styles.button}>Register</Text>
       </TouchableOpacity>
      
        <View style={{flexDirection: 'row', marginTop: 20,justifyContent:'center'}}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
                <View style={{width:30,top:5,borderBottomColor:'grey',borderBottomWidth:0.3}}></View>
              <Text style={{textAlign:'center',top:13,fontWeight:'300',color:'grey'}}>  OR  </Text>
              <View style={{width:30,top:5,borderBottomColor:'grey',borderBottomWidth:0.3}}></View>
              </View>
        <View style={{alignItems:'center',top:20}}>
        <View style={{top:10,alignItems:'center'}}>

            <TouchableOpacity style={{borderWidth:0.3,padding:10,borderRadius:5,backgroundColor:'white',borderColor:'#57575730',bottom:6}} onPress={() =>  googlelogin()} >
              <View style={{flexDirection:'row'}}>
              <Image style={{width:20,height:20,}}
              source={{
                uri :'http://meatapp.smartstorez.com/assets/img/various/google.png'
              }}
              ></Image>
              <Text style={{fontFamily:'FontAwesome5_Solid',top:2}}>   Login in with Google</Text>
            
              </View>
              </TouchableOpacity>
          </View>
  </View>
        </KeyboardAvoidingView>
      
      </View>
      
    </View>
    </ScrollView>
    <View style={styles.bottomView}>
        <LottieView
        style={{width:'100%',opacity:0.8}}
        source={require('../../assets/customewave2.json')}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
 
  },
  wrapper: {
    width: '80%',
    top:40,
    height:700
  },
  input: {
    width:'100%',
    backgroundColor:'white',
    borderRadius:6,
    marginBottom:6,
    height:45,
    paddingLeft:20
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
    backgroundColor:'white',
    width:'100%',
    height:200,
    },
backbutn:{
  backgroundColor:'white',
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
    bottomView: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      position: 'absolute',
      bottom: -20,
    },
});

export default RegisterScreen;
