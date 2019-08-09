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
import Mytext from "./components/Mytext";

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("reviews");
    this.unsubscribe = null;
    this.state = {
      reviewText: "",
      reviewStatus: 0,
      // username: "",
      // rating: "",
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
      // username: this.state.username,
      review: this.state.reviewText,
      status: this.state.reviewStatus
      // ratings:this.state.rating
    });

    this.setState({
      reviewText: ""
      // username: "",
      // rating: ""
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
        // username,
        review,
        status
        // ratings
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
          source={require("./tea.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            {/* <FlatList
              data={this.state.reviewlist}
              renderItem={({ item }) => <Item {...item} />}
            /> */}
            {/* <TextInput
                  style=
                  {{
                    height: 40, borderColor: 'gray', borderWidth: 1, color : "white"
                  }}
                  placeholder={'Username'}
                  placeholderTextColor={'#FFF'} 
                  value={this.state.username}
                  onChangeText={(text) => this.updateUsername(text)}    
              /> */}
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                color: "white"
              }}
              placeholder={"Drop your review"}
              placeholderTextColor={"#FFF"}
              value={this.state.reviewText}
              onChangeText={text => this.updateReview(text)}
            />
            {/* <TextInput
                  style=
                  {{
                    height: 40, borderColor: 'gray', borderWidth: 1, color : "white"
                  }}
                  placeholder={'Rate Us'}
                  placeholderTextColor={'#FFF'} 
                  value={this.state.rating}
                  onChangeText={(text) => this.updateRate(text)}
              /> */}
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
