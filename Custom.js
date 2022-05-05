import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 32,
        width: '50%',
        backgroundColor: 'white',
        borderRadius: 30,
        borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'flex-end',
        right:40
      }}>
      <TouchableOpacity
      
        onPressIn={() => updateSwitchData(1)}
        style={{
          width:'100%',
          backgroundColor: getSelectionMode == 1 ? 'orange' : 'white',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : 'black',
            fontSize: 14,
            fontFamily: 'Roboto-Medium',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       
        onPressIn={() => updateSwitchData(2)}
        style={{
          width:'100%',
          backgroundColor: getSelectionMode == 2 ? 'orange' : 'white',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : 'black',
            fontSize: 14,
            fontFamily: 'Roboto-Medium',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}