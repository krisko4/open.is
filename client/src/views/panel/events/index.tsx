import { Alert, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetEventsByLocationIdQuery } from 'store/api';
import { EventList } from './components/EventList';
import { EventOptions } from './enums';
import { EventsStatistics } from './EventsStatistics';
import { NewEvent } from './NewEvent';
import { NoEvents } from './NoEvents';

export const Events: FC = () => {
  const { locationId } = useParams();
  const { data: events, isLoading } = useGetEventsByLocationIdQuery(locationId as string, {
    refetchOnMountOrArgChange: true,
  });
  const [selectedOption, setSelectedOption] = useState<EventOptions | null>(EventOptions.NO_EVENTS);

  useEffect(() => {
    if (events && events.length > 0) {
      setSelectedOption(EventOptions.EVENT_LIST);
      return;
    }
    setSelectedOption(EventOptions.NO_EVENTS);
  }, [events]);

  return (
    <Grid container sx={{ height: '100%' }} direction="column">
      {isLoading ? (
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        events && (
          <>
            {selectedOption === EventOptions.NO_EVENTS && <NoEvents setSelectedOption={setSelectedOption} />}
            {selectedOption === EventOptions.EVENTS_STATISTICS && <EventsStatistics />}
            {selectedOption === EventOptions.EVENT_LIST && (
              <EventList setSelectedOption={setSelectedOption} events={events} />
            )}
            {selectedOption === EventOptions.NEW_EVENT && <NewEvent />}
          </>
        )
      )}
    </Grid>
  );
};