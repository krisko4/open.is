
import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../requests/AuthRequests";
import { ContextProps } from "./ContextProps";

export const LoginContext = createContext<LoginContextData | null>(null)




export const LoginContextProvider: FC<ContextProps> = ({ children }) => {

    const state = useProviderData()
    const [isAuthFinished, setAuthFinished] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const authenticate = async () => {
            try {
                await auth()
                const data = {
                    isLoggedIn : true,
                    email: localStorage.getItem('email') || '',
                    fullName: localStorage.getItem('fullName') || '',
                    img: localStorage.getItem('img') || ''
                }
                state.setUserData(data)
            } catch (err) {
                if (state.userData.isLoggedIn) {
                    localStorage.removeItem('uid')
                    localStorage.removeItem('fullName')
                    localStorage.removeItem('email')
                    localStorage.removeItem('img')
                }
                history.push('/')
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

interface UserData {
    email : string,
    fullName : string,
    img: string | File | ArrayBuffer | null,
    isLoggedIn: boolean
}

const clearUserData : UserData = {
    email: '',
    fullName: '',
    img: '',
    isLoggedIn: false
}

const useProviderData = () => {

    // const [isUserLoggedIn, setUserLoggedIn] = useState(false)
    // const [email, setEmail] = useState('')
    // const [fullName, setFullName] = useState('')
    // const [img, setImg] = useState<string | File | ArrayBuffer | null>('')
    const [userData, setUserData] = useState(clearUserData)

    return {
        userData, setUserData
    }
}

type LoginContextData = ReturnType<typeof useProviderData>

export const useLoginContext = () => {
    const loginContext = useContext(LoginContext)
    if (!loginContext) throw new Error('LoginContext should be used inside LoginContextProvider')
    return loginContext
}