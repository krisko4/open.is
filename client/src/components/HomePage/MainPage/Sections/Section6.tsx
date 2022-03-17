
import { Collapse, Fade } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

interface Props {
  isVisible6: boolean,
  isVisible7: boolean
}


const Section6: FC<Props> = ({ isVisible6, isVisible7 }) => {


  return (
        <Grid justifyContent="center" container style={{ overflowX: 'clip', background: 'linear-gradient(0deg, rgba(248,248,248,1) 4%, rgba(0,0,0,1) 20%)' }}>
            <Collapse in={isVisible6} timeout={2000}>
                <Grid container justifyContent="center" style={{ marginTop: 40 }}>
                    <Grid item lg={6} style={{ textAlign: 'center' }} xs={10}>
                        <Typography variant="h5" style={{ color: 'white' }}>Watch your business grow using our dedicated panel</Typography>
                        <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 10, textAlign: 'center' }}>
                            Your success is our goal. For this reason we have built a platform where our users are able
                            to manage their places and keep track of all the activity related to their businesses.
                            Using interactive charts, you can observe the amount of people visiting your profile
                            and sharing their opinions on daily basis.
                        </Typography>
                    </Grid>
                </Grid>
            </Collapse>
            <Grid item style={{ marginTop: 20 }} xs={8}>
                <Fade in={isVisible6} timeout={2000}>
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/images/dark_panel.png`}
                        style={{ width: '100%', marginTop: 100, transform: 'translate(20%, 5%) rotate(-40deg) skew(20deg,10deg)' }}
                    />
                    {/* <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/dashboard.jpg`}
                        style={{ height: 600, marginTop: 100, transform: 'translate(27%, 5%) rotate(-40deg) skew(20deg,10deg)' }}
                    /> */}
                </Fade>
                <Fade in={isVisible7} timeout={2000} >
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/images/light_panel.png`}
                        style={{ width: '100%', marginTop: 100, transform: 'translate(-27%, -15%) rotate(40deg) skew(10deg,-10deg)' }}
                    />
                    {/* <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/dashboard.jpg`}
                        style={{ height: 600, marginTop: 100, transform: 'translate(-27%, -15%) rotate(40deg) skew(10deg,-10deg)' }}
                    /> */}
                </Fade>


            </Grid>
        </Grid >
  );
};

export default Section6;