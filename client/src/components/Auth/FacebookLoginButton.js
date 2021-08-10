import * as React from 'react';
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from "@material-ui/icons/Facebook";



const signIn = (response) => {
    console.log(response);
}


export const FacebookLoginButton = () => {
    return (
        <FacebookLogin
            appId="215596057119230"
            autoLoad
            callback={signIn}
            render={renderProps => (
                <Button
                    startIcon={<FacebookIcon/>}
                    fullWidth={true}
                    style={{minHeight: 50, textTransform: 'none'}}
                    size="large"
                    color="primary"
                    variant={"contained"}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    Sign in with Facebook
                </Button>
            )}
        />
    );
};