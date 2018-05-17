import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/pages/Home.js';
import TitleBar from './src/components/TitleBar.js';

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <TitleBar />
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
