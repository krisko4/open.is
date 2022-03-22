import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { Fade, Grow } from '@mui/material';

interface Props {
  isVisible: boolean;
}

// const useStyles = makeStyles({
//     image: {
//         marginTop: 20,
//         height:
//     }
// })

const Section1: FC<Props> = ({ isVisible }) => {
  return (
    <div style={{ height: 1200, background: 'black' }}>
      <Grid container style={{ marginTop: 80, marginBottom: 80 }} alignItems="center" justifyContent="center">
        <Grid item lg={6} md={9} sm={9} xs={10} style={{ textAlign: 'center' }}>
          <Fade in={isVisible} timeout={1000}>
            <Typography data-testid="title" variant="h5" style={{ color: 'white' }}>
              Find open places in your neighbourhood using our software
            </Typography>
          </Fade>
          <Grow in={isVisible} timeout={1000}>
            <Typography data-testid="content" variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
              Open.is is a platform designed to provide reliable data about the opening state of local businesses. What
              differs us from other services such as Google Maps, we rely on direct relations with our users. Our
              mission is to encourage business owners to manage their places using our software and benefit from all the
              features provided by our platform in order to develop and expand their customer basis.
            </Typography>
          </Grow>
        </Grid>
        <Grow timeout={3000} in={isVisible}>
          <Grid item lg={8}>
            <img
              data-testid="image"
              alt="earth"
              src={`${process.env.REACT_APP_BASE_URL}/images/earth.jpg`}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grow>
      </Grid>
    </div>
  );
};

export default Section1;
