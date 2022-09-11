import { Grid, Typography } from '@mui/material';
import { CachedEvent } from 'components/Event/CachedEvent';
import { FC } from 'react';
import { EventData } from 'store/api/types';

interface Props {
  event: EventData;
}

const Overview: FC<Props> = ({ event }) => {
  return (
    <Grid container sx={{ p: 3 }} justifyContent="center">
      <Typography variant="h2">Overview</Typography>
      <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
        <Grid item xs={8} sx={{ mt: 3 }}>
          <CachedEvent eventData={event} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Overview;
