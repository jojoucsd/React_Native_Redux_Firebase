import FBSDK, { LoginManager } from 'react-native-fbsdk'
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
