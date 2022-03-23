import { Collapse, Grow, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { StyledSection, StyledVideo } from './Section1';

interface Props {
  isVisible: boolean;
}

const Section2: FC<Props> = ({ isVisible }) => {
  return (
    <Fade in={isVisible} timeout={1000}>
      <StyledSection>
        <StyledVideo autoPlay muted loop>
          <source src={`${process.env.REACT_APP_BASE_URL}/images/section2.mp4`} type="video/mp4" />
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
          <Fade style={{ zIndex: 1 }} in={isVisible} timeout={1000}>
            <Grid
              container
              sx={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))', height: '100%' }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item lg={6}>
                <Grow in={isVisible} {...(isVisible ? { timeout: 3000 } : {})}>
                  <div data-testid="content" style={{ textAlign: 'center' }}>
                    <Typography variant="h3" style={{ color: 'white', fontFamily: 'georgia' }}>
                      Locate the desired place easily
                    </Typography>
                    <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
                      Access the information about most recent news from places you would like to visit. Find out about
                      upcoming events, bargains or parties. Order food from your favourite restaurants via UberEats or
                      book a visit to a hairdresser.
                    </Typography>
                    <Grid container style={{ marginTop: 20 }} justifyContent="center">
                      <Grid item xs={4}>
                        <img alt="uber" src="/images/ubereats.png" style={{ width: '100%' }} />
                      </Grid>
                      <Grid item xs={4}>
                        <img alt="bolt" src="/images/bolt.jpg" style={{ width: '100%', marginLeft: 10 }} />
                      </Grid>
                      <Grid item xs={4}>
                        <img alt="moment" src="/images/moment.png" style={{ width: '100%', marginLeft: 15 }} />
                      </Grid>
                    </Grid>
                  </div>
                </Grow>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </StyledSection>
    </Fade>
    // <Grid
    //   justifyContent="center"
    //   container
    //   style={{ overflowX: 'clip', background: 'linear-gradient(0deg, rgba(248,248,248,1) 4%, rgba(0,0,0,1) 20%)' }}
    // >
    //   <Collapse in={isVisible} timeout={2000}>
    //     <Grid data-testid="content" container justifyContent="center" style={{ marginTop: 40 }}>
    //       <Grid item lg={6} style={{ textAlign: 'center' }} xs={10}>
    //         <Typography variant="h5" style={{ color: 'white' }}>
    //           Watch your business grow using our dedicated panel
    //         </Typography>
    //         <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10, textAlign: 'center' }}>
    //           Your success is our goal. For this reason we have built a platform where our users are able to manage
    //           their places and keep track of all the activity related to their businesses. Using interactive charts, you
    //           can observe the amount of people visiting your profile and sharing their opinions on daily basis.
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Collapse>
    //   <Grid item style={{ marginTop: 20 }} xs={8}>
    //     <Fade in={isVisible} timeout={2000}>
    //       <img
    //         data-testid="dark-panel"
    //         alt="dark-panel"
    //         src={`${process.env.REACT_APP_BASE_URL}/images/dark_panel.png`}
    //         style={{ width: '100%', marginTop: 100, transform: 'translate(20%, 5%) rotate(-40deg) skew(20deg,10deg)' }}
    //       />
    //       {/* <CardMedia
    //                     image={`${process.env.REACT_APP_BASE_URL}/images/dashboard.jpg`}
    //                     style={{ height: 600, marginTop: 100, transform: 'translate(27%, 5%) rotate(-40deg) skew(20deg,10deg)' }}
    //                 /> */}
    //     </Fade>
    //     <Fade in={isVisible7} timeout={2000}>
    //       <img
    //         data-testid="light-panel"
    //         alt="light-panel"
    //         src={`${process.env.REACT_APP_BASE_URL}/images/light_panel.png`}
    //         style={{
    //           width: '100%',
    //           marginTop: 100,
    //           transform: 'translate(-27%, -15%) rotate(40deg) skew(10deg,-10deg)',
    //         }}
    //       />
    //       {/* <CardMedia
    //                     image={`${process.env.REACT_APP_BASE_URL}/images/dashboard.jpg`}
    //                     style={{ height: 600, marginTop: 100, transform: 'translate(-27%, -15%) rotate(40deg) skew(10deg,-10deg)' }}
    //                 /> */}
    //     </Fade>
    //   </Grid>
    // </Grid>
  );
};

export default Section2;
