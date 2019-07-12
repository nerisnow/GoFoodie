/*Home Screen With buttons to 
navigate to different options*/
import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Mybutton from "./components/Mybutton";
import Mytext from "./components/Mytext";
import SQLite from "react-native-sqlite-storage";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column"
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, backgroundColor: "powderblue" }}>
            <ImageBackground
              source={require("./beverages.jpg")}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Mybutton
                  title="BEVERAGES"
                  customClick={() =>
                    this.props.navigation.navigate("BeveragesS")
                  }
                />
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, backgroundColor: "skyblue" }}>
            <ImageBackground
              source={require("./food.jpg")}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Mybutton
                  title="FOOD"
                  customClick={() => this.props.navigation.navigate("FoodsS")}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, backgroundColor: "steelblue" }}>
            <ImageBackground
              source={require("./bakery.jpg")}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Mybutton
                  title="BAKERY"
                  customClick={() => this.props.navigation.navigate("BakeryS")}
                />
              </View>
            </ImageBackground>
          </View>

          <View>
          <Mybutton
                  title="LEAVE A REVIEW"
                  customClick={() => this.props.navigation.navigate("ReviewS")}
                />

          </View>
        </View>
      </View>
    );
  }
}
