'use strict'
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, TouchableHighlight, AlertIOS, Navigator, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Button, Header,Spinner, CardSection } from '../components/common';
import LoginForm from '../components/LoginForm';
import GroceryScreen from '../screens/GroceryScreen'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser, userStatus } from '../action/firebaseAuth'
import { checkAuthencity } from '../action/facebookAuth'

class LoginScreen extends Component {

  renderContent() {
    console.log('loggedIn', this.props.loggedIn)
    console.log('fbloggedIn', this.props.fbloggedIn)

    switch (this.props.loggedIn) {
      case true:
        console.log("NAV ", this.props)
        return (
          <View>
            <GroceryScreen {...this.props} />
            <CardSection>
              <Button>
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

  // _navigateToGroceryScreen(uid) {
  //   this.props.navigator.push({
  //     ident: "GroceryScreen",
  //     uid: uid
  //   })
  // }
}

function mapStateToProps(state) {
  const { loggedIn, uid } = state.auth
  const { fbloggedIn} = state.fbAuth

  return { loggedIn, uid, fbloggedIn}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }
})

export default connect(mapStateToProps, { logoutUser, userStatus, checkAuthencity })(LoginScreen)