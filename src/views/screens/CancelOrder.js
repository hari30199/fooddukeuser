import React, { useEffect, useState,useContext,useRef } from 'react';
import {Text,FlatList, View,StyleSheet,Image,ImageBackground,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../AuthContext';
import  CheckBox  from '@react-native-community/checkbox';
import { Card } from 'react-native-paper';


const data = [
    { id: 1, txt: 'I want to change myphone number', isChecked: false },
    { id: 2, txt: 'I have change my mind', isChecked: false },
    { id: 3, txt: 'I want to change address for the order', isChecked: false },
    { id: 4, txt: 'I have purchased the product elsewhere', isChecked: false },
    { id: 5, txt: 'Other reasons', isChecked: false },
  ];

export default function CancelOrder (props) {
    const {  navigation } = props ;
    const [isLoading, setLoading] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const [result, setresult] = useState(false);
    const { id} = props.route.params;
    const {userInfo} = useContext(AuthContext);
    const [products, setProducts] = useState(data);

    const handleChange = (id) => {
        let temp = products.map((product) => {
          if (id === product.id) {
            return { ...product, isChecked: !product.isChecked };
          }
          return product;
        });
        setProducts(temp);
      };
    
      let selected = products.filter((product) => product.isChecked);

      const renderFlatList = (renderData) => {
        return (
          <FlatList
            data={renderData}
            renderItem={({ item }) => (
              <Card style={{ margin: 5 }}>
                <View style={styles.card}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      padding:5,
                      margin:5,
                      alignItems:'center'
                    }}>
                    <CheckBox
                      value={item.isChecked}
                      onChange={() => {
                        handleChange(item.id);
                      }}
                    />
                    <Text>{item.txt}</Text>
                  </View>
                </View>
              </Card>
            )}
          />
        );
      };


      const cancelorder = () => {
          if (selected == '')
          return  alert ('Please select a valid reason')
          else  Cancelorder ()
      }  
        
    const Cancelorder = () =>{
        const orderid = id
        const token = userInfo.auth_token
        const user_id = userInfo.id
        const reason = selected[0].txt
        console.log(reason)
        console.log(orderid)
        if (selected[0].txt == '')
        return 
        else
          fetch(`https://demo.foodduke.com/public/api/cancel-order` ,
          
            {
              method: 'POST', 
                   
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({
                      "token":token,
                      "user_id": user_id,
                      "order_id": orderid,
                      "reason":reason
                    })
                  })
                
                  .then((response) =>(response.json()))
                  .then((result) => {
                    console.log(result)
                    setresult(result),
                    confirmation()
                  })
                  .catch((error) => console.error(error))
                  .finally(() => setLoading(false));
                //   console.log(result.success)
                }
    const confirmation = () =>{
        if (result.success != true)
        return alert("Order Canceled successfull"), navigation.navigate('Myorders')
    }


    return(
        <View style={{backgroundColor:'white',flex:1}}>
        <View style={{backgroundColor:'white',flexDirection:'row',height:50}}>
        <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:15}} />
        <Text style={{
          fontSize:18,
          fontWeight:'500',
          left:40,
          top:15,
          color:'black'
        }}>CANCEL ORDER</Text>
       
        </View>
        <View style={{alignItems:'center'}}>
        <View style={{top:80 }}>{renderFlatList(products)}</View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPressIn={()=>cancelorder()}>
            <Text style={{color:'red',borderWidth:0.3,padding:8,borderColor:'red',width:100,bottom:260}}>Cancel Order</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
      justifyContent:'center',
      alignItems:'center',
    },
    checkbox: {
      alignSelf: "center",justifyContent:'center',
    },
    label: {
      margin: 8,
    },
  });
