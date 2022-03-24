import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC, useEffect, useRef, useState } from 'react';
import { CardMedia, Fade, Grow } from '@mui/material';
import { styled } from '@mui/styles';

interface Props {
  videoSource: string;
  isVisible: boolean;
}

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

export const VideoSection: FC<Props> = ({ children, isVisible, videoSource }) => {
  return (
    <Fade in={isVisible} timeout={1000}>
      <StyledSection>
        <StyledVideo autoPlay muted loop>
          <source src={videoSource} type="video/mp4" />
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
          <Fade in={true} timeout={1000}>
            <Grid container sx={{ height: '100%', zIndex: 1 }}>
              {children}
            </Grid>
          </Fade>
        </Grid>
      </StyledSection>
    </Fade>
  );
};
