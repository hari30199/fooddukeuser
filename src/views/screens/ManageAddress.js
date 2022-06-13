import React, { useEffect, useState,useContext } from 'react';
import { FlatList, Text, View,StyleSheet,Button,RefreshControl,TouchableHighlight ,Image,ImageBackground } from 'react-native';
import { ScrollView,TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MenuProvider } from 'react-native-popup-menu';
import {Menu,MenuOptions,MenuOption,MenuTrigger,} from 'react-native-popup-menu';
import BASEURL from '../../config'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Delivery = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [items, setitems] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const token = userInfo.auth_token
  const userid =userInfo.id
  const {  navigation } = props
  const [refreshing, setRefreshing] = React.useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [scaleAnimationDialog, setScaleAnimationDialog] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setitems(true);
    setData(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);


const getaddress =() =>{
    fetch(`${BASEURL}/public/api/get-addresses?` ,
    {
      method: 'POST', 
        body:JSON.stringify({
        "token":token,
        "user_id":userid
        }) ,  
          headers: {
          'Content-Type': 'application/json',
           },
          })
          .then((response) => response.json())
          .then((json) => setData(json))
          .then((data) => JSON.stringify(data))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
          
  }
  useEffect(()=>{
    getaddress();
  },[])

  const deleteaddress = (id) =>{
    fetch(`${BASEURL}/public/api/delete-address?` ,
    {
      method: 'POST', 
        body:JSON.stringify({
        "token":token,
        "user_id":userid,
        "address_id":id
        }) ,  
          headers: {
          'Content-Type': 'application/json',
           },
          })
          .then((response) => response.json())
          .then((json) =>  setitems(json),getaddress())
          .then((items) => JSON.stringify(items))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
          // console.log(data)
  }
  const checkcartexist = (id) =>{
    const found = data.find(el => el.item_id === id); 
    if (!found)  
    return true
    else 
    return false
     }

  return (
     isLoading ?
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white',}}>
            <Image style={{width:250,height:250}}
             source={require('../../assets/loader.gif')} >
          </Image>
          </View>:
    <View style={{ flex: 1, }}>
       <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:25}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:25,
        color:'black'
      }}>Manage Address</Text>
  </View>
      <View style={{ flex: 1,flexBasis:'auto'}}>
        <ScrollView style={{marginBottom:10}}>
        {isLoading ? (
          <View style={{backgroundColor:'white'}}>
          <SkeletonPlaceholder>
                <View style={{ flexDirection: "row", alignItems: "center",margin:10 }}>
             <View style={{ width: 60, height: 60, borderRadius: 10 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 250, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
           <View
               style={{ left:10, marginTop: 6, width: 330, height: 50, borderRadius: 4 }}
             />
           <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
             <View style={{ width: 60, height: 60, borderRadius: 10 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 250, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
           <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
             <View style={{ width: 60, height: 60, borderRadius: 10 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 250, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
           <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
             <View style={{ width: 60, height: 60, borderRadius: 10 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 250, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
           <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
             <View style={{ width: 60, height: 60, borderRadius: 10 }} />
             <View style={{ marginLeft: 20 }}>
               <View style={{ width: 250, height: 20, borderRadius: 4 }} />
               <View
                 style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
               />
             </View>
           </View>
          
          </SkeletonPlaceholder>
          </View>
        ):(
          <View>
        
          <View>
          <ScrollView >
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id} 
          
            renderItem={({ index,item }) => (
                <View>
                <Text style={styles.address}>{item.address}</Text>
                {checkcartexist(item.id)?(
                //     <TouchableOpacity onPress={()=>deleteaddress(item.id)}>
                //     <View style={styles.container}> 
                //     <Text style={styles.delete}>delete</Text>
                //     </View>
                // </TouchableOpacity>
                <MenuProvider >
                <Menu >
                  <MenuTrigger   style={styles.delete} text='Delete' />
                  <MenuOptions customStyles={optionsStyles} >
                    <MenuOption  onSelect={()=>{deleteaddress(item.id),getaddress(),setLoading(true)}}>
                      <Text  style={{color: 'red'}}>Confrim Delete</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                </MenuProvider>
                 
                ):(
                  <Text></Text>
                )}
             
              </View>
            )}
            
          />
         
          </ScrollView>
        
        </View>
        
        </View>
        
        )}
        </ScrollView>
      
      </View>
     
      {/* fill space at the bottom*/}
      <View style={{ justifyContent: 'flex-end' }} />
            <View style={styles.bottomView}>
                 <TouchableOpacity onPress={()=>navigation.navigate('LocationView')}>
        <Text style={styles.textStyle}>Add New Address</Text>
        </TouchableOpacity> 
          </View> 
    </View>
  );
};
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
    },
     address:{
         fontSize:16,
         backgroundColor:'white',
         margin:10,
         borderRadius:10,
         padding:10
     } ,
     bottomView: {
      width: '100%',
      // left:10,
      height: 50,
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
      // position: 'absolute',
      bottom: 0,
      // flex:1,
      // borderRadius:10,
      
    },
    textStyle: {
      color: '#fff',
      fontSize: 18,
    },
     delete:{
         fontSize:14,
         color:'white',
         backgroundColor:'orange',
         padding:10,
         borderRadius:5,
         width:70,
         left:10,
        //  right:16,
         paddingLeft:14,
         textAlign:'center',
        //  alignSelf:'flex-end'
     }
      
      });
      const optionsStyles = {
        optionsContainer: {
          padding: 5,
        },
        optionWrapper: {
          margin: 5,
        },
        optionTouchable: {
          activeOpacity: 70,
        },
        optionText: {
          color: 'brown',
          
        },
      };

export default Delivery;
