import { Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import { signOut } from '../../requests/AuthRequests';
import { useCustomSnackbar } from '../../utils/snackbars';


export const SignOutButton: FC<any> = (props) => {
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()
    const { setEmail, setUserLoggedIn } = useLoginContext()
    const { children } = props


    const logout = async () => {
        await signOut()
        setUserLoggedIn(false)
        setEmail('')
        localStorage.removeItem('uid')
        localStorage.removeItem('fullName')
        localStorage.removeItem('email')
        localStorage.removeItem('img')
        enqueueSuccessSnackbar('You have signed out.')
    }

    return <Button {...props} onClick={logout}>{children}</Button>

}