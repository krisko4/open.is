import  { FC } from "react";
import {Login} from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {EmailConfirmation} from "./Registration/EmailConfirmation";



export const Auth : FC = () => {
   
    // const {loginOpen, registrationOpen, confirmationOpen} = useAuthContext()
    return (
        <div>
            <Login/>
            <Registration/>
            <EmailConfirmation/>
        </div>
    )
}