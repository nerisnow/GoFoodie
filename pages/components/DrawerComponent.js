import React, { Component } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  Text,
  Image,
  Button,
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class drawerContentComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      userEmail: null,
      userPhoto: null
    };
  }

  async componentDidMount() {
    AsyncStorage.getItem("@userName").then(value => {
      this.setState({ userName: value });
    });
    AsyncStorage.getItem("@userEmail").then(value => {
      this.setState({ userEmail: value });
    });
    AsyncStorage.getItem("@userPhoto").then(value => {
      this.setState({ userPhoto: value });
    });
  }

  _signOutAsync = async () => {
    console.log("check");
    this.setState({ user: "asdf" });
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 50, height: 50, marginTop: 25 }}
          source={{ uri: this.state.userPhoto }}
        />
        <Text style={{ margin: 5 }}>{this.state.userName}</Text>
        <Text style={{ marginBottom: 10 }}>{this.state.userEmail}</Text>
        <Button title="Sign Out" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }
});
