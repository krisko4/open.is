

import { PayloadAction } from "@reduxjs/toolkit"

export const placesReducer = (state = '', action : PayloadAction) => {
    switch (action.type) {
        case 'SET_PLACES':
            return action.payload
        default:
            return state
    }
}