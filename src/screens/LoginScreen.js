'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, AlertIOS, Navigator, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Button, Header, Spinner, CardSection } from '../components/common';
import LoginForm from '../components/LoginForm';
import GroceryScreen from '../screens/GroceryScreen'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser, userStatus } from '../action/firebaseAuth'

class LoginScreen extends Component {

  renderContent() {

    switch (this.props.loggedIn) {
      case true:
        console.log("NAV ", this.props)
        return (
          <View>
            <GroceryScreen {...this.props} />
            <CardSection>
              <Button onPress={this.props.logoutUser}>
                Log Out
              </Button>
            </CardSection>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Header headerText={'Grocery App'} />
        {this.renderContent()}
      </View>
    )
  };

}

function mapStateToProps(state) {
  const { loggedIn, uid } = state.auth

  return { loggedIn, uid }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
})

export default connect(mapStateToProps, { logoutUser, userStatus })(LoginScreen)