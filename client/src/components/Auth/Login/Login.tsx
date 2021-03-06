import * as React from 'react';
import { Drawer } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LoginForm } from './LoginForm';
import { useAuthContext } from 'contexts/AuthContext';

export const Login = () => {
  const { loginOpen, setLoginOpen } = useAuthContext();

  return (
    <Drawer data-testid="auth-drawer" anchor="right" open={loginOpen} onClose={() => setLoginOpen(false)}>
      <Grid
        container
        sx={{ height: '100%', width: { xs: '70vw', lg: '45vw' } }}
        justifyContent="center"
        alignItems="center"
      >
        <LoginForm />
      </Grid>
    </Drawer>
  );
};
