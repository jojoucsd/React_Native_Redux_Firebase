import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import styles from '../styles';
const constants = styles.constants;

class ActionButton extends Component {
    render(){
        return(
            <View style= {styles.action} >
                <TouchableHighlight
                    underlayColor={constants.actionColor}
                    onPress={this.props.onPress}>
                    <Text style= {styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = ActionButton;