/*Item View*/
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import NumericInput from "react-native-numeric-input";
import AsyncStorage from "@react-native-community/async-storage";

export default class Review extends React.PureComponent {
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
    const styles = StyleSheet.create({
      text: {
        padding: 10
      },
      reviewpositive: {
        color: "green"
      },
      reviewnegative: {
        color: "red"
      }
    });
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
          <Text
            style={[
              styles.text,
              this.props.status ? styles.reviewpositive : styles.reviewnegative
            ]}
          >
            {this.props.review}
          </Text>
        </View>
      </View>
    );
  }
}
