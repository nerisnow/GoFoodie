/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { Text,View,ImageBackground,TextInput} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import SQLite from 'react-native-sqlite-storage';

import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { CheckBox } from 'react-native-elements';

let db;

export default class Beverages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            checked:false,
            text: 'Enter Qty',
        };
  }

// componentDidMount() {
//   db = SQLite.openDatabase({ name: "food", createFromLocation: '~www/food.db' },
//   this.openSuccess, this.openError);
// }

// openSuccess() {
//         console.log("Database is opened");
// }

// openError(err) {
//         console.log("error: ", err);
// }

// db.transaction( tx => {
//   tx.executeSql('SELECT * FROM foodlist WHERE id=1', [], (tx, results) => {
//             console.log("Query completed");
//              var len = results.rows.length;
//            if (len > 0) {
//                 let row = results.rows.item(0);
//                 this.setState({itemName: row.name});
//                 this.setState({itemPrice: row.price});
//             }
//   });
// });

render(){

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <ImageBackground source={require('./beverages.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{flex:1,flexDirection:'column'}}>
              <TextInput style={{height: 50, borderColor: 'white', borderWidth: 3}}
              onChangeText={text => this.setState({quantity:text})}/>
              <CheckBox
                right
                title='Add Item'
                iconRight
                iconType='material'
                checkedIcon='clear'
                uncheckedIcon='add'
                checkedColor='black'
                checked={this.state.checked}
                onPress={() => this.setState({checked:!this.state.checked})}
              />
          </View>
          <Mybutton
            title="CHECK OUT"
            customClick={() => this.props.navigation.navigate('HomeS')}
          />
       </ImageBackground> 
      </View>
    );
  }
}