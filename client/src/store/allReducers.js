import {combineReducers} from "redux";
import {emailReducer} from "./reducers/emailReducer";
import {authReducer} from "./reducers/authReducer";

export const allReducers = combineReducers({
    email : emailReducer,
    isUserLoggedIn: authReducer,
})