import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { SubscriptionsTable } from './SubscriptionsTable';

export const Subscriptions: FC = () => {
  return (
    <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
      <Grid item xs={10}>
        <SubscriptionsTable />
      </Grid>
    </Grid>
  );
};
