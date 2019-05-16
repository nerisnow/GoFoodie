/*Item View*/
import React from 'react';
import { TouchableHighlight,Text,View} from 'react-native';

export default class Item extends React.PureComponent {
  
toggleComplete() {

}

render(){

    return (
      <TouchableHighlight
        onPress={() => this.toggleComplete()}
      >
          <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 8 }}>
                  <Text style={{color: 'white'}}>{this.props.name}</Text>
              </View>
              <View style={{ flex: 2 }}>
                  <Text style={{color: 'white'}}>
                  {this.props.price}
                  </Text>
              </View>
          </View>
      </TouchableHighlight>
    );
  }
}