import React, { useEffect, useState,useContext } from 'react';
import {Modal, FlatList,Button, Text, View,StyleSheet,Image,ImageBackground,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { AuthContext } from '../../../AuthContext';
import { SvgUri } from 'react-native-svg';
import RazorpayCheckout from 'react-native-razorpay';
import LottieView from 'lottie-react-native';
import {  Overlay } from 'react-native-elements';

export default function App (props) {
  const [isLoading, setLoading] = useState(true);
  const [Loading ,setisloading] = useState(true)
  const [data, setData] = useState([]);
  const [result, setdata] = useState([]);
  const {  topay,deliverytype,address,couponname,lat,long } = props.route.params;
  const {  navigation } = props
  const {userinfo,userInfo} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  // console.log(address)
  console.log('coupon',deliverytype)
  const names = topay;
  const nameArr = names.split(',');
  
  useEffect(() => {
   
    fetch('https://demo.foodduke.com/public/api/get-payment-gateways',{
      method:'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {"token": userInfo.auth_token}
    )
    })
    
    .then((response) => response.json())
    .then((json) => setData(json))
    .then((data) => JSON.stringify(data))
    
    .catch((error) => console.error(error))
    .finally(() => setisloading(false));
      
  }, []);

const type = deliverytype == 'Delivery' ? ('1'):('0')
console.log('type',type)

  const itemid = result.unique_order_id
  console.log(itemid)
  const ordernavi = () =>{
    if (itemid != undefined || itemid != '')
   return navigation.navigate('OrderStatus',{
      // id:iditem,
      orderid:itemid
    })
   else return console.log('ddd')
}

  console.log(userInfo.auth_token)

 const location = {lat,long,address}
//  console.log('locationnew',location)
  const makepayment = () =>{
  //  var location = (userinfo[0] == null && userinfo[0] == undefined) ?
  //   (mylocation):
  //   (Object.values(userinfo[0].address)) 
  //         console.log(location)        
   const token = userInfo.auth_token     
   const id = userInfo.id
    // console.log(token)
    // console.log(id)
    // console.log(name)
   
    fetch('https://demo.foodduke.com/public/api/place-order',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify ({
      "coupon":couponname,
      "delivery_type":type ,
      "dis":"0.766857011592508",
      "location":location,
      "method":"COD",
      "order_comment":"",
      "partial_wallet":false,
      "payment_token":"",
      "pending_payment":false,
      "tipAmount":0,
      "token":token,
      "user_id":id,
      "total":{"productQuantity":2,"totalPrice":topay}
    })
    })
    
    .then((response) =>(response.json()))
    .then((result) => {
      console.log(result)
      setLoading(false)
      setdata(result.data)
     
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  const makeonlinepayment = () =>{
    //  var location = (userinfo[0] == null && userinfo[0] == undefined) ?
    //   (mylocation):
    //   (Object.values(userinfo[0].address)) 
    //         console.log(location)        
     const token = userInfo.auth_token     
     const id = userInfo.id
      // console.log(token)
      // console.log(id)
      // console.log(name)
      console.log(location)
      fetch('https://demo.foodduke.com/public/api/place-order',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify ({
        "coupon":couponname,
        "delivery_type":type,
        "dis":"0.766857011592508",
        "location":location,
        "method":"Online Payment",
        "order_comment":"",
        "partial_wallet":false,
        "payment_token":"",
        "pending_payment":false,
        "tipAmount":0,
        "token":token,
        "user_id":id,
        "total":{"productQuantity":2,"totalPrice":nameArr[0]}
      })
      })
      
      .then((response) =>(response.json()))
      .then((result) => {
        console.log(result)
        setLoading(false)
        setdata(result.data)
       
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }

  let options = {
    description: 'Online',
    currency: 'INR',
    amount: nameArr[0] * 100,
    key: 'rzp_test_eKSxlmsMoMXNua',
    name: userInfo.name,
    prefill: {
      email: userInfo.email,
      contact: userInfo.phone,
      name: userInfo.name,
    },
    theme: {color: '#528FF0'},
  };

  const onlinepayment = () => {
    RazorpayCheckout.open(options)
    .then((data) => {
      makeonlinepayment(),setShowModal(!showModal)
    })
    .catch((error) => {
      Alert.alert('Transaction cancelled');
    });
  }

  const getcartqty = (id) =>{
    const found = data.find(el => el.item_id === id); 
     // console.log(found)
     if (found != undefined )  
     return found.id
     else 
     return 0
   }

   const somefunc = (item) =>{
     if (item.id == 1)
     return makepayment(),setShowModal(!showModal)
     else 
     return onlinepayment()
   }


 
  return (
     <View>
        <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:25}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:25,
        color:'black'
      }}>TO PAY :  <Image
      style={{ width:15, height:15,top:5,right:4,}}
      source={require('../../assets/rupee.png')}></Image> {nameArr[0]}</Text>
      </View>
    <View>
      
      {Loading ?
        <SkeletonPlaceholder>
        <View >
        <View style={{margin:10}}>
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 100, height: 40, borderRadius: 30 }}
            />
        </View>
        <View style={{margin:10}}>
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 100, height: 40, borderRadius: 30 }}
            />
        </View>
        <View style={{margin:10}}>
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 100, height: 40, borderRadius: 30 }}
            />
        </View>
        </View>
      </SkeletonPlaceholder>
      : 
      (
        
      <View style={{alignItems:'center'}}>
         <Text style={{textAlign:'center',fontFamily:'FontAwesome5_Solid',color:'#6c757d',fontSize:16,top:40}}>Select your prefered payment method</Text>  
          
        <View style={{height:300,width:'100%',top:100,left:50,
        justifyContent:'center',alignItems:'center'}}>
         <FlatList
            data={data}
            keyExtractor={( item , index) => item}
            renderItem={({ item }) =>(
            <View>
           { !getcartqty(item.id)?(
              <TouchableOpacity onPress={()=>somefunc(item)}>
                <View style={{flexDirection:'row',right:20,elevation:10}}>
                <Text style={style.types} >{item.name}</Text>
               <SvgUri style={{right:200,top:32}}
              width="40%"
              height="40%"
              uri={`https://demo.foodduke.com/${item.logo}`}
              
             />
                </View>
              
               </TouchableOpacity>
                    
               
               
              ):(
                <Text></Text>
              )}
      </View>
      )}
          />
         </View>
         </View>       
      )}
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
          <View style={style.modal}>
            
            {!isLoading ? (
              ordernavi()
            ):(
          
              <View style={style.centeredView}>
          <View style={style.modalView}>
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
  );
};

const style = StyleSheet.create ({
  header: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    height:80
    
  },
  logo:{
        // left:12,
        width:'35%',
        height:32,
        top:24
    },
  types:{
       width:'70%',
       padding:26,
       textAlign:'center',
       margin:20,
       color:'black',
       right:50,
       backgroundColor:'white',   
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    top:200
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
