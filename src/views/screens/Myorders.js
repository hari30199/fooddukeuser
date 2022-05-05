import React,{useState,useEffect,useContext} from 'react';
import {StyleSheet,TouchableOpacity,Image,RefreshControl, FlatList,ActivityIndicator,View,Dimensions,Text} from 'react-native';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';  
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import { SvgUri } from 'react-native-svg';
import LottieView from 'lottie-react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


 export default function OrderDetailscreen ()  {
    const [data, setData] = useState([]);
    const [result, setresult] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const {userInfo} = useContext(AuthContext);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);
    const isFocused = useIsFocused();

    // const i = 0
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      // setresult(true);
      // setData(true);
      wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(()=>{
      isFocused ? (getorders()):(getorders())
      },[isFocused])

    
    const token = userInfo.auth_token
    const user_id = userInfo.id

    const getorders = () => {
      
        fetch(`https://demo.foodduke.com/public/api/get-orders` ,
        
          {
            method: 'POST', 
                 
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    "token":token,
                    "user_id": user_id,
                  })
                })
              
                .then((response) => response.json())
                .then((json) => setData(json))
                .then((data) => JSON.stringify(data))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
              // console.log(data.data.length)
            
    }
      var size = data?.data?.length
         console.log(size)


              const Cancelorder = (id) =>{
              const orderid = id
              console.log(orderid)
                fetch(`https://demo.foodduke.com/public/api/cancel-order` ,
                
                  {
                    method: 'POST', 
                         
                          headers: {
                            "content-type": "application/json",
                          },
                          body: JSON.stringify({
                            "token":token,
                            "user_id": user_id,
                            "order_id": orderid
                          })
                        })
                      
                        .then((response) => response.json())
                        .then((json) => {setresult(json),onRefresh(true)})
                        .then((result) => JSON.stringify(result))
                        .catch((error) => console.error(error))
                        .finally(() => setLoading(false));
                      }
                    
               
               const itemlistexist = (id) =>{
                 console.log(id)
                const found = data.find(el => el.id === id); 
                if (!found)  
                return true
                else 
                return false
                
                 }
                 
   const getTime = (item) =>{
     var i= 0 
     const views = [];
    //  console.log('hello',item.orderitems.length)
     for (i=0; i<item.orderitems.length;i++){
      //  console.log('hell',i)
       views.push(
        <View style={styles.food}>
        <Text style={{color:'black',borderWidth:0.3,borderColor:'#57575730',padding:2}}><Entypo name={'cross'} size={10}></Entypo>{item.orderitems[i].quantity}</Text>
         <Text style={{color:'black'}}>{item.orderitems[i].name}</Text>
        <Text style={{color:'black'}}><Image
                    style={{ width:10, height: 10,top:5,right:4}}
                    source={require('../../assets/rupee.png')}></Image>{item.orderitems[i].price}</Text>
         </View>
       )
     }
     return views
    //  return console.log(i)
   }   
   


   const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  const ItemDivide = () => {
    return (
      <View
        style={{
          height: 5,
          width: "100%",
          backgroundColor: "#57575730",
        }}
      />
    );
  }
  return (
    isLoading?(
    
              <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
           <Image style={{width:250,height:250}}
            source={require('../../assets/loader.gif')} >
         </Image>
         </View>
       
    ):(
      <View style={styles.container}>
         <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:25}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:25,
        color:'black'
      }}>My orders</Text>
      </View>
    {size == 0 ? (
      <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',flex:1}}>
        <SvgUri 
        width={400}
        height="70%" backgroundColor='red' 
        uri={`https://meatapp.smartstorez.com/assets/website/images/icons/no_product_img.svg`}/>
         <Text style={{textAlign:'center',fontSize:16,fontWeight:'800',color:'#6c757dad'}}>You have not placed any order yet.</Text>
      </View> 
    ):(
      <View style={{
        justifyContent: "center",
        width: "100%",
        backgroundColor:'white',
        flex: 1,
          }}>  
        <FlatList
        style={{height:'auto', margin:5,}}
              data={data.data}
              keyExtractor={({ id }, index) => id}
              ItemSeparatorComponent={ItemDivide}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
             
              renderItem={({ item }) => (
                <View style={styles.items}>
                  {item.orderstatus.name == 'Canceled' || item.orderstatus.name == 'Delivered' ?(
                    
                    <View style={styles.tracks}>
                    <Text style={{color:item.orderstatus.name != 'Delivered' ?('red'):('green'),
                     borderColor:item.orderstatus.name != 'Delivered' ?('red'):('green'),
                     borderWidth:0.3,padding:6,fontWeight:'600'}}>{item.orderstatus.name}</Text>
                    
                    </View >
                  ):(
                    <View style={styles.track}>
                    <Text style={{borderWidth:0.3,padding:6,fontWeight:'600',right:18}}>{item.orderstatus.name}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderDetailscreen',{
                                         id:item.id,
                                         orderid:item.unique_order_id,
                                         orderstatus:item.orderstatus.name
                                                    })}>
                                                      <View style={{flexDirection:'row'}}>
                    <Text  style={{ textAlign:'right',
                    borderWidth:0.3,
                    padding:6,
                    color:'green',
                    fontWeight:'600',width:120,
                    textAlign: 'left',left:20 }}>Track Order </Text>
                    <View  style={{width:44,height:44,position:'absolute',left:98,top:-6}}>
                         <LottieView
                          source={require('../../assets/wavetrack.json')}
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
                          duration={4800}
                          />
                          </View>
                          </View>
                    </TouchableOpacity>
                    
                    </View >
                    
                  )}
                 
                  <View style={{left:14,top:20,justifyContent:'space-around'}}>
                  <Text style={{color:'orange',fontFamily:'FontAwesome5_Solid'}}>{item.unique_order_id}</Text>
                  </View>
                  <View style={{top:26,left:14}}>
                  <Text style={{color:'black',fontSize:16,}}>{item.restaurant.name}</Text>
                    </View>
                  <View >
                    <View>{getTime(item)}</View>
                    </View>
                    <View style={styles.rest}>
                     <Text>Restaurant Charges:</Text>
                     <Text><Image
                      style={{ width:10, height: 10,top:5,right:4}}
                      source={require('../../assets/rupee.png')}></Image>{item.restaurant_charge == null ? '0.00':item.restaurant_charge}</Text>
                    </View>
  
                    <View style={styles.rest}>
                     <Text>Delivery Charges:</Text>
                     <Text><Image
                      style={{ width:10, height: 10,top:5,right:4}}
                      source={require('../../assets/rupee.png')}></Image>{item.delivery_charges == null ? '0.00':item.delivery_charges}</Text>
                    </View>
  
                    <View style={styles.rest}>
                     <Text style={{color:'black',fontSize:16,fontFamily:'FontAwesome5_Solid'}}>Total</Text>
                     <Text style={{color:'black',fontSize:16}}><Image
                      style={{ width:10, height: 10,top:5,right:4}}
                      source={require('../../assets/rupee.png')}></Image>{item.total}</Text>
                    </View>
                    <View style={styles.rest}>
                     <Text style={{color:'black',fontSize:16,fontFamily:'FontAwesome5_Solid'}}>Payment Mode:</Text>
                     <Text style={{color:'black',fontSize:16}}>{item.payment_mode}</Text>
                    </View>
                    <View style={styles.rest}>
                    
                     <Text>{item.address}</Text>
                    </View>
                    <View style={styles.rest}>
                     <Text style={{color:'black',fontSize:16}}></Text>
                     {item.orderstatus.name == 'Canceled' || item.orderstatus.name != 'Order Placed' ?(
                       <Text ></Text>
                     ):(
                      itemlistexist ?(
                        <TouchableOpacity onPress={()=>navigation.navigate('CancelOrder',{id:item.id})}>
                        <Text style={{color:'red',borderWidth:0.3,padding:8,borderColor:'red'}}> Cancel Order</Text>
                       </TouchableOpacity>
                      ):(
                        <TouchableOpacity onPress={()=>Cancelorder(item.id)}>
                        <Text></Text>
                       </TouchableOpacity>
                      )
                     )}
                     
                    </View>
                    {/* <FlatList
                     data={data.data}
                     keyExtractor={({ id }, index) => id.tostring}
                     renderItem={_renderItem}/> */}
                </View> 
              )}
            />
               </View>
    )}
    
    </View>
    )
      
    
  );
};

const styles = StyleSheet.create({
 
 
  container: {

  flex:1,
  
  },
  items:{
    width:'94%',
    height:'auto',
    left:7,
    backgroundColor:'white',
   
    flexShrink: 1 ,
    marginBottom:90,

  },
  track:{
    flexDirection:'row',
    top:12,
    justifyContent:'space-around',
    flexDirection:'row'
  },
  tracks:{
    flexDirection:'row',
    top:12,
    left:22,
    height:'auto'
  },
  food:{
   top:50,
   width:"94%",
   borderBottomWidth:0.3,
   borderColor:'#57575730',
   left:10,
   flexDirection:'row',
   justifyContent:'space-between',
   padding:6
  },
  rest:{
    top:80,
    width:"94%",
    left:10,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:6
  }
  
});

