import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { SubscriptionsTable } from './components/SubscriptionsTable';

export const Subscriptions: FC = () => {
  return (
    <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
      <Grid item xs={11}>
        <SubscriptionsTable />
      </Grid>
    </Grid>
  );
};
