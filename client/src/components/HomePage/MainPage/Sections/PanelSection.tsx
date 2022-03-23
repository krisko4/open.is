import { Grid, Collapse, Typography, Fade } from '@mui/material';
import { FC } from 'react';

interface Props {
  isVisible1: boolean;
  isVisible2: boolean;
}

export const PanelSection: FC<Props> = ({ isVisible1, isVisible2 }) => {
  return (
    <Grid
      justifyContent="center"
      container
      style={{ overflowX: 'clip', background: 'linear-gradient(0deg, rgba(248,248,248,1) 4%, rgba(0,0,0,1) 20%)' }}
    >
      <Grid item style={{ marginTop: 20 }} xs={8}>
        <Fade in={isVisible1} timeout={2000}>
          <img
            data-testid="dark-panel"
            alt="dark-panel"
            src={`${process.env.REACT_APP_BASE_URL}/images/dark_panel.png`}
            style={{ width: '100%', marginTop: 100, transform: 'translate(20%, 5%) rotate(-40deg) skew(20deg,10deg)' }}
          />
          {/* <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/dashboard.jpg`}
                        style={{ height: 600, marginTop: 100, transform: 'translate(27%, 5%) rotate(-40deg) skew(20deg,10deg)' }}
                    /> */}
        </Fade>
        <Fade in={isVisible2} timeout={2000}>
          <img
            data-testid="light-panel"
            alt="light-panel"
            src={`${process.env.REACT_APP_BASE_URL}/images/light_panel.png`}
            style={{
              width: '100%',
              marginTop: 100,
              transform: 'translate(-27%, -15%) rotate(40deg) skew(10deg,-10deg)',
            }}
          />
          {/* <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/dashboard.jpg`}
                        style={{ height: 600, marginTop: 100, transform: 'translate(-27%, -15%) rotate(40deg) skew(10deg,-10deg)' }}
                    /> */}
        </Fade>
      </Grid>
    </Grid>
  );
};
