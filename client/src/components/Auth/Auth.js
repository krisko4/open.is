import React from "react";
import {Login} from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {EmailConfirmation} from "./Registration/EmailConfirmation";



export const Auth = () => {
    return (
        <div>
            <Login/>
            <Registration/>
            <EmailConfirmation/>
        </div>
    )
}