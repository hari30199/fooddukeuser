import React from 'react';
import {FlatList,Image,StyleSheet,Text,View,} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';



 const Favourites = () => {
  const route = useRoute();
  const { favoriteList } = route.params;
  return (
    <FlatList
      data={favoriteList}
      renderItem={({ item }) => {
        return (
          <View style={styles.listContainer}>
            <View>
              <Image
                source={{ uri: item['image'] }}
                style={styles.image}
                resizeMode='cover'
              />
            </View>
            <View style={styles.listContainer}>
              <View style={styles.row}>
                <Text
                  style={styles.text}
                  allowFontScaling={true}
                  numberOfLines={1}
                >
                  {item && item['name']}
                </Text>
                <MaterialIcons name='brunch-dining' size={24} color={'#444'} />
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#edf2fb'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    opacity: 0.7
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontColor: '#010101'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  header: {
    alignItems: 'center'
  }
});
export default Favourites;