import { Grow, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

interface Props {
  isVisible: boolean;
}

const Section3: FC<Props> = ({ isVisible }) => {
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item container lg={5} md={8} xs={10} alignItems="center">
        <Grow in={isVisible} {...(isVisible ? { timeout: 3000 } : {})}>
          <div data-testid="content" style={{ textAlign: 'center' }}>
            <Typography variant="h5" style={{ color: 'white' }}>
              Locate your desired place by address or name
            </Typography>
            <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
              Access the information about most recent news from places you would like to visit. Find out about upcoming
              events, bargains or parties. Order food from your favourite restaurant via UberEats or book a visit to a
              hairdresser.
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
      <Fade in={isVisible} timeout={3000}>
        <Grid item lg={5}>
          <img
            data-testid="image"
            src={'https://cdn.dribbble.com/users/568/screenshots/2937224/browserpreview_tmp.gif'}
            alt="preview"
            style={{ width: '100%' }}
          />
        </Grid>
      </Fade>
    </Grid>
  );
};

export default Section3;
