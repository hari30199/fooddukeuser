import React, {useContext,useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View,Image,Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../../AuthContext';
import { useNavigation } from '@react-navigation/native';
import {  Overlay } from 'react-native-elements';
import BASEURL from '../../config'
const Notification = ({ navigation: { navigate } }) => {
  const navigation = useNavigation();
  const {userInfo, isLoading, logout,signOut} = useContext(AuthContext);
  const [showBox, setShowBox] = useState(true);
  const [data, setdata] = useState(['']);
  const [visible, setVisible] = useState(false);
 
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  
  return (
    isLoading ? 
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Image style={{width:250,height:250}}
     source={require('../../assets/loader.gif')} >
  </Image>
  </View>:
    <ScrollView style={{flex:1,backgroundColor:'#d9d9d9'}}>
    <View style={styles.container}>
      <View style={{width:'100%',alignItems:'center', height:200,backgroundColor:'#f8f9fa',flexDirection:'row',justifyContent:'space-around'}}>
       <View>
       <Text style={{fontSize:24,fontWeight:'bold',color:'black'}}>{userInfo.name}  </Text>
      <Text style={{fontSize:16,top:8,color:'#6c757d'}} >(+91){userInfo.phone} </Text>
      <Text style={{fontSize:16,top:8,color:'#6c757d'}}>{userInfo.email}  </Text>
       </View>
       <View style={{width:100,height:100}}> 
       <Image 
          style={{ width: '90%', height: 140,bottom:24}}
          source={{
            uri:`${BASEURL}/assets/img/various/avatars/user5.gif`
          }}
          
        />
       </View>
      </View>
      <View style={styles.account}>
       <Text style={{top:30,left:26,fontWeight:'bold',color:'black'}} >My Account</Text>
       
      <View style={{flexDirection:'row',
      width:'100%',
      flexWrap:'wrap',
      left:20,
      top:30,justifyContent:'center'
      }}>
        <View style={styles.word}>
          <TouchableOpacity style={{bottom:4}} onPress={()=>navigation.navigate('ManageAddress')}>
            <View>
            <Image 
       style={{width:30,height:30,alignSelf:'center'}}
       source={require('../../assets/eaddress.png')}
       ></Image>
            </View>
      
          <Text style={styles.wordtext}>Manage Address</Text>
          </TouchableOpacity>
         
        </View>
        <View style={styles.word}>
        <TouchableOpacity style={{bottom:4}} onPress={()=>navigation.navigate('Myorders')}>
       <Image 
       style={{width:30,height:30,alignSelf:'center'}}
       source={require('../../assets/Myorders.png')}
       ></Image>
          <Text style={styles.wordtext}>My Orders</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.word}>
        <TouchableOpacity style={{bottom:4}} onPress={()=>navigation.navigate('MyWallet')}>
       <Image 
       style={{width:30,height:30,alignSelf:'center'}}
       source={require('../../assets/MyWallet.png')}
       ></Image>
          <Text style={styles.wordtext}>My Wallet</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.word}>
        <TouchableOpacity style={{bottom:4}} onPress={()=>navigation.navigate('Favourites')}>
       <Image 
       style={{width:32,height:32,alignSelf:'center'}}
       source={require('../../assets/favorite.png')}
       ></Image>
          <Text style={styles.wordtext}>My Favourites</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
 
</View>
<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            
            
            <Text style={{padding:20}}>
             Are you sure to logout
            </Text>
            
            <View style={{alignItems:'center',height:'auto'}}>
            <TouchableOpacity style={{}} onPressIn={logout}>
                <Image
                style={{width:40,height:40,padding:10}}
                source={require('../../assets/logout.png')}
                ></Image>
                  </TouchableOpacity>
                  </View>
                 
             <View style={{top:6,padding:20}}> 
             <Button
          
          icon={
            <Icon name="logout"  size={14} />
          }
          title="Logout"
          onPress={logout}
        />
                </View>   
            
          
           
          </Overlay>
<View style={{width:'100%',height:230,top:40}}>
      <Text style={{top:6,left:26,fontWeight:'bold',fontFamily:'FontAwesome5_Regular',color:'black'}}>Help & FAQs</Text>
      <View style={{top:20,flexWrap:'wrap',}}>
        <TouchableOpacity style={styles.helpsec}>
        <Text style= {{color:'black'}}>Shipping & Returns</Text>
        </TouchableOpacity>
     
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>Privacy Notice</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>Conditions of use</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>Payment Info</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>About us</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>Contact us</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>FAQ</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.helpsec}>
      <Text style= {{color:'black'}}>Disclaimer</Text>
      </TouchableOpacity>
    
      </View>

    </View>
    
      <View style={{width:'100%',height:200,top:40}}>
        <View style={styles.log}>
      
    <TouchableOpacity onPress={toggleOverlay}> 
          <Text style={styles. logout}><Icon name="logout"  size={14} />   Logout</Text>
      </TouchableOpacity>
 
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  welcome: {
    fontSize: 18,
    top:40,
    left:20
  },
  head:{
    bottom:120,
      width:'100%',
      height:170,
      backgroundColor:"white"
  },
  logout:{
      color:'white',
      fontWeight:'bold'
  },
  log:{
      width:'86%',
      height:50,
      backgroundColor:"#ff5959",
      justifyContent:'center',
      alignItems:'center',
      left:26,
      borderRadius:4,
      top:70,
      borderWidth:0.3,
      borderColor:'#57575730'
  },
  account:{
      width:'100%',
      // height:,
    
  },
  myacc:{
      flexDirection:'row',
      top:40,
      
  },
  options:{
  backgroundColor:'white',
  width:'26%',
  height:80,
  left:10,
  margin:10,
  fontSize:12,
  // top:20
},
option:{
backgroundColor:'white',
width:'26%',
height:80,
left:10,
margin:10,
top:70,
fontSize:12,
},
txt:{
  fontSize:12,
  fontWeight:'bold',
  top:70,
  textAlign:'center'
},
gridView: {
  marginTop: 40,
},
itemContainer: {
  justifyContent: 'flex-end',
  borderRadius: 5,
  padding: 10,
  height: 110,
  alignItems:'center',
},
itemName: {
  fontSize: 12,
  fontWeight: 'bold',
},
itemCode:{
  justifyContent:'center',
  alignItems:'center',
  bottom:10
},
avatar:{
  alignItems:'flex-end',
  right:20
},
card:{
  width:'90%',
  backgroundColor:'white',
  height:100,
  margin:5,
  borderRadius:10,
  textAlign:'center'
},
grid:{
  top:30,
  flexDirection:'row',
  width:100,
  left:20,
  height:100
},
word:{
  width:'40%',
  height:100,
  backgroundColor:'white',
  margin:14,
  justifyContent:'center',
  right:20,
  alignItems:'center',
  marginTop:30,
  borderRadius:4
},
wordtext:{
  textAlign:'center',
  fontSize:14,
  marginTop:12,
  color:'#282c3f',
  fontFamily:'FontAwesome5_Brands'
},
helpsec:{
  fontSize:16,
  // fontFamily:'FontAwesome5_Brands',
  // fontWeight:'bold'
  color:'black',
  fontWeight:'400',
  backgroundColor:'white',
  // width:170,
  padding:12,
  borderWidth:0.3,left:22,
  borderColor:'#57575730',margin:5,borderRadius:4
}

  
});

export default Notification;