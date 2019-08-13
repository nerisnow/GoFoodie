/*page for reviews from customer*/
import React from "react";
import firebase from "react-native-firebase";
import {
  FlatList,
  Text,
  Button,
  View,
  ImageBackground,
  TextInput,
  Alert
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Review from "./Review";
import Mybutton from "./components/Mybutton";

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("reviews");
    this.unsubscribe = null;
    this.state = {
      reviewText: "",
      reviewStatus: 0,
      reviewlist: []
    };
  }

  updateReview(valuereview) {
    this.setState({ reviewText: valuereview });
  }

  updateRate(valuerate) {
    this.setState({ rating: valuerate });
  }

  updateUsername(valueusername) {
    this.setState({ username: valueusername });
  }
  addReview() {
    const encodedValue = encodeURIComponent(this.state.reviewText);
    fetch(
      `http://ec2-54-164-66-14.compute-1.amazonaws.com:8000/bayes/test/?review=${encodedValue}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ reviewStatus: data[0].status });
        console.log(this.state.reviewStatus);
      })
      .catch(console.log);
    this.ref.add({
      review: this.state.reviewText,
      status: this.state.reviewStatus
    });

    this.setState({
      reviewText: ""
    });
    Alert.alert(
      "Review Noted",
      "Your review has been added successfully. Thank you",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const reviewlist = [];
    querySnapshot.forEach(doc => {
      const { review, status } = doc.data();

      reviewlist.push({
        key: doc.id,
        doc, // DocumentSnapshot
        review,
        status
      });
    });

    this.setState({
      reviewlist,
      loading: false
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "column"
        }}
      >
        <ImageBackground
          source={require("./rev.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                color: "black"
              }}
              placeholder={"Drop your review"}
              placeholderTextColor={"#000"}
              value={this.state.reviewText}
              onChangeText={text => this.updateReview(text)}
            />
            <Mybutton
              title="ADD REVIEW "
              customClick={() => this.addReview()}
            />
            <FlatList
              data={this.state.reviewlist}
              renderItem={({ item }) => <Review {...item} />}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
