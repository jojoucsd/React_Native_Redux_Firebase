import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emailChanged, passwordChanged, loginUser, } from '../action/firebaseAuth'
import { checkAuthencity } from '../action/facebookAuth'
import { googleAuthencity } from '../action/googleAuth'
import FBSDK from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/FontAwesome'

const { AccessToken, LoginButton, GraphRequest, GraphRequestManager, LoginManager } = FBSDK
const infoRequest = new GraphRequest(
  'me?fields=name,picture,email',
  null,
  this._responseInfoCallback,
);

class LoginForm extends Component {

  successfulFbLogin = () => {
    this.props.checkAuthencity()
  }

  successfulGoogleLogin = () =>{
    this.props.googleAuthencity()
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data' + JSON.stringify(error));
      console.log('error', error)
    } else {
      console.log("CALL BACK SUCCESS", result)
    }
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
    const { email, password } = this.props
    this.props.loginUser({ email, password })
  }

  renderButton() {
    // Log in Button render and Spinner 
    if (this.props.isLoading) {
      return <Spinner size="large" />
    }

    return (
      <CardSection>
        <Button onPress={this.handleLogin.bind(this)}>
          Login
      </Button>
      </CardSection>
    )
  }
  renderFBlogin() {
    if (this.props.isLoading) {
      return <Spinner size="large" />
    }
    return (
      <CardSection>
        <Icon.Button style={styles.loginButton} name="facebook" backgroundColor="#3b5998" onPress={this.fbLoginButton.bind(this)}>
          <Text style={{ fontFamily: 'Arial', fontSize: 15, alignSelf: 'stretch', color: 'white' }}>Login with Facebook</Text>
        </Icon.Button >
        <Text>    </Text>
        <Icon.Button style={styles.loginButton} name="google" backgroundColor='#F44336' onPress={this.successfulGoogleLogin.bind(this)}>
          Login with Google
        </Icon.Button>
      </CardSection >
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

        {this.authError(loginError)}
        {this.renderButton()}
        {this.renderFBlogin()}

      </Card>
    )
  }
  fbLoginButton = () => {
    console.log('we are here', this)
    const that = this;
    LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        // console.log("that", that)
        that.props.checkAuthencity()
        console.log('Login was successful with permissions:', result.grantedPermissions.toString());
      }
    },
      function (error) {
        console.log('Login failed with error', error)
      }
    )
      .catch(function (error) {
        console.log('houston we have a problem', error)
      })
  }
}

function mapStateToProps(state) {
  const { email, password, loginError, uid, isLoading } = state.auth;
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
  },
  fbButton: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#8b9dc3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, checkAuthencity, googleAuthencity })(LoginForm)
