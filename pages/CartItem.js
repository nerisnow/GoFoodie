/*Item View*/
import React from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class CartItem extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: 48,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 6, padding: 10 }}>
          <Text style={{ color: "white" }}>{this.props.item}</Text>
        </View>

        <View style={{ flex: 2, padding: 10 }}>
          <Text style={{ color: "white" }}>{this.props.qty}</Text>
        </View>

        <View style={{ flex: 2, alignItems: "flex-end", padding: 10 }}>
          <Text style={{ color: "white", textAlign: "right" }}>
            {this.props.price}
          </Text>
        </View>
      </View>
    );
  }
}
