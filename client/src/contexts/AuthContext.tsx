import React, {createContext, FC, useState} from "react";
import {ContextProps} from "./ContextProps";

export const AuthContext = createContext({})




export const AuthContextProvider : FC<ContextProps> = ({children}) => {

    const [registrationOpen, setRegistrationOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [confirmationOpen, setConfirmationOpen] = useState(false)
    const [email, setEmail] = useState('')

    const state = {
        confirmationOpen,
        setConfirmationOpen,
        loginOpen,
        setLoginOpen,
        registrationOpen,
        setRegistrationOpen,
        email,
        setEmail
    }

    return(
        <AuthContext.Provider value={{...state}}>
            {children}
        </AuthContext.Provider>
    )
}