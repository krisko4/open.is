import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useRef, FC, useEffect, useState } from 'react';
import { CardMedia, Fade, Grow } from '@mui/material';
import { styled } from '@mui/styles';
import { VideoSection } from './VideoSection';

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
    <VideoSection isVisible={isVisible} videoSource={`${process.env.REACT_APP_BASE_URL}/images/section1vid.mp4`}>
      <Grid
        container
        sx={{ background: 'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))', height: '100%' }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} md={8} lg={6} sx={{ textAlign: 'center' }}>
          <Typography data-testid="title" variant="h3" style={{ color: 'white', fontFamily: 'georgia' }}>
            Find open places in your neighbourhood using our software
          </Typography>
          <Typography data-testid="content" variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
            Open.is is a platform designed to provide reliable data about the opening state of local businesses. What
            differs us from other services such as Google Maps, we rely on direct relations with our users. Our mission
            is to encourage business owners to manage their places using our software and benefit from all the features
            provided by our platform in order to develop and expand their customer basis.
          </Typography>
        </Grid>
      </Grid>
    </VideoSection>
  );
};

export default Section1;
