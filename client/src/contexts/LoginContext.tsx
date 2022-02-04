
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { ContextProps } from "./ContextProps";

export const LoginContext = createContext<LoginContextData | null>(null)




export const LoginContextProvider: FC<ContextProps> = ({ children }) => {

    const state = useProviderData()
    const [isAuthFinished, setAuthFinished] = useState(false)

    useEffect(() => {
        const authenticate = async () => {
            try {
                await authenticate()
                state.setUserLoggedIn(true)
                state.setEmail(localStorage.getItem('email') || '')
                state.setFullName(localStorage.getItem('fullName') || '')
                state.setImg(localStorage.getItem('img') || '')

            } catch (err) {
                if (state.isUserLoggedIn) {
                    localStorage.removeItem('uid')
                    localStorage.removeItem('fullName')
                    localStorage.removeItem('email')
                    localStorage.removeItem('img')
                    // state.setEmail('')
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
    const [fullName, setFullName] = useState('')
    const [img, setImg] = useState('')

    return {
        isUserLoggedIn,
        setUserLoggedIn,
        setEmail,
        email,
        fullName,
        setFullName,
        img,
        setImg
    }
}

type LoginContextData = ReturnType<typeof useProviderData>

export const useLoginContext = () => {
    const loginContext = useContext(LoginContext)
    if (!loginContext) throw new Error('LoginContext should be used inside LoginContextProvider')
    return loginContext
}