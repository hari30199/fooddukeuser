// import React, { Component } from "react";
// import Products from '../../components/Products';
// import { Food } from '../../components/Data'
// import { connect } from 'react-redux'
// import {SafeAreaView, StyleSheet, View,Button, Text, Image,TouchableOpacity,ImageBackground} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// // import Icon from 'react-native-vector-icons/MaterialIcons';


// class aaaa extends Component {
//     // const { route, navigation } = props
  
//     render() {
//         return (
//             <SafeAreaView>
//             <View style={styles.head}>
                
//               {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{left:30}} /> */}
              
//               <Text style={{fontSize: 20, fontWeight: 'bold',left:28}}>Viewall</Text>
//             </View>
//             <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={styles.categories} >
             
            
//              </View>
//              <View style={styles.container}>
//                 <Products products={Food} onPress={this.props.addItemToCart} />
//                 <Button podr={Food} onPress={this.props.addItemToCart} title="hello"/>
                
//             </View>
//             {/* <View style={styles.container}>
//                 <Products products={Food} onPress={this.props.RemoveFromCart} />
                
//             </View> */}
//             {/* <Button onPress={this.props.addItemToCart} title='press'></Button> */}
        
            
//             </ScrollView>
            
//           </SafeAreaView>
            
//         );
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
//         // RemoveFromCart: (product) =>dispatch({type: 'REMOVE_FROM_CART',payload:product})
//     }
// }


// export default connect(null, mapDispatchToProps)(aaaa);



//    const styles = StyleSheet.create({
//   head:{
//       backgroundColor:'#59d6ff',
//       paddingVertical: 20,
//       flexDirection: 'row',
//       alignItems: 'center',
//       width:'100%'
//   },
//   categories:{
//     width:'100%',
//     height:"auto",
// },
// categoriesname:{
//     width:'100%',
//     height:40,
    
// },
// catname:{
//     fontSize:16,
//     marginTop:10,
//     fontWeight:'bold',
//     color:"black",
//     left:20
// },
// fhotel1:{
//     width:"90%",
//     height:120,
//     backgroundColor:"white",
//     borderRadius:10,
//     marginTop:10,
//     flexDirection:"row",
//     left:20
// },
// fhotelimg:{
//     width:"25%",
//     height:85,
//     borderRadius:10,
//     marginLeft:15,
//     marginTop:14,
//     alignItems:"center",
//     justifyContent:"center"
// },
// fhoteltitle:{
//     width:"70%",
//     height:120, 
    
// },
// htitle:{
//     marginTop:14,
//     marginLeft:10,
//     fontWeight:"bold",
//     fontSize:16,
//     color:"black" 
// },
// hdes:{
//     marginLeft:10,
//     color:"grey",
//     fontSize:12,
//     marginTop:6,
// },
// hdetails:{
//     width:"95%",
//     height:50,
//     marginTop:8,
//     marginLeft:10,
//     borderTopColor: '#cfcfcf',
//     borderTopWidth: 0.3,
//     flexDirection:"row",
//     alignItems:'center',
//     justifyContent:"center"

// },
// hrate:{
//     width:"28%",
//     height:26,
//     borderRightColor: '#cfcfcf',
//     borderRightWidth: 0.3,
//     alignItems:"center",
//     paddingTop:6,
//     flexDirection:"row",
//     fontSize:14,
//     color:"#7F7F7F",
//     justifyContent:"center"
// },
// hdist:{
//     width:"100%",
//     height:26,
//     alignItems:"center",
//     flexDirection:"row",
//     fontSize:14,
//     color:"#7F7F7F",
//     alignItems:"center",
//     justifyContent:"center"
// },
// hprice:{
//     width:"42%",
//     height:26,
//     alignItems:"center",
//     flexDirection:"row",
//     justifyContent:'center',
//     color:"#7F7F7F",
//     right:8,
// },
// rating:{
//     right:10,
//     bottom:2
// }

// });


import React, { Component } from 'react';
import { Button, View, Text,StyleSheet,ImageBackground,Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
class Location extends Component {

  constructor() {
    super();
  }

  render() {  
    
    const {  name,description,rating,distance,price_range,userLocation } = ('userLcation');
    
    return (
      <View style={{ flex: 1,backgroundColor:'white' , }}>
          <Text style={styles.htitle} >{userLocation}</Text>
        


      </View>
    );
  }
}
const styles = StyleSheet.create({
  head:{
      backgroundColor:'White',
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      width:'100%'
  },
  categories:{
    width:'100%',
    height:"auto",
},
categoriesname:{
    width:'100%',
    height:40,
    
},
catname:{
    fontSize:16,
    marginTop:10,
    fontWeight:'bold',
    color:"black",
    left:20
},
fhotel1:{
    width:"90%",
    height:120,
    backgroundColor:"white",
    borderRadius:10,
    marginTop:10,
    flexDirection:"row",
    left:20
},
fhotelimg:{
    width:"25%",
    height:85,
    borderRadius:10,
    marginLeft:15,
    marginTop:14,
    alignItems:"center",
    justifyContent:"center"
},
fhoteltitle:{
    width:"70%",
    height:120, 
    
},
htitle:{
    marginTop:14,
    marginLeft:10,
    fontWeight:"bold",
    fontSize:16,
    color:"black" 
},
hdes:{
    marginLeft:10,
    color:"grey",
    fontSize:12,
    marginTop:6,
    height:16,
},
hdetails:{
    width:"95%",
    height:50,
    marginTop:4,
    marginLeft:10,
   
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"center"

},
hrate:{
    width:"24%",
    height:26,
    alignItems:"center",
    paddingTop:6,
    flexDirection:"row",
    fontSize:14,
    color:"#7F7F7F",
    justifyContent:"center",
    left:20
},
hdist:{
    width:"34%",
    height:26,
    alignItems:"center",
    flexDirection:"row",
    fontSize:14,
    color:"#7F7F7F",
    alignItems:"center",
    justifyContent:"center",
},
hprice:{
    width:"42%",
    height:26,
    alignItems:"center",
    flexDirection:"row",
    justifyContent:'center',
    color:"#7F7F7F",
    left:34
},
rating:{
    right:10,
    bottom:2
},
search:{
  width:'90%',
  height:42,
  backgroundColor:'white',
  left:20,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#d4d4d4',
  top:10
}

});

export default Location;


