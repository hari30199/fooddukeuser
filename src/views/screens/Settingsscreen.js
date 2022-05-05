import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { removeBookmark } from '../../../Redux/Actions';

export default function BookmarksList() {
  const { bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  const renderItem = ({ item }) => {
    return (
       <View style={{width:'110%',height:120,backgroundColor:'white',flexDirection:'row'}}>
       
       <Image
        style={{ width: 93, height: 78,justifyContent:"center",top:20,left:10}}
        source={{uri: `https://demo.foodduke.com/meatapp/demo1/${item.image}`}}></Image> 
        <View>
        <Text style={styles.tiltle}>{item.name}</Text>
        <TouchableOpacity
                onPress={() => handleRemoveBookmark(item)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: 'red',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 20,
                  width: 20,
                  left:250
                }}
              >
                <MaterialCommunityIcons
                  color='#64676D'
                  size={24}
                  name='bookmark-remove'
                />
              </TouchableOpacity>
        <View style={{flexDirection:'row',top:20}}>
        <Text style={styles.tilt}>{item.rating}</Text>
        <Text style={styles.tilt}>{item.delivery_time}</Text>
        <Text style={styles.tilt}>{item.price_range}</Text>
        </View>
          </View> 
        
        
       </View>
    );
  };

  return (
    <SafeAreaView >
      <View >
        <Text style={{ color: 'black', fontSize: 22 }}>Favourites</Text>
        <View>
          {bookmarks.length === 0 ? (
            <Text style={{ color: '#64676D', fontSize: 18 }}>
              No Favourites
            </Text>
          ) : (
            <FlatList
              data={bookmarks}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              
            />
            
          )}
          
        </View>
        
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
 tiltle:{
  color:'black',
  fontSize:16,
  fontWeight:'bold',
  left:20,
  top:20
 },
 tilt:{
  color:'black',
  fontSize:16,
  left:20,
  margin:10,
  
 }

})