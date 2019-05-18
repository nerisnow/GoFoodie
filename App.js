/* Example of SQLite Database in React Native */
import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from "react-navigation";
import { StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import Home from "./pages/HomeScreen";
import Menu from "./pages/MenuScreen";
import Beverages from "./pages/beverages";
import Foods from "./pages/foods";
import Bakery from "./pages/bakery";
import { Button } from "react-native-elements";

_signOut = async () => {
  //Remove user session from the device.
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    this.props.navigation.navigate("Home");
    // this.setState({ user: null }); // Remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Button onPress={this._signOut} title="Log out" />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const RootStack = createStackNavigator({
  HomeS: {
    screen: Home,
    navigationOptions: {
      headerLeft: null,
      title: "hi"
    }
  },
  MenuS: {
    screen: Menu,
    navigationOptions: {
      title: "MENU",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
      headerLeft: null
    }
  },
  BeveragesS: {
    screen: Beverages,
    navigationOptions: {
      headerLeft: null,
      title: "BEVERAGES",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    }
  },
  FoodsS: {
    screen: Foods,
    navigationOptions: {
      headerLeft: null,
      title: "FOOD",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    }
  },
  BakeryS: {
    screen: Bakery,
    navigationOptions: {
      headerLeft: null,
      title: "BAKERY",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    }
  },
  initialRouteName: "HomeS",
  headerLayoutPreset: "center"
});

const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: RootStack
    }
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    contentComponent: CustomDrawerContentComponent,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  }
);

const App = createAppContainer(MainDrawerNavigator);
export default App;
