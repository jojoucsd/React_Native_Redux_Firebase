import FBSDK, { LoginManager } from 'react-native-fbsdk'
import firebase from 'firebase'

const { AccessToken, GraphRequest, GraphRequestManager } = FBSDK
import {
    FB_LOG_OUT,
    GET_FB_TOKEN,
    CHECK_FB_AUTH
} from './types'

export const checkAuthencity = () => dispatch => {
    
    AccessToken.getCurrentAccessToken()
        .then((data) => {
            if (data) {
                console.log('Data', data.accessToken)
                const cred = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                console.log('Cred', cred)
                firebase.auth().signInWithCredential(cred).catch(function(error){
                    console.log('error',error.message)
                })
                dispatch({
                    type: CHECK_FB_AUTH,
                    fbloggedIn: true
                })
            } else {
                dispatch({
                    type: CHECK_FB_AUTH,
                    fbloggedIn: false
                })
            }
        }
        )
}
