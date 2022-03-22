import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import { Fade, Grow, Zoom } from '@mui/material';

interface Props {
  isVisible: boolean;
}

const Section4: FC<Props> = ({ isVisible }) => {
  return (
    <Grid container style={{ background: '#F8F8F8', height: 700, paddingTop: 50 }} justifyContent="center">
      <Grow in={true}>
        <Grid item container lg={5} xs={10} alignItems="center">
          <Fade in={isVisible} timeout={1000}>
            <div data-testid="content">
              <Typography variant="h5" style={{ color: '#3c4858' }}>
                Rate places and share your opinion with community
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'grey', marginTop: 10 }}>
                Your feedback is extremely important. By sharing your insights, you can encourage other people to visit
                a place or constructively criticise place owners and their staff for their services.
              </Typography>
            </div>
          </Fade>
        </Grid>
      </Grow>
      <Zoom in={true} timeout={500}>
        <Grid item container lg={5}>
          <img
            alt="gifik"
            src={'https://cdn.dribbble.com/users/149434/screenshots/4648999/media/5c3f4d529f815548b49997f967a6d65d.gif'}
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Grid>
      </Zoom>
    </Grid>
  );
};

export default Section4;
