import { Collapse, Fade, Grow } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { StyledSection, StyledVideo } from './Section1';
import { VideoSection } from './VideoSection';

interface Props {
  isVisible: boolean;
  isVisible1: boolean;
}

const Section3: FC<Props> = ({ isVisible, isVisible1 }) => {
  return (
    <VideoSection isVisible={isVisible} videoSource={`${import.meta.env.VITE_BASE_URL}/images/growth.mp4`}>
      <Grid
        container
        sx={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))', zIndex: 1, height: '100%' }}
        justifyContent="center"
        alignItems="flex-end"
        data-testid="content"
      >
        <Fade in={isVisible1} timeout={1000}>
          <Grid item lg={6} xs={10} style={{ textAlign: 'center', marginBottom: 100 }}>
            <Typography variant="h3" style={{ color: 'white', fontFamily: 'georgia' }}>
              Watch your business grow using our dedicated panel
            </Typography>
            <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10, textAlign: 'center' }}>
              Your success is our goal. For this reason we have built a platform where our users are able to manage
              their places and keep track of all the activity related to their businesses. Using interactive charts, you
              can observe the amount of people visiting your profile and sharing their opinions on daily basis.
            </Typography>
          </Grid>
        </Fade>
      </Grid>
    </VideoSection>
  );
};

export default Section3;
