import { Fade, Slide, Grid, Typography, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledContainer = styled(Grid)({

  height: '100vh',
  width: '100vw',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6)), url(${process.env.REACT_APP_BASE_URL}/images/office.jpg)`,
});
export const Section2: FC = () => {

    
  return (
        <StyledContainer container alignItems="center" >
            <Grid container>
                <Grid item container justifyContent="center" lg={5} style={{ textAlign: 'center', marginLeft: 150, marginBottom: 150 }}>
                    <Fade in={true} timeout={3000}>
                        <Typography style={{ color: 'white' }} variant="h2">What is our mission?</Typography>
                    </Fade>
                    <Grid item lg={10} style={{ marginTop: 20 }}>
                        <Slide in={true} timeout={2000}>
                            <Typography style={{ color: 'white' }} variant="h6">
                                We strongly believe that by encouraging our users to actively interact and take care of social aspects of their businesses,
                                we can create a leading global platform for finding and managing places.
                            </Typography>
                        </Slide>
                    </Grid>
                </Grid>
            </Grid>
        </StyledContainer>
  );
};