/*Item View*/
import React from "react";
import { Text, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import AsyncStorage from "@react-native-community/async-storage";

export default class Item extends React.PureComponent {
  addToCart = async (key, qty, item, price) => {
    try {
      // await AsyncStorage.clear();
      const currentItem = await AsyncStorage.getItem("@cart");
      console.log(currentItem);
      if (currentItem !== null) {
        var cartItems = JSON.parse(currentItem);
      } else {
        var cartItems = {};
      }
      var newItem = {
        item: item,
        qty: qty,
        price: price
      };
      cartItems[key] = newItem;

      await AsyncStorage.setItem("@cart", JSON.stringify(cartItems));
    } catch (e) {
      // saving error
    }
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "column"
        }}
      >
        <View
          style={{
            flex: 1,
            height: 48,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={{ flex: 8, padding: 10 }}>
            <Text style={{ color: "white" }}>{this.props.name}</Text>
          </View>
          <View style={{ flex: 2, alignItems: "flex-end", padding: 10 }}>
            <Text style={{ color: "white", textAlign: "right" }}>
              {this.props.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 48,
            flexDirection: "row",
            alignItems: "flex-end"
          }}
        >
          <View style={{ flex: 8 }}>
            <Text />
          </View>
          <NumericInput
            style={{
              flex: 2,
              alignItems: "flex-end"
            }}
            textColor="white"
            minValue={0}
            maxValue={20}
            rounded
            onChange={value =>
              this.addToCart(
                this.props.doc.ref.id,
                value,
                this.props.name,
                this.props.price
              )
            }
          />
        </View>
      </View>
    );
  }
}
