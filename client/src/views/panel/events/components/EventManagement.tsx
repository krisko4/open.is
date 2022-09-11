import { CircularProgress, Grid } from '@mui/material';
import { FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useGetEventByIdQuery } from 'store/api';
import { EventData } from 'store/api/types';
import { EventManagementOptions } from '../enums';
import Overview from './Overview';
import { Participators } from './Participators';
import { Rewards } from './Rewards';
import Statistics from './Statistics';

interface Props {
  eventId: string;
  selectedOption: EventManagementOptions;
}
export const EventManagement: FC<Props> = ({ eventId, selectedOption }) => {
  const { data: event, isFetching } = useGetEventByIdQuery(eventId, { refetchOnMountOrArgChange: true });

  return (
    <Grid container sx={{ height: '100%', overflowX: 'hidden' }}>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      ) : (
        event && (
          <>
            <Grid item xs={6}>
              {selectedOption === EventManagementOptions.REWARDS && <Rewards eventId={event._id} />}
              {selectedOption === EventManagementOptions.OVERVIEW && <Overview event={event} />}
              {selectedOption === EventManagementOptions.STATISTICS && <Statistics eventId={event._id} />}
            </Grid>
            <Grid item container xs={6}>
              <Participators participators={event.participators} />
            </Grid>
          </>
        )
      )}
    </Grid>
  );
};
