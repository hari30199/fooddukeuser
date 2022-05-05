
import React from 'react';
import {TouchableOpacity,StyleSheet,View,Text,} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Searchdrop(props) {
    const navigation = useNavigation();
    const { dataSource } = props
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}>

            <View style={styles.subContainer}>
                {
                    dataSource.length ?

                        dataSource.map(item => {
                            return (
                                <TouchableOpacity style={{width:'90%',right:20,}} onPress={() => navigation.navigate('DetailsScreen')}>
                                <View style={styles.itemView}>
                                   
                                    <Text style={styles.itemText}>
                                        
                                            {item}
                                            
                                            </Text>
                                           
                                </View>
                                </TouchableOpacity>
                            )
                        })

                        :
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No search items matched</Text>
                        </View>
                }

            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:100,
        zIndex:10
    },
    subContainer: {
        width:'100%',
        paddingTop: 20,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        position:'absolute',
    },
    itemView: {
        marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 44,
        width: '100%',
        justifyContent: 'center',
        top:55,
        right:14,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor:'white',
        top:36,
        height:60
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'violet',
      
    },

});