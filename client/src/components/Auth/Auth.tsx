import  { FC } from "react";
import {Login} from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {EmailConfirmation} from "./Registration/EmailConfirmation";



export const Auth : FC = () => {
   
    return (
        <div>
            <Login/>
            <Registration/>
            <EmailConfirmation/>
        </div>
    )
}