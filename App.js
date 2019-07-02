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
  createSwitchNavigator
} from "react-navigation";
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Menu from "./pages/MenuScreen";
import Beverages from "./pages/beverages";
import Foods from "./pages/foods";
import Bakery from "./pages/bakery";
import Checkout from "./pages/checkout";
import Drawer from "./pages/components/DrawerComponent";
import { Button } from "react-native-elements";

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
    //title: "Please sign in"
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/circle.png")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "relative",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "cornflowerblue",
              fontSize: 50,
              fontWeight: "bold",
              fontFamily: "sans-serif-medium"
            }}
          >
            GO FOODIE
          </Text>
          <GoogleSigninButton
            style={{
              width: 212,
              height: 48
            }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._signInAsync}
          />
        </ImageBackground>
      </View>
    );
  }

  _signInAsync = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
      this.setState({ userInfo: userInfo });
      await AsyncStorage.setItem("@userEmail", userInfo.user.email);
      await AsyncStorage.setItem("@userName", userInfo.user.name);
      await AsyncStorage.setItem("@userPhoto", userInfo.user.photo);

      // Navigate to Menu page if logged in
      if (this.state.userInfo) this.props.navigation.navigate("MenuS");
    } catch (error) {
      console.log("Message", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ["https://www.googleapis.com/auth/userinfo.profile"],
      // Replace with your webClientId generated from Firebase console
      webClientId:
        "285903010779-4vt39eg3foknrkl5ju3dt6js1v825tho.apps.googleusercontent.com"
    });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userEmail = await AsyncStorage.getItem("@userEmail");
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userEmail ? "HomeDraw" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  MenuS: {
    screen: Menu,
    navigationOptions: {
      title: "MENU",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
      header: null
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
  CheckoutS: {
    screen: Checkout,
    navigationOptions: {
      headerLeft: null,
      title: "Checkout",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    }
  },
  initialRouteName: "MenuS",
  headerLayoutPreset: "center"
});

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

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

const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppStack
    }
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    contentComponent: Drawer,
    navigationOptions: {
      drawerLockMode: "locked-closed"
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    HomeDraw: MainDrawerNavigator,
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(SwitchNavigator);
