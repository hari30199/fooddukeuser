import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity,ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
// import {SecondaryButton} from '../components/Button';

const ViewallScreens = (props) => {
    const { route, navigation } = props

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={styles.head}>
          
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} style={{left:30}} />
        
        <Text style={{fontSize: 20, fontWeight: 'bold',left:28}}>Viewall</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.categories} >
       
          
       <View style={styles.fhotel}>
       < TouchableOpacity
       onPress={() => navigation.navigate('DetailsScreen')}
       >

           <View style={styles.fhotel1} >
               <View style={styles.fhotelimg} >
              
               </View>
               <View style={styles.fhoteltitle} >
                   <Text style={styles.htitle} >Great Hotel</Text>
                   <Text style={styles.hdes} >Lorem ipsum is typically corrupted version.. </Text>
                   <View style={styles.hdetails}  >
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 12,justifyContent:"center",alignItems:"center",left:15}}
                        source={require('./header components/image/Icon awesome-star.svg')}></Image> */}
                        <Text style={styles.rating}>5</Text></View>
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center",bottom:4}}
                        source={require('./header components/image/Loaction (1).svg')}></Image> */}
                        <Text style={styles.hdist}> 2  km</Text></View>
                       <View style={styles.hprice} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center"}}
                        source={require('./header components/image/Path 858.svg')}></Image>*/}
                        <Text> 200 for two</Text></View> 
                   </View>
                   </View>

               </View>
               </TouchableOpacity>
               
           </View>
           < TouchableOpacity
       keyboardShouldPersistTaps='always'
       onPress={() => navigation.navigate('DetailsScreen')}
       >
           <View style={styles.fhotel1} >
               <View style={styles.fhotelimg} >
               
               </View>
               <View style={styles.fhoteltitle} >
                   <Text style={styles.htitle} >Queen Hotel</Text>
                   <Text style={styles.hdes} >Lorem ipsum is typically corrupted version.. </Text>
                   <View style={styles.hdetails}  >
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 12,justifyContent:"center",left:15}}
                        source={require('./header components/image//Icon awesome-star.svg')}></Image> */}
                        <Text style={styles.rating}>5</Text></View>
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center",bottom:4}}
                        source={require('./header components/image/Loaction (1).svg')}></Image> */}
                        <Text style={styles.hdist}> 2 km</Text></View>
                       <View style={styles.hprice} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center"}}
                        source={require('./header components/image/Path 858.svg')}></Image> */}
                        <Text> 200 for two</Text></View>
                   </View>
               </View>
               
           </View>
           </TouchableOpacity>
           <View style={styles.fhotel1} >
               <View style={styles.fhotelimg} >
               
               </View>
               <View style={styles.fhoteltitle} >
                   <Text style={styles.htitle} >Grand Hotel</Text>
                   <Text style={styles.hdes} >Lorem ipsum is typically corrupted version.. </Text>
                   <View style={styles.hdetails}  >
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 12,justifyContent:"center",left:15}}
                        source={require('./header components/image/Icon awesome-star.svg')}></Image> */}
                        <Text style={styles.rating}>5</Text></View>
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center",bottom:4}}
                        source={require('./header components/image/Loaction (1).svg')}></Image> */}
                        <Text style={styles.hdist}> 2 km</Text></View>
                       <View style={styles.hprice} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center"}}
                        source={require('./header components/image/Path 858.svg')}></Image> */}
                        <Text> 200 for two</Text></View>
                   </View>
               </View>
               <View>
               < TouchableOpacity
       keyboardShouldPersistTaps='always'
       onPress={() => navigation.navigate('DetailsScreen')}
       >
               <View style={styles.fhotel1} >
               <View style={styles.fhotelimg} >
              
               </View>
               <View style={styles.fhoteltitle} >
                   <Text style={styles.htitle} >Queen Hotel</Text>
                   <Text style={styles.hdes} >Lorem ipsum is typically corrupted version.. </Text>
                   <View style={styles.hdetails}  >
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 12,justifyContent:"center",left:15}}
                        source={require('./header components/image//Icon awesome-star.svg')}></Image> */}
                        <Text style={styles.rating}>5</Text></View>
                       <View style={styles.hrate} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center",bottom:4}}
                        source={require('./header components/image/Loaction (1).svg')}></Image> */}
                        <Text style={styles.hdist}> 2 km</Text></View>
                       <View style={styles.hprice} >
                       {/* <Image
                        style={{ width: 13, height: 15,justifyContent:"center"}}
                        source={require('./header components/image/Path 858.svg')}></Image> */}
                        <Text> 200 for two</Text></View>
                   </View>
                   
               </View>
               </View>
               </TouchableOpacity>
                 
               </View>
              
           
           
       </View>
       </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head:{
      backgroundColor:'#59d6ff',
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
},
hdetails:{
    width:"95%",
    height:50,
    marginTop:8,
    marginLeft:10,
    borderTopColor: '#cfcfcf',
    borderTopWidth: 0.3,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"center"

},
hrate:{
    width:"28%",
    height:26,
    borderRightColor: '#cfcfcf',
    borderRightWidth: 0.3,
    alignItems:"center",
    paddingTop:6,
    flexDirection:"row",
    fontSize:14,
    color:"#7F7F7F",
    justifyContent:"center"
},
hdist:{
    width:"100%",
    height:26,
    alignItems:"center",
    flexDirection:"row",
    fontSize:14,
    color:"#7F7F7F",
    alignItems:"center",
    justifyContent:"center"
},
hprice:{
    width:"42%",
    height:26,
    alignItems:"center",
    flexDirection:"row",
    justifyContent:'center',
    color:"#7F7F7F",
    right:8,
},
rating:{
    right:10,
    bottom:2
}

});

export default ViewallScreens;
