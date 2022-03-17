import { Collapse, Fade, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StyleProps {
  gradient2: number
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  bannerTitle: {
    color: 'white',
    fontFamily: 'Georgia',
  },
  button: {
    minWidth: 250,
    minHeight: 60,
    marginTop: 20,
  },
  banner: {
    height: 1200,
    backgroundPosition: 'center',
    backgroundImage: props => `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, ${props.gradient2})), url(https://images.unsplash.com/photo-1437196582938-795c4854b3da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
  },
}));


export const Banner: FC = () => {

  const navigate = useNavigate();
  const [gradient2, setGradient2] = useState(0);
  const classes = useStyles({ gradient2: gradient2 });

  const handleScroll = () => {

    // setGradient1(window.scrollY * 0.001)
    setGradient2(window.scrollY * 0.002);

  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
        <Fade in={true} timeout={1000}>
            <Grid container className={classes.banner} alignItems="center">
                <Grid item container lg={8} justifyContent="center">
                    <Grid item lg={7} md={7} sm={7} style={{ textAlign: 'center', marginBottom: 200 }}>
                        <Collapse in={window.scrollY < 150} timeout={1500}>
                            <Typography variant="h3" color="common.white" >
                                An easy way to track open destinations all over the world
                            </Typography>
                        </Collapse>
                        <Fade in={window.scrollY < 150} timeout={2000}>
                            <Button color="error" className={classes.button} onClick={() => navigate('/search')}
                                variant="contained">Get started</Button>
                        </Fade>
                    </Grid>
                </Grid>
            </Grid>
        </Fade>
  );
};

