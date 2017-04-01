import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emailChanged, passwordChanged, loginUser,} from '../action/firebaseAuth'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

class LoginForm extends Component {

  _fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if(result.isCancelled) {
        console.log('Login Cancelled');
      } else {
        console.log('result object:', result)
        console.log('Login Success:' + result.grantedPermissions.toString());
      }
    },function(error){
      console.log('Login Error:' + error )
    })
  } 

  authError(loginError) {
    //Auth Error Message when log in fail

    if (loginError) {
      return (
        <Text style={styles.errorTextStyle}>
          {loginError} - try again !
        </Text>
      )
    }
  }

  handleLogin = () => {
    // Action to Reducer to login and create user

    const { email, password} = this.props
    this.props.loginUser({ email, password })
  }

  renderButton() {
    // Log in Button render and Spinner 

    if (this.props.isLoading) {
      return <Spinner size="large" />
    }

    return (
      <Button onPress={this.handleLogin.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    const {
      email, emailChanged, password, passwordChanged, loginUser, loginError
    } = this.props

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@email.com"
            onChangeText={emailChanged}
            value={email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
            onChangeText={passwordChanged}
            value={password}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this._fbAuth}>
            Facebook Login
          </Button>
        </CardSection>

          {this.authError(loginError)}

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    )
  }
}

function mapStateToProps(state) {
  const { email, password, loginError, uid, isLoading} = state.auth;

  //maping the state in reducer to the props and grant access to this.props

  return {
    email,
    password,
    loginError,
    uid,
    isLoading
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser})(LoginForm)
