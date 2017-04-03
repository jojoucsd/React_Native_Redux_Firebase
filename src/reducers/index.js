import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import fbAuthReducer from './facebookReducer'

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer,
    fbAuth: fbAuthReducer,

})

export default rootReducer;