import {combineReducers} from "redux";
import {emailReducer} from "./reducers/emailReducer";
import {authReducer} from "./reducers/authReducer";
import {currentPlaceReducer} from './reducers/currentPlaceReducer'
import {placesReducer} from './reducers/placesReducer'
import {selectedOptionReducer} from './reducers/selectedOptionReducer'
export const allReducers = combineReducers({
    email : emailReducer,
    isUserLoggedIn: authReducer,
    chosenPlace: currentPlaceReducer,
    places: placesReducer,
    selectedOption: selectedOptionReducer
})