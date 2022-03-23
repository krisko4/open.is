import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { CardMedia, Fade, Grow } from '@mui/material';
import { styled } from '@mui/styles';

interface Props {
  isVisible: boolean;
}

// const useStyles = makeStyles({
//     image: {
//         marginTop: 20,
//         height:
//     }
// })

export const StyledVideo = styled('video')({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export const StyledSection = styled('div')({
  height: '1300px',
  width: '100vw',
  position: 'relative',
  background: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))',
});

const Section1: FC<Props> = ({ isVisible }) => {
  return (
    <Fade in={isVisible} timeout={1000}>
      <StyledSection>
        <StyledVideo autoPlay muted loop>
          <source src={`${process.env.REACT_APP_BASE_URL}/images/section1vid.mp4`} type="video/mp4" />
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
              sx={{ background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))', height: '100%' }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} sx={{ textAlign: 'center' }}>
                <Typography data-testid="title" variant="h3" style={{ color: 'white', fontFamily: 'georgia' }}>
                  Find open places in your neighbourhood using our software
                </Typography>
                <Typography data-testid="content" variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
                  Open.is is a platform designed to provide reliable data about the opening state of local businesses.
                  What differs us from other services such as Google Maps, we rely on direct relations with our users.
                  Our mission is to encourage business owners to manage their places using our software and benefit from
                  all the features provided by our platform in order to develop and expand their customer basis.
                </Typography>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </StyledSection>
    </Fade>
    // <div style={{ height: 1200, background: 'black' }}>
    //   <Grid container style={{ marginTop: 80, marginBottom: 80 }} alignItems="center" justifyContent="center">
    //     <Grid item lg={6} md={9} sm={9} xs={10} style={{ textAlign: 'center' }}>
    //       <Fade in={isVisible} timeout={1000}>
    //         <Typography data-testid="title" variant="h5" style={{ color: 'white' }}>
    //           Find open places in your neighbourhood using our software
    //         </Typography>
    //       </Fade>
    //       <Grow in={isVisible} timeout={1000}>
    //         <Typography data-testid="content" variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
    //           Open.is is a platform designed to provide reliable data about the opening state of local businesses. What
    //           differs us from other services such as Google Maps, we rely on direct relations with our users. Our
    //           mission is to encourage business owners to manage their places using our software and benefit from all the
    //           features provided by our platform in order to develop and expand their customer basis.
    //         </Typography>
    //       </Grow>
    //     </Grid>
    //     <Grow timeout={3000} in={isVisible}>
    //       <Grid item>
    //         <div style={{ height: '1000px' }}>
    //           <video style={{ height: '100%', width: '100%', objectFit: 'cover' }} autoPlay muted loop>
    //             <source src={`${process.env.REACT_APP_BASE_URL}/images/section1vid.mp4`} type="video/mp4" />
    //           </video>
    //         </div>
    //       </Grid>
    //       {/* <Grid item lg={8}>
    //         <img
    //           data-testid="image"
    //           alt="earth"
    //           src={`${process.env.REACT_APP_BASE_URL}/images/earth.jpg`}
    //           style={{ width: '100%' }}
    //         />
    //       </Grid> */}
    //     </Grow>
    //   </Grid>
    // </div>
  );
};

export default Section1;
