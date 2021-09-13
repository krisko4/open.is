import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { authAxios } from '../../axios/axios';
import { logout } from '../../store/actions/logout';
import { setEmail } from '../../store/actions/setEmail';


export const SignOutButton: FC<any> = (props) => {
   const dispatch = useDispatch()
   const {enqueueSnackbar} = useSnackbar()
    const {children} = props


    const signOut = async () => {
        console.log('hi')
        await authAxios.get('/logout', { withCredentials: true })
        console.log('hello')
        dispatch(logout())
        dispatch(setEmail(''))
        localStorage.removeItem('uid')
        localStorage.removeItem('fullName')
        enqueueSnackbar('You have signed out.', {
            variant: 'success'
        })
    }

    return <Button {...props} onClick={signOut}>{children}</Button>

}