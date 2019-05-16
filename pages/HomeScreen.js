/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { Text,View,ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <ImageBackground source={require('./circle.png')} 
        style={{width: '100%', height: '100%',position: 'relative'}}>
           <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Mytext text="GO FOODIE" />
              <Mybutton
                title="LOGIN WITH GOOGLE TO START"
                customClick={() => this.props.navigation.navigate('MenuS')}
              />
          </View>
        </ImageBackground>
      </View>
      );
    }
}