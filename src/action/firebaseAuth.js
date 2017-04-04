import firebase from 'firebase';
import FBSDK, { LoginManager } from 'react-native-fbsdk'

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOG_USER_IN_SUCCESS, 
    LOG_IN_ERROR, 
    IS_LOG_IN_LOADING,
    USER_CHANGED,
    USER_NO_CHANGED,
    USER_LOG_OUT
 } from './types'

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    payload: text
})

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    payload: text
})

export const loginUser = ({ email, password }) => dispatch => {

    dispatch({
        type: IS_LOG_IN_LOADING,
        isLoading: true 
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch({
                type: LOG_USER_IN_SUCCESS,
                payload: user,
                isLoading: false
            })
            console.log('User', user.uid)
        })
        .catch( () => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({
                    type: LOG_USER_IN_SUCCESS,
                    payload: user,
                    isLoading: false
                })
            })
            .catch(error =>{
                dispatch({
                    type: LOG_IN_ERROR,
                    payload: error,
                    isLoading: false
                })
                console.log('Authentication Failed')
            })
        })
}

export const userStatus = () => dispatch => {
    firebase.auth().onAuthStateChanged((user)=>{
        // console.log('userStatus', user)
        if (user) {
            dispatch({
                type: USER_NO_CHANGED,
                loggedIn : true,
                uid: user.uid 
            })
        }else {
            dispatch({
                type: USER_CHANGED,
                loggedIn: false 
            })
        }
    })
}

export const logoutUser = () => dispatch => {
    LoginManager.logOut()
    firebase.auth().signOut()
        dispatch({
            type: USER_LOG_OUT,
            isLoading: false,
            loggedIn: false 
        })
}


