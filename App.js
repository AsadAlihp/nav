import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator,DrawerNavigator  } from 'react-navigation';

import EntryPage from './Screens/EntryPage';
import LoginPage from './Screens/LoginPage';
import SignUp from  './Screens/SignUp';
import HomeScreen from  './Screens/HomeScreen';
import Menu from  './Screens/menu';
import Trending from  './Screens/Trending';
import AllTimeHits from  './Screens/AllTimeHits';
import ForgotPass from  './Screens/ForgotPass';
import HomeScreenGuest from  './Screens/HomeScreenGuest';

import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  EntryPage: { screen: EntryPage },
  LoginPage: { screen: LoginPage },
  SignUp: { screen: SignUp },
  HomeScreen: { screen: HomeScreen },
  Trending: { screen: Trending },
  AllTimeHits: { screen: AllTimeHits },
  ForgotPass: { screen: ForgotPass },
  HomeScreenGuest: { screen: HomeScreenGuest },

});

export default App;
