import { Drawer } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { RegistrationForm } from './RegistrationForm';








export const Registration = () => {


  const { registrationOpen,  setRegistrationOpen } = useAuthContext();

  return (
        <Drawer
            anchor="right"
            open={registrationOpen}
            onClose={() => setRegistrationOpen(false)}
        >
            <Grid container sx={{ width: 800, height: '100%' }} alignItems="center">
                <RegistrationForm />
                {/* <Grid item container alignItems="center" lg={6}
                    style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.5)),url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80)' }}>
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <CardMedia style={{ height: 200 }}
                            image={`${process.env.REACT_APP_BASE_URL}/images/Openis-logos_white.png`}>
                        </CardMedia>
                        <Typography variant="body2" style={{ color: 'white', marginTop: 10 }}>Already have an
                            account?</Typography>
                        <Button
                            onClick={() => { setLoginOpen(true); setRegistrationOpen(false) }}
                            variant="outlined"
                            style={{ color: 'white', borderColor: 'white', borderRadius: 10, marginTop: 10 }}
                        >
                            Sign in
                        </Button>
                    </Grid>
                </Grid> */}
            </Grid>
        </Drawer>
  );

};