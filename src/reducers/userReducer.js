import firebase from 'firebase';
import {
    USER_SET_MOBILE,
    USER_UPDATE_MOBILE,
    USER_LISTEN_MOBILE,
    GET_CURRENTUSER,
    LISTEN_ITEMS,
} from '../action/types'

const INITIAL_STATE = {
    email: '',
    mobile: '',
    items: []
}

export default (state = INITIAL_STATE, action ) =>{
    
    switch (action.type) {
        case USER_SET_MOBILE:
            return {...state, mobile: action.mobile}
        case USER_LISTEN_MOBILE:
            return {...state, mobile: action.mobile}
        case USER_UPDATE_MOBILE:
            return {...state, mobile: action.mobile}
        case GET_CURRENTUSER:
            // console.log('CurrentUSER', action.uid)
            return {...state, uid: action.uid, email: action.email }
        case LISTEN_ITEMS:
            console.log('LISTENING ITEMS', action.userItems)
            return {...state, items: action.userItems}
        default:
            return state
    }
}