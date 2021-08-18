import {PayloadAction} from '@reduxjs/toolkit'

export const authReducer = (state = false, action : PayloadAction) => {

    switch(action.type){
        case 'SIGN_IN':
           return true
        case 'SIGN_OUT':
            return false
        default:
            return false
    }

}