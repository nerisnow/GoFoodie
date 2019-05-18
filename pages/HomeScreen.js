/* Home Screen With buttons to navigate to different options */
import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import {
  StyleSheet,
  Alert,
  Button,
  Text,
  View,
  ImageBackground
} from "react-native";
import Mybutton from "./components/Mybutton";
import Mytext from "./components/Mytext";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null
    };
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
    if (this.state.userInfo) this.props.navigation.navigate("MenuS");
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

  _signIn = async () => {
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

  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED
          ? "Please sign in :)"
          : error.message;
      this.setState({ error: new Error(errorMessage) });
    }
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log("deleted");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { userInfo } = this.state;

    const body = userInfo
      ? this.renderUserInfo(userInfo)
      : this.renderSignInButton();
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column"
        }}
      >
        {body}
      </View>
    );
  }

  renderIsSignedIn() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.isSignedIn();
          Alert.alert(String(isSignedIn));
        }}
        title="is user signed in?"
      />
    );
  }

  renderGetCurrentUser() {
    return (
      <Button
        onPress={async () => {
          const userInfo = await GoogleSignin.getCurrentUser();
          Alert.alert(
            "current user",
            userInfo ? JSON.stringify(userInfo.user) : "null"
          );
        }}
        title="get current user"
      />
    );
  }

  renderUserInfo(userInfo) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 20
          }}
        >
          Welcome to our app {userInfo.user.name}
        </Text>
        <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>

        <Button onPress={this._signOut} title="Log out" />
      </View>
    );
  }

  renderSignInButton() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./circle.png")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "relative",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <GoogleSigninButton
            style={{
              width: 212,
              height: 48
            }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this._signIn}
          />
        </ImageBackground>
      </View>
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ""}`;
    return <Text>{text}</Text>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
