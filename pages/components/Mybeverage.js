import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
 
const Mybeverage = props => {
  return (
        <View style={{flex:1}}>
            <View style={{flex:1, align: 'left'}}>
                <TextInput
                style={{height: 50, borderColor: 'white', borderWidth: 3}}
                onChangeText={props.onChangeText}
                />
            </View>
            <View style={{flex:1, align: 'right'}}>
                <CheckBox
                right
                title='Add Item'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='black'
                checked={props.checked}
                onPress={props.customClick}
                />
            </View>
        </View>
        )
}