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
import CartItem from "./CartItem";
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
    console.log("test1");
    this.getCart();
  }

  getCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("@cart");
      console.log("test2");
      if (cartItems !== null) {
        var items = JSON.parse(cartItems);
        this.setState({
          items,
          loading: false
        });
      }
    } catch (e) {
      // saving error
    }
  };

  clearCart = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      //error
    }
  };

  render() {
    console.log("render");
    var cartitems = Object.values(this.state.items);
    console.log(cartitems);
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
              data={cartitems}
              renderItem={({ item }) => <CartItem {...item} />}
            />
          </View>
          <Mybutton title="CLEAR CART " customClick={() => this.clearCart()} />
        </ImageBackground>
      </View>
    );
  }
}
