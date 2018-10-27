/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'login screen',
  android:
    'Login screen',
});

type Props = {};
export default class App extends Component<Props> {
  static navigationOptions = {
   title: 'Login',
 };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Button
        title="entry"
        onPress={() =>
          navigate('EntryPage', { propps: 'from trending' })
        }
      />
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('HomeScreen', { propps: 'from trending' })
        }
      />
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Menu', { propps: 'from trending' })
        }
      />
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Trending', { propps: 'from trending' })
        }
      />
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('AllTimeHits', { propps: 'from trending' })
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
