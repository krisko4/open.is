import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import { signOut } from '../../requests/AuthRequests';
import { useCustomSnackbar } from '../../utils/snackbars';


export const SignOutButton: FC<any> = (props) => {
  const { enqueueSuccessSnackbar } = useCustomSnackbar();
  const { setUserData } = useLoginContext();
  const { children } = props;


  const logout = async () => {
    await signOut();
    setUserData(data => (
      {
        ...data,
        email: '',
        isLoggedIn: false,
      }
    ));
    localStorage.removeItem('uid');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('img');
    enqueueSuccessSnackbar('You have signed out.');
  };

  return <Button {...props} onClick={logout}>{children}</Button>;

};