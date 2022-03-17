import { Fade, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { PlaceDetailsForm } from './PlaceDetailsForm';


export const Step2: FC = () => {
    
    
  return (
        <Fade in={true} timeout={1500}>
            <Grid item container justifyContent="center" style={{ marginTop: 20 }}>
                <Grid container direction="column" alignItems="center">
                    <Typography variant="h3">Step 2</Typography>
                    <Typography variant="subtitle1">Business details</Typography>
                </Grid>
                <PlaceDetailsForm />
            </Grid >
        </Fade>
  );
};