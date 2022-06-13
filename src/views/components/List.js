import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import BASEURL from '../../config'
const Item = ({ name, image,slug,id}) => {
  const navigation = useNavigation();
 
  return(
  <View style={styles.item}>
    <TouchableOpacity onPress={() =>
              navigation.navigate('Hoteldetails', {
                    id:id,
                    slug:slug,
                    name:name
                })
            }>
    <View style={{flexDirection:'row'}}>
    <Image style={{width:'26%',height:66, justifyContent:"center",borderRadius:20}}
    source={{
      uri: `${BASEURL}/${image}`
      }}></Image>
    <Text style={styles.title}>{name}</Text>
    </View>
    </TouchableOpacity>
   
    
  </View>
  )
};

// the filter
const List = (props) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
   
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item name={item.name} slug={item.slug} id={item.id} image={item.image}/>;
      
    }
    // filter of the name
    if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} slug={item.slug} id={item.id} image={item.image}/>;
    }
    // filter of the description
    
    
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />    
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
    backgroundColor:'white'
  },
  item: {
    margin: 16,
    paddingBottom:12,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    backgroundColor:'white'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    top:10,
    
  },
});