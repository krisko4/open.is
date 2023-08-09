import { CardMedia, Collapse, Fade, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StyleProps {
  gradient2: number;
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  banner: {
    height: '100%',
    color: 'white',
    background: (props) => `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, ${props.gradient2}))`,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    position: 'absolute',
    // position: 'fixed',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // zIndex: -1,
  },
  bannerTitle: {
    color: 'white',
    fontFamily: 'Georgia',
  },
  button: {
    minWidth: 250,
    minHeight: 60,
    marginTop: 20,
  },
}));

export const Banner: FC = () => {
  const navigate = useNavigate();
  const [gradient2, setGradient2] = useState(0);
  const classes = useStyles({ gradient2: gradient2 });

  const handleScroll = () => {
    setGradient2(window.scrollY * 0.002);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Fade in={true} timeout={1500}>
      <div style={{ height: '100vh' }}>
        <video className={classes.backgroundVideo} autoPlay muted loop>
          <source src={`${import.meta.env.VITE_BASE_URL}/images/back.mp4`} type="video/mp4" />
        </video>
        <Grid container alignItems="center" className={classes.banner}>
          <Grid item container lg={6} justifyContent="center">
            <Grid item lg={10} xs={8} sm={10} sx={{ textAlign: 'center', pt: '50px' }}>
              <Collapse in={window.scrollY < 150} timeout={1500}>
                <Typography className={classes.bannerTitle} variant="h3">
                  An easy way to track open destinations all over the world
                </Typography>
                <Button
                  // color="error"
                  className={classes.button}
                  onClick={() => navigate('/search')}
                  variant="contained"
                >
                  Get started
                </Button>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};
