
import { PayloadAction } from "@reduxjs/toolkit"

export const currentPlaceReducer = (state = '', action : PayloadAction) => {
    switch (action.type) {
        case 'SET_CURRENT_PLACE':
            return action.payload
        default:
            return state
    }
}