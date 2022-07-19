import Scrollbars from 'react-custom-scrollbars';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { EventData } from 'redux-toolkit/api/types';
import { Participators } from './Participators';
import { Rewards } from './Rewards';
import { EventManagementOptions } from '../enums';
import Overview from './Overview';
import Statistics from './Statistics';

interface Props {
  event: EventData;
  selectedOption: EventManagementOptions;
}
export const EventManagement: FC<Props> = ({ event, selectedOption }) => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={6}>
        {selectedOption === EventManagementOptions.REWARDS && <Rewards eventId={event._id} />}
        {selectedOption === EventManagementOptions.OVERVIEW && <Overview event={event} />}
        {selectedOption === EventManagementOptions.STATISTICS && <Statistics eventId={event._id} />}
      </Grid>
      <Grid item container xs={6}>
        <Participators participators={event.participators} />
      </Grid>
    </Grid>
  );
};
