import React,{useEffect} from "react";
import { StyleSheet, TextInput, View,Text, Keyboard, Button, Touchable } from "react-native";
import  Entypo  from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused,useNavigation  } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = (props) => {
  const navigation = useNavigation()
  const isFocused = useIsFocused();
  useEffect(()=>{
    isFocused ? (!Keyboard.dismiss()):('SearchBar.show')
  },[])

  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Icon
          name="search"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Search for shops.."
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
          ref={(ref) => {

            if( ref !== undefined && ref && !ref.isFocused() ){

                ref.focus();
            }
        }}
          autoFocus={false}
        />
        
        {props.clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("")
          }}/>
        )}
      </View>
     
      {props.clicked && (
        <View>
          <TouchableOpacity  onPress={() => {
             navigation.navigate('Near Me')
            }}>
            <Text style={{fontSize:20,
              backgroundColor:'white',
              padding:10,
              }}>Cancel</Text>
          </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor:'white'
  },
  searchBar__unclicked: {
    
    flexDirection: "row",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    
    flexDirection: "row",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    borderBottomWidth:1,
    borderBottomColor:'#5757574f'
  },
});