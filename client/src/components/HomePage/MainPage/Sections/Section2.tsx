import { Collapse, Grow, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { StyledSection, StyledVideo } from './Section1';
import { VideoSection } from './VideoSection';

interface Props {
  isVisible: boolean;
}

const Section2: FC<Props> = ({ isVisible }) => {
  return (
    <VideoSection isVisible={isVisible} videoSource={`${process.env.REACT_APP_BASE_URL}/images/section2.mp4`}>
      <Grid
        container
        sx={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))', height: '100%' }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={6} xs={10}>
          <Grow in={isVisible} {...(isVisible ? { timeout: 3000 } : {})}>
            <div data-testid="content" style={{ textAlign: 'center' }}>
              <Typography variant="h3" style={{ color: 'white', fontFamily: 'georgia' }}>
                Locate the desired place easily
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10 }}>
                Access the information about most recent news from places you would like to visit. Find out about
                upcoming events, bargains or parties. Order food from your favourite restaurants via UberEats or book a
                visit to a hairdresser.
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
    </VideoSection>
  );
};

export default Section2;
