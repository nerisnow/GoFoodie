/*Example of SQLite Database in React Native*/
import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Home from './pages/HomeScreen';
import Menu from './pages/MenuScreen';
import Beverages from './pages/beverages';
import Foods from './pages/foods';

const RootStack = createStackNavigator(
  {
  HomeS: Home,
  MenuS: Menu,
  BeveragesS: Beverages,
  FoodsS: Foods,
  },
  {
    initialRouteName: "HomeS"
  }
);
const App = createAppContainer(RootStack);
export default App;
