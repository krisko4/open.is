
import { PayloadAction } from "@reduxjs/toolkit"

export const selectedOptionReducer = (state = '', action: PayloadAction) => {
    switch (action.type) {
        case 'SET_SELECTED_OPTION':
            return action.payload
        default:
            return state
    }
}