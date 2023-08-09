import { Grid, Slide, Typography } from '@mui/material';
import { CachedEvent } from 'components/Event/CachedEvent';
import { FC } from 'react';
import { EventData } from 'store/api/types';

interface Props {
  event: EventData;
}

const Overview: FC<Props> = ({ event }) => {
  return (
    <Slide in={true} timeout={1000} direction="right">
      <Grid container sx={{ p: 3 }} justifyContent="center">
        <Typography variant="h2">Overview</Typography>
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <Grid item xs={8} sx={{ mt: 3 }}>
            <CachedEvent eventData={event} />
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Overview;
