/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import firebase from 'react-native-firebase';
import { FlatList,Text,Button,View,ImageBackground,TextInput} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Item from './Item';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { CheckBox } from 'react-native-elements';

export default class Foods extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('food-items');
    this.unsubscribe = null;
    this.state = {
      textInput: '',
            items: []
        };
  }

updateTextInput(value) {
  this.setState({textInput: value});
}

addItem(){
  this.ref.add({
    name:this.state.textInput,
    price: 0,
  });

  this.setState({
    textinput:'',
  });
}

componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
}

componentWillUnmount() {
    this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  const items = [];
  querySnapshot.forEach((doc) => {
    const { name, price } = doc.data();
    
    items.push({
      key: doc.id,
      doc, // DocumentSnapshot
      name,
      price,
    });
  });

  this.setState({ 
    items,
    loading: false,
 });
}

renderSeparator = () => {
return (
<View
  style={{
    height: 2,
    width: "100%",
    backgroundColor: "#CED0CE",
    
     }}
/>
);
};

render(){

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <ImageBackground source={require('./foods.jpg')} style={{width: '100%', height: '100%'}}>
          <View style={{flex:1,flexDirection:'column'}}>
              <FlatList
                data={this.state.items}
                renderItem={({ item }) => <Item {...item} />}
               
              />
              {/*<TextInput
                  placeholder={'Add Item'}
                  value={this.state.textInput}
                  onChangeText={(text) => this.updateTextInput(text)}
              />
              <Button
                  title={'Add Item'}
                  disabled={!this.state.textInput.length}
                  onPress={() => this.addItem()}
              />*/}
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