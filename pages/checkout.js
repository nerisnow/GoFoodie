/*Home Screen With buttons to navigate to different options*/
import React from "react";
import firebase from "react-native-firebase";
import {
  FlatList,
  Text,
  Button,
  View,
  ImageBackground,
  TextInput
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { createStackNavigator, createAppContainer } from "react-navigation";
import Item from "./Item";
import Mybutton from "./components/Mybutton";
import Mytext from "./components/Mytext";
import { CheckBox } from "react-native-elements";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      items: []
    };

    this.getCart();
  }

  getCart = async () => {
    try {
      const currentItem = await AsyncStorage.getItem("@item");
      console.log("test");
      console.log(currentItem);
    } catch (e) {
      // saving error
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column"
        }}
      >
        <ImageBackground
          source={require("./tea.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
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
          {/* <Mybutton
            title="CHECK OUT"
            customClick={() => this.props.navigation.navigate("HomeS")}
          /> */}
        </ImageBackground>
      </View>
    );
  }
}
