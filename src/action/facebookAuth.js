import FBSDK, { LoginManager } from 'react-native-fbsdk'
import firebase from 'firebase'

const { AccessToken, GraphRequest, GraphRequestManager } = FBSDK
import {
    USER_NO_CHANGED,
    USER_CHANGED,
    LOG_IN_ERROR,
    IS_LOG_IN_LOADING
} from './types'

export const checkAuthencity = () => dispatch => {

    AccessToken.getCurrentAccessToken()
        .then((data) => {
            dispatch({
                type: IS_LOG_IN_LOADING,
                isLoading: true
            })

            const cred = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
            firebase.auth().signInWithCredential(cred)
                .then(user => {
                    console.log('user', user)
                    dispatch({
                        type: USER_CHANGED,
                        loggedIn: true,
                        uid: user.uid
                    })
                })
                .catch(function (error) {
                    console.log('error', error.message)
                })
        })
        .catch(error => {
            dispatch({
                type: LOG_IN_ERROR,
                payload: error,
                isLoading: false
            })
            console.log('FB Auth Failed')
        })
}

