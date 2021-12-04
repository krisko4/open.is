
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { authAxios } from "../axios/axios";
import { ContextProps } from "./ContextProps";

export const LoginContext = createContext<LoginContextData | null>(null)




export const LoginContextProvider: FC<ContextProps> = ({ children }) => {

    const state = useProviderData()
    const [isAuthFinished, setAuthFinished] = useState(false)

    useEffect(() => {
        const authenticate = async () => {
            try {
                await authAxios.get('/auth', { withCredentials: true })
                state.setUserLoggedIn(true)
            } catch (err) {
                if (state.isUserLoggedIn) {
                    await authAxios.get('/logout', { withCredentials: true })
                    localStorage.removeItem('uid')
                    localStorage.removeItem('fullName')
                    localStorage.removeItem('email')
                    localStorage.removeItem('img')
                    state.setEmail('')
                }
            } finally {
                setAuthFinished(true)
            }
        }
        authenticate()
    }, [])

    return (
        <>
            {isAuthFinished &&
                <LoginContext.Provider value={state}>
                    {children}
                </LoginContext.Provider>
            }
        </>
    )
}

const useProviderData = () => {

    const [isUserLoggedIn, setUserLoggedIn] = useState(false)
    const [email, setEmail] = useState('')

    return {
        isUserLoggedIn,
        setUserLoggedIn,
        setEmail,
        email
    }
}

type LoginContextData = ReturnType<typeof useProviderData>

export const useLoginContext = () => {
    const loginContext = useContext(LoginContext)
    if (!loginContext) throw new Error('LoginContext should be used inside LoginContextProvider')
    return loginContext
}