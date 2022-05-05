import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, Text, ScrollView,Image } from 'react-native';


export default function MyWallet (props){
    const {  navigation } = props ;
    const {orderid }  = props.route.params;
      return (
      <View style={styles.containerMain}>
      <View style={{backgroundColor:'white',flexDirection:'row',height:70,}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20,top:25}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        top:25,
        color:'black'
      }}>{orderid}</Text>
      </View>
        <ScrollView>
          <View style={{width:'94%',height:80,left:10,flexDirection:'row',borderBottomColor:'#57575730',borderBottomWidth:0.3}}>
              <View style={{width:'60%',height:300,left:10}}>
                  <Text style={{fontFamily:'FontAwesome5_Solid'}}>Order Placed Successfully</Text>
                  <Text style={{top:10,fontFamily:'FontAwesome5_Regular',width:'100%'}}>Waiting for the restaurant to confirm your order</Text>
              </View>
              <View style={{width:70,height:70,}}></View>
              <Image  style={{width:70,height:70,}} 
        source={{uri:'https://meatapp.smartstorez.com/assets/img/order-placed.gif' }} />
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <Text style={styles.textStyle}>Refresh order Status</Text>
        </View>
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
});