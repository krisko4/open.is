import { Grid } from '@mui/material';
import { FC } from 'react';
import { RatingCard } from 'views/panel/placeDashboard/components/RatingCard';

export const OpinionCharts: FC = () => {
  return (
    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      <Grid item lg={6}>
        <RatingCard />
      </Grid>
    </Grid>
  );
};
