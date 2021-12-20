import { PayloadAction } from "@reduxjs/toolkit"
export const userDataReducer = (state = '', action: PayloadAction) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return action.payload
        default:
            return state
    }
}