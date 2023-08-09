// import * as React from 'react';
// import Button from "@mui/material/Button";
// import GoogleLogin from "react-google-login";

// const signIn = (response) => {
//     console.log(response);
// }

// const setFailureResponse = (response) => {
//     console.log(response);
// }

// export const GoogleLoginButton = () => {
//     return (
//         <GoogleLogin
//             clientId="882076934469-3dhijrs8140lsll6eu7lh0tdhb9p1qju.apps.googleusercontent.com"
//             uxMode="redirect"
//             onSuccess={signIn}
//             redirectUri={`http://localhost:4000/auth/google/callback`}
//             onFailure={setFailureResponse}
//             cookiePolicy={'single_host_origin'}
//             render={renderProps => (
//                 <Button
//                     fullWidth={true}
//                     style={{minHeight: 50, textTransform: 'none'}}
//                     size="large"
//                     color="primary"
//                     variant={"contained"}
//                     onClick={renderProps.onClick}
//                     disabled={renderProps.disabled}
//                 >
//                     <img
//                          src={`${import.meta.env.VITE_BASE_URL}/images/Google__G__Logo.svg`}
//                          alt="GoogleIcon"/>
//                     <span style={{marginLeft: 10}}>Sign in with Google</span>
//                 </Button>
//             )}
//         />
//     );
// };
