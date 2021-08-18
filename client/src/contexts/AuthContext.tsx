import React, { createContext, FC, useContext, useState } from "react";
import { ContextProps } from "./ContextProps";

export const AuthContext = createContext<AuthContextData | null>(null)




export const AuthContextProvider: FC<ContextProps> = ({ children }) => {

    const state = useProviderData()

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}

const useProviderData = () => {

    const [registrationOpen, setRegistrationOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [confirmationOpen, setConfirmationOpen] = useState(false)
    const [email, setEmail] = useState('')

    return {
        confirmationOpen,
        setConfirmationOpen,
        loginOpen,
        setLoginOpen,
        registrationOpen,
        setRegistrationOpen,
        email,
        setEmail
    }
}

type AuthContextData = ReturnType<typeof useProviderData> 

export const useAuthContext = () => {
    const authContext = useContext(AuthContext)
    if(!authContext) throw new Error('AuthContext should be used inside AuthContextProvider')
    return authContext
}