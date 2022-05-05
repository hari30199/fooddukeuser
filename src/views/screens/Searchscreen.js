import React, { useState, useEffect,useContext } from "react";
import {StyleSheet,Keyboard,Text,SafeAreaView,ActivityIndicator,View,Image} from "react-native";
import { AuthContext } from '../../../AuthContext';
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [Loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [data, setdata] = useState();
  const [myloc,setmyloc] = useState("");
  const [myloct,setmyloct] = useState("");
  
  const {userInfo,userinfo,isLoading} = useContext(AuthContext);

  useEffect(() => {
    _retrieveData()
   }, [myloc])
  
 const _retrieveData = async () => {
   try {
     const value = await AsyncStorage.getItem('myloc')
     if(value !== null) {
     }
     setmyloc(value)
     
   } catch(e) {
   }
 }
 useEffect(() => {
  retrieveData()
 }, [myloct])
 
const retrieveData = async () => {
 try {
   const value = await AsyncStorage.getItem('myloct')
   if(value !== null) {

   }
   setmyloct(value)
   
 } catch(e) {

 }
}
var i = 0
const lat = userinfo[i] == null ? (myloct ):((userinfo[0].latitude))
const long =userinfo[i] == null  ? (myloc):((userinfo[0].longitude))

 
    const getData = async () => {
      fetch(`https://demo.foodduke.com/public/api/search-restaurants?latitude=${myloct}&longitude=${myloc}`,{
            method:'POST'
        }
      )
      .then((response) =>(response.json()))
      .then((result) => {
        setdata(result.restaurants);
        
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      
    };
    const oflinedata = async () => {
        fetch(`https://demo.foodduke.com/public/api/search-restaurants?latitude=${lat}&longitude=${long}`,{
              method:'POST'
          }
        )
        .then((response) =>(response.json()))
        .then((result) => {
          setdata(result.restaurants);
          
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
        
      };
    {userInfo.auth_token ? (
        useEffect(()=>{
          getData();
        },[lat,long])
      ):(
        useEffect(()=>{
          oflinedata();
        },[myloct,myloc])
      )}


  return (
    <View style={{height:1000,backgroundColor:'white'}}>
    <SafeAreaView style={styles.root}>
      {!clicked }

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!data ? (
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <Image style={{width:250,height:250}}
             source={require('../../assets/loader.gif')} >
          </Image>
          </View>
      ) : (
       searchPhrase == '' ?(
          <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width:390,height:340,top:70}} source={{uri:('https://demo.foodduke.com/assets/img/various/explore-bg.png')}}></Image>
          </View>
       ):(
        <List
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
       />
       )
         
        
      )}
    </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    // top:20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});