import {FB_LOG_OUT,CHECK_FB_AUTH, GET_FB_TOKEN} from '../action/types'

const INITIAL_STATE = {
    name: '',
    email: '',
    fbID: '',
    pic: '',
    fbloggedIn: null 
}

export default (state= INITIAL_STATE, action) =>{

    switch(action.type) {
        case CHECK_FB_AUTH:
            return { ...state, fbloggedIn: action.fbloggedIn}

        default:
            return state
    }
}