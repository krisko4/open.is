import { Fade, Grid, Typography } from '@mui/material';

export const EventFinished = () => {
  return (
    <Fade in={true} timeout={1000}>
      <Grid container item sx={{ height: '100%' }} justifyContent="center" alignItems="center">
        <Grid item sx={{ textAlign: 'center' }} xs={9}>
          <Typography sx={{ marginBottom: '1rem' }} variant="h5">
            This event has already finished. We hope everything went according to the plan😎
          </Typography>
          <img src={`${import.meta.env.VITE_BASE_URL}/images/event_finished.gif`} />
        </Grid>
      </Grid>
    </Fade>
  );
};
