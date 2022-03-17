import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useLoginContext } from '../../../../contexts/LoginContext';


const Section2: FC = () => {


  const { setLoginOpen } = useAuthContext();
  const { userData } = useLoginContext();
  return (
        <Grid container
        style={{ width: '100%', height: '100%',  backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1)), url(${process.env.REACT_APP_BASE_URL}/images/img.jpg)`,
        }}>
        <Grid container style={{ height: 800 }} alignItems="center" justifyContent="center" direction="column">
            <Grid item style={{ textAlign: 'center' }}>
                <Typography variant="h2" style={{ color: 'white' }}>Spread your wings.</Typography>
                <Typography variant="h6" style={{ color: 'white' }}>Let us take care of your development</Typography>
            </Grid>
            {!userData.isLoggedIn && <Button variant="outlined" size="large" onClick={() => setLoginOpen(true)} style={{ color: 'white', borderColor: 'white', marginTop: 10 }}>Join us</Button>}
        </Grid>
    </Grid>
  );
};

export default Section2;
