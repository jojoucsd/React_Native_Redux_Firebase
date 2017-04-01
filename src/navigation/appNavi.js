'use strict'

import React, { Component } from 'react';
import {
    ScrollView, StyleSheet, Navigator, TouchableHighlight, Text, TouchableOpacity,
} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import GroceryScreen from '../screens/GroceryScreen';
import firebase from 'firebase';
import firebaseApp from "../firebase/config";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userStatus } from '../action/firebaseAuth'


class NavButton extends Component {

    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

//creating Navbar
var NavigationBarRouteMapper = {

    LeftButton: function (route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        return (
            <TouchableOpacity
                style={styles.navBarLeftButton} onPress={() => navigator.pop()}>
                <Text>Back</Text>
            </TouchableOpacity>
        )
    },

    RightButton: function (route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }
        return (
            <TouchableOpacity
                style={styles.navBarRightButton} onPress={() => firebase.auth().signOut()}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        );
    },

    Title: function (route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }
        return (
            <Text>Title</Text>
        );
    },
};

class AppNavi extends Component {

    componentWillMount() {
        firebaseApp;

        this.props.userStatus()

        this.onIndexView = false;
    }

    _renderScene = (route, navigator) => {
        var globalNavigatorProps = { navigator }
        this.onIndexView = true;
        // console.log('uid in render', this.props.uid)
        switch (route.ident) {
            case "LoginScreen":
                this.onIndexView = false;
                return (
                    <LoginScreen
                        {...globalNavigatorProps}
                 
                         />
                )

            case "GroceryScreen":
                return (
                    <GroceryScreen
                        {...globalNavigatorProps}
                      />
                )
            /* case "RestaurantShow":
                 return (
                     <RestaurantShow
                         {...globalNavigatorProps}
                         />
                 )
             case "ReviewShow":
                 return (
                     <ReviewShow
                         {...globalNavigatorProps}
                         restaurant={route.restaurant} />
                 )*/
            default:
                return (
                    <Text>{`404, route is missing ${route}`}</Text>
                )
        }
    }

    render() {
        // console.log('Redux', this.props)
        return (
            <Navigator
                initialRoute={{ ident: "LoginScreen" }}
                ref="appNavigator"
                style={styles.naviagorStyles}
                renderScene={this._renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navBar}
                    />
                }>
            </Navigator>
        )
    }
}

function mapStateToProps(state) {
    // console.log('uid', state.auth.uid)
    const { loggedIn, uid } = state.auth
    return {
        loggedIn,
        uid
    }
}

const styles = StyleSheet.create({
    naviagorStyles: {
        flex: 1,
        justifyContent: 'center'
    },

    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CDCDCD',
    },
    navBar: {
        backgroundColor: 'transparent',
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
        height: 200,
    },
});

// module.exports = AppNavi
export default connect(mapStateToProps, { userStatus })(AppNavi)