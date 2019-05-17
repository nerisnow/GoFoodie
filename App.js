/*Example of SQLite Database in React Native*/
import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Home from './pages/HomeScreen';
import Menu from './pages/MenuScreen';
import Beverages from './pages/beverages';
import Foods from './pages/foods';
import Bakery from './pages/bakery';

// const RootStack = createStackNavigator(
//   {
//   HomeS: Home,
//   MenuS: Menu,
//   BeveragesS: Beverages,
//   FoodsS: Foods,
//   BakeryS: Bakery,
//   },
//   {
//     initialRouteName: "HomeS"
//   }
// );

// const AppNavigator = createStackNavigator({
//   HomeS: {
//     screen: Home
//   },
//   MenuS : {
//     screen: Menu
//   },
//   BeveragesS : {
//     screen: Beverages
//   },
//   FoodsS : {
//     screen: Foods
//   },
//   BakeryS : {
//     screen: Bakery
//   },
//   {
//   initialRouteName: "HomeS"
//   },
// });

const RootStack = createStackNavigator({
  HomeS: { 
    screen: Home,
    navigationOptions: {
      headerLeft: null,
      title:"hi"
    }, 
  },
  MenuS: { 
    screen: Menu,
    navigationOptions: {
      title: "MENU",
       headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
       },
      headerLeft: null
    }, 
  },
  BeveragesS: { 
    screen: Beverages,
    navigationOptions: {
      headerLeft: null,
      title: "BEVERAGES",
       headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
       },
    }, 
  },
  FoodsS:{ 
    screen: Foods,
    navigationOptions: {
      headerLeft: null,
      title: "FOOD",
       headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
       },
    }, 
  },
  BakeryS:{
    screen:Bakery,
  navigationOptions: {
      headerLeft: null,
      title: "BAKERY",
       headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
       },
    }, 
  },
  initialRouteName:"HomeS",
  headerLayoutPreset: 'center'
});

const App = createAppContainer(RootStack);
export default App;
