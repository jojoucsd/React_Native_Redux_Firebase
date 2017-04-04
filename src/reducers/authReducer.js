import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOG_USER_IN_SUCCESS, 
    LOG_IN_ERROR, 
    IS_LOG_IN_LOADING,
    USER_CHANGED,
    USER_NO_CHANGED,
    USER_LOG_OUT
} from '../action/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    isLoading: false,
    loginError: false,
    loggedIn: null,
    uid: null
}

export default (state = INITIAL_STATE, action ) => {
        //   console.log("AUTH REDUCER", action.type)
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload, loginError: false}
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload, loginError: false }
        case LOG_USER_IN_SUCCESS:
            // console.log('login IN Reducer', action.payload.uid)
            return { ...state, uid: action.payload.uid, loginError: false , isLoading: action.isLoading} 
        case LOG_IN_ERROR:
            // console.log('error IN REDUCER', action.payload.code)
            return { ...state, loginError: action.payload.code, email: '', password: '', isLoading: action.isLoading}
        case IS_LOG_IN_LOADING: 
            return { ...state, isLoading: action.isLoading}
        case USER_CHANGED:
            return { ...state, loggedIn: action.loggedIn}
        case USER_NO_CHANGED:
            console.log('user in no change route',action.uid)
            return { ...state, loggedIn: action.loggedIn, uid: action.uid}
        case USER_LOG_OUT:
            return { ...state, email: '', password: '', loggedIn: action.loggedIn}
        default: 
            return state
    }
}