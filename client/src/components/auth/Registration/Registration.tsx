import { Drawer } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { RegistrationForm } from './RegistrationForm';

export const Registration = () => {
  const { registrationOpen, setRegistrationOpen } = useAuthContext();

  return (
    <Drawer anchor="right" open={registrationOpen} onClose={() => setRegistrationOpen(false)}>
      <Grid container sx={{ height: '100%', width: { xs: '70vw', lg: '45vw' } }} alignItems="center">
        <RegistrationForm />
      </Grid>
    </Drawer>
  );
};
