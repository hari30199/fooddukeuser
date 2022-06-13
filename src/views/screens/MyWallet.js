import React, { useContext,useEffect,useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, Text, ScrollView,Image } from 'react-native';
import { AuthContext } from '../../../AuthContext';
import TimeAgo from 'react-native-timeago';
import BASEURL from '../../config'
export default function MyWallet (props){
    const {  navigation } = props ;
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const {userInfo} = useContext(AuthContext);
    const token = userInfo.auth_token
    const id = userInfo.id

    console.log(token,id)

  
    useEffect(()=>{
      fetch(`${BASEURL}/public/api/get-wallet-transactions`,
      {
        method: 'POST', 
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
          },
              body: JSON.stringify({
                "token":token,
                "user_id": id
              })
            })
      
            .then((response) => response.json())
            .then((json) => setData(json))
            .then((data) => JSON.stringify(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
             console.log(data.balance)
    
    },[])
    
      return (
        loading ? <Text>hello</Text>:
      <View style={styles.containerMain}>
      <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:25}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:25,
        color:'black'
      }}>My Wallet</Text>
      </View>
      {data.balance > '00.0' ? (
         <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e3e3e3'}}>
         <Text style={{fontSize:25,color:'black',fontWeight:'bold'}}>No Data Found</Text>
         </View>
      ):(
      <View>
      <View style={styles.wallet}>
      <Text style={{color:'#788693',fontWeight:'450',fontSize:20}}>WALLET</Text>
       <Text style={{color:'orange',fontWeight:'bold',fontSize:20}}>  ₹{data.balance}</Text>
      </View>
      {(data.transactions != null && data.transactions != undefined) ? (
        <ScrollView 
        showsHorizontalScrollIndicator={false}
        
         horizontal={true} style={{height:70,backgroundColor:'#efefef',top:80,width:'90%',alignSelf:'center'}}>
         <View style={{flexDirection:'row',top:20}}>
           <View style={{borderWidth:0.3,borderColor:'green',height:30,justifyContent:'center',alignItems:'center',paddingLeft:30,paddingRight:30,left:20}}>
           <Text style={{color:'#788693',
        fontSize:14,
        color:'#9ccc65',}}>{data?.transactions[0]?.type}</Text>
           </View>
        
         <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>               ₹{data?.transactions[0]?.amount}</Text>
         <View>
         <Text style={{top:4}}>          {data?.transactions[0]?.meta?.description}</Text>
         
         </View>
         <Text style={{top:4}}>    <TimeAgo time={data?.transactions[0]?.created_at} interval={2000} />  </Text>
        </View>
         </ScrollView>
      ) : (<Text></Text>)}
      </View>
)}
      </View>
    );
  }

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor:'white'
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#9ccc67',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily:'FontAwesome5_Solid'
  },
  wallet:{
    flexDirection:'row',
    borderWidth:0.3,
    borderColor:'#788693',
    justifyContent:'center',
    top:20,
    width:'90%',
    height:50,
    alignItems:'center',
    alignSelf:'center',
    
  },
  walletdes:{
    top:20,
    width:'90%',
    height:50,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor:'#efefef',
    justifyContent:'space-around',
    top:60
  }
});