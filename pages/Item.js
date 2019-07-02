/*Item View*/
import React from "react";
import { Text, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import AsyncStorage from "@react-native-community/async-storage";

export default class Item extends React.PureComponent {
  addToCart = async (value, item, price) => {
    try {
      await AsyncStorage.setItem("@item", item);

      const currentItem = await AsyncStorage.getItem("@item");

      console.log(currentItem);
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
              this.addToCart(value, this.props.name, this.props.price)
            }
          />
        </View>
      </View>
    );
  }
}
