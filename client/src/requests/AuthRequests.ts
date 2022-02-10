import myAxios from "../axios/axios";
import { UserData } from "../components/Auth/Login/LoginForm";
import { registrationFields } from "../components/Auth/Registration/RegistrationForm";

export const confirmRegistrationToken = (token: string) => myAxios.get(`/confirmation/${token}`)


export const login = (userData: UserData) => myAxios.post('/login', { ...userData })

export const signOut = () =>
    myAxios.get('/logout')

export const signUp = (userData: typeof registrationFields) =>
    myAxios.post('/registration', { ...userData })

export const auth = () =>
    myAxios.get('/auth')

export const confirmEmailChange = (email: string, token: string) =>
    myAxios.get(`/confirmation/${email}/${token}`)

export const resendConfirmationEmail = (email: string) =>
    myAxios.post('/registration/resend-email', {
        email: email
    })