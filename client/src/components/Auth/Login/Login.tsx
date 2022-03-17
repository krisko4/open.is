import * as React from 'react';
import { Drawer } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LoginForm } from './LoginForm';
import { useAuthContext } from 'contexts/AuthContext';






export const Login = () => {

  const { loginOpen, setLoginOpen } = useAuthContext();

  return (
        <Drawer
            anchor="right"
            open={loginOpen}
            onClose={() => setLoginOpen(false)}
        >
            <Grid container sx={{ width: 800, height: '100%' }} justifyContent="center" alignItems="center">
                <LoginForm/>
            </Grid>
        </Drawer>
  );
};