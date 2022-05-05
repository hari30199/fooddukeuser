import React, { useEffect, useState,useContext } from 'react';
import {StyleSheet,Text,View, Image,ScrollView,TouchableOpacity ,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SvgUri } from 'react-native-svg';
import zIndex from '@material-ui/core/styles/zIndex';
export default function Curtaincarousel (props) {
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  // const url = `https://meatapp.smartstorez.com`
  // console.log (data);

   useEffect(() => {
    fetch('https://demo.foodduke.com/public/api/get-menu-categories',{
      method:'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify()
    })
      .then((response) =>(response.json()))
      .then((json) =>  setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      // console.log(data)
  }, []);
  

  
  
  return (

    <View >
      {isLoading ? 
        <SkeletonPlaceholder>
        <View style={{flexDirection:'row'}}>
        <View style={{margin:10}}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 70, height: 20, borderRadius: 4 }}
            />
        </View>
        <View style={{margin:10}}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 70, height: 20, borderRadius: 4 }}
            />
        </View>
        <View style={{margin:10}}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 70, height: 20, borderRadius: 4 }}
            />
        </View>
        <View style={{margin:10}}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ top:10 }}>
          </View>
           <View
              style={{ marginTop: 6, width: 70, height: 20, borderRadius: 4 }}
            />
        </View>
        </View>
      </SkeletonPlaceholder>
      : 
      ( <View >
         <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={( item , index) => item.id }
            renderItem={({ item }) =>(
              <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('FiltersScreen', {
                                    itemsid:[item.id]
                                })
                            }
                        >
                            <View style={styles.catcard}>
                            {/* <SvgUri
                             width="60%"
                             height="60%"
                             uri={`https://demo.foodduke.com/${item.image}`}
                            /> */}
        <Image style={{width:50,height:56,borderRadius:50}} source={{uri:`https://demo.foodduke.com/${item.image}`}}/>
        <Text style={styles.text}>{item.name}</Text>
        
            </View>
                      </TouchableOpacity>
              
      )}
          /> 
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({

      catcard:{
        height:100,
        width:88,
        margin: 8,
        justifyContent:'center',
        borderRadius:5,
        alignItems:'center',
        bottom:20,
       
      },
      text:{
        color:'white',
        width:86,
        textAlign:'center',
        fontSize:14,
        backgroundColor:'#87c200',
        borderRadius:18,
        height:26,
        top:10,
        textAlign:'center',
        paddingTop:3,
        color:'white',
      }
});
