'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
import styles from '../styles';
const { StyleSheet, Text, View} = ReactNative;

class StatusBar extends Component {
  render() {
    return (
      <View>
        <View style={[styles.statusbar , this.props.style || {}]}/>
        <View style={[styles.navbar , this.props.style || {}]}>
          <Text style={styles.navbarTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

module.exports = StatusBar;