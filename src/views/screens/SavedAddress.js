import React, { useEffect, useState,useContext } from 'react';
import { FlatList, Text, View,StyleSheet,Image,ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { AuthContext } from '../../../AuthContext';
import LocationView from './LocationView';
import BASEURL from '../../config'
const Delivery = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setdata] = useState([]);
  const navigation = useNavigation();
  const {userInfo} = useContext(AuthContext);
  
  var token = userInfo.auth_token
  let user_id =userInfo.user_id
  // console.log(token)
  
    let fetchData = async () => {
      await fetch(`${BASEURL}/public/api/get-addresses?token=${token}&user_id=${user_id}`,{
        method:'POST',
        headers: {
          'Content-Type': 
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => setdata(json))
      .then((data) => JSON.stringify(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    };

 
  
  useEffect(() => {
    fetchData();
  }, []);
  

  

const fetchdata = async () => {
  const response = await axios.post(
    `${BASEURL}/public/api/delete-address?token=${token}&address_id=${450}`
  );

  console.log(response.data)
};

  var count = Object.keys(data). length;
  return (
    <ScrollView>
     
      <View>
        {isLoading ? <Text style={{color:'orange',top:20}}>Working on it...</Text>:(
         <View style={styles.categories}>
         {count == 0 ? (<LocationView/>) : 
         ( 
           <View>
              <Text style={{fontWeight:'bold',fontSize:16,left:20}}>Saved Address</Text>
              {Object.entries(data).map(([key,value])=> {
                  
                    //  console.log(value.id)
                   return(
                     <View>
                      <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Near Me', {
                                 
                                })
                            }
              >
             <Text style={styles.add}>{value.address}</Text>
              </TouchableOpacity>
                    
                     <Text style={styles.add}>{value.id}</Text>
                     <TouchableOpacity >
                     <Text style={{fontWeight:'bold',fontSize:16,color:'red',left:20}}>Delete</Text>
                     
                     </TouchableOpacity>
                    
                     </View>
                     
                   ); 
             })}
           </View>
         )}
         <TouchableOpacity onPress={() => navigation.navigate('LocationView')}>
         <Text >Select New Address</Text>
         
        
         </TouchableOpacity>
         
       </View>
        )}
    
    </View>
    </ScrollView>
  );
  
};
const styles = StyleSheet.create({
          categories:{
              width:'100%',
              height:'auto',
              
          },
          add:{
            width:'90%',
            backgroundColor:'white',
            borderRadius:10,
            left:20          
          }
          
      
      });

export default Delivery;
