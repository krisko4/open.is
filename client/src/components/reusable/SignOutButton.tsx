import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { authAxios } from '../../axios/axios';
import { useLoginContext } from '../../contexts/LoginContext';


export const SignOutButton: FC<any> = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { setEmail, setUserLoggedIn } = useLoginContext()
    const { children } = props


    const signOut = async () => {
        await authAxios.get('/logout', { withCredentials: true })
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

    return <Button {...props} onClick={signOut}>{children}</Button>

}