import { Grow, Collapse, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { StyledSection, StyledVideo } from './Section1';

interface Props {
  isVisible: boolean;
  isVisible1: boolean;
}

const Section3: FC<Props> = ({ isVisible, isVisible1 }) => {
  return (
    // <Grid container justifyContent="space-evenly">
    //   <Grid item container lg={5} md={8} xs={10} alignItems="center">
    //     <Grow in={isVisible} {...(isVisible ? { timeout: 3000 } : {})}>
    //       <div data-testid="content" style={{ textAlign: 'center' }}>
    //         <Typography variant="h5" style={{ color: 'white' }}>
    //           Locate your desired place by address or name
    //         </Typography>
    //         <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
    //           Access the information about most recent news from places you would like to visit. Find out about upcoming
    //           events, bargains or parties. Order food from your favourite restaurant via UberEats or book a visit to a
    //           hairdresser.
    //         </Typography>
    //         <Grid container style={{ marginTop: 20 }} justifyContent="center">
    //           <Grid item xs={4}>
    //             <img alt="uber" src="/images/ubereats.png" style={{ width: '100%' }} />
    //           </Grid>
    //           <Grid item xs={4}>
    //             <img alt="bolt" src="/images/bolt.jpg" style={{ width: '100%', marginLeft: 10 }} />
    //           </Grid>
    //           <Grid item xs={4}>
    //             <img alt="moment" src="/images/moment.png" style={{ width: '100%', marginLeft: 15 }} />
    //           </Grid>
    //         </Grid>
    //       </div>
    //     </Grow>
    //   </Grid>
    //   <Fade in={isVisible} timeout={3000}>
    //     <Grid item lg={5}>
    //       <img
    //         data-testid="image"
    //         src={'https://cdn.dribbble.com/users/568/screenshots/2937224/browserpreview_tmp.gif'}
    //         alt="preview"
    //         style={{ width: '100%' }}
    //       />
    //     </Grid>
    //   </Fade>
    // </Grid>
    <Fade in={isVisible} timeout={1000}>
      <StyledSection style={{ height: '1000px' }}>
        <StyledVideo autoPlay muted loop>
          <source src={`${process.env.REACT_APP_BASE_URL}/images/growth.mp4`} type="video/mp4" />
        </StyledVideo>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <Grid
            container
            sx={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))', zIndex: 1, height: '100%' }}
            justifyContent="center"
            alignItems="flex-end"
            data-testid="content"
          >
            <Fade in={isVisible1} timeout={1000}>
              <Grid item lg={6} style={{ textAlign: 'center', marginBottom: 100 }} xs={10}>
                <Typography variant="h3" style={{ color: 'white', fontFamily: 'georgia' }}>
                  Watch your business grow using our dedicated panel
                </Typography>
                <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10, textAlign: 'center' }}>
                  Your success is our goal. For this reason we have built a platform where our users are able to manage
                  their places and keep track of all the activity related to their businesses. Using interactive charts,
                  you can observe the amount of people visiting your profile and sharing their opinions on daily basis.
                </Typography>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </StyledSection>
    </Fade>
  );
};

export default Section3;
