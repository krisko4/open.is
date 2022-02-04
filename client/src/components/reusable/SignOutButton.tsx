import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import { signOut } from '../../requests/AuthRequests';


export const SignOutButton: FC<any> = (props) => {
    const { enqueueSnackbar } = useSnackbar()
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
        enqueueSnackbar('You have signed out.', {
            variant: 'success'
        })
    }

    return <Button {...props} onClick={logout}>{children}</Button>

}