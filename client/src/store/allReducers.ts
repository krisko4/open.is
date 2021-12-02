import {combineReducers} from "redux";
import {emailReducer} from "./reducers/emailReducer";
import {authReducer} from "./reducers/authReducer";
import {currentPlaceReducer} from './reducers/currentPlaceReducer'

export const allReducers = combineReducers({
    email : emailReducer,
    isUserLoggedIn: authReducer,
    currentPlace: currentPlaceReducer
})