import { Grid } from '@mui/material';
import { FC } from 'react';
import { EventData } from 'redux-toolkit/api/types';

interface Props {
  event?: EventData;
}

export const EventDetails: FC<Props> = ({ event }) => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <h1>Hello</h1>
    </Grid>
  );
};
