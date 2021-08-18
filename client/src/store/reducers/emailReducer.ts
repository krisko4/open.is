import { PayloadAction } from "@reduxjs/toolkit"

export const emailReducer = (state = '', action : PayloadAction) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return action.payload
        default:
            return state
    }
}