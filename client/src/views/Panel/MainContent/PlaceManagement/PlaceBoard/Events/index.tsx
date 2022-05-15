import { Alert, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetEventsByLocationIdQuery } from 'redux-toolkit/api';
import { Options } from './enums';
import { EventList } from './EventList';
import { NewEvent } from './NewEvent';
import { NoEvents } from './NoEvents';

export const Events: FC = () => {
  const { locationId } = useParams();
  const { data: events, isLoading } = useGetEventsByLocationIdQuery(locationId as string);
  const [selectedOption, setSelectedOption] = useState<Options | null>(Options.NO_EVENTS);

  useEffect(() => {
    console.log(events);
    if (events && events.length > 0) {
      setSelectedOption(Options.EVENT_LIST);
      return;
    }
    setSelectedOption(Options.NO_EVENTS);
  }, [events]);

  return (
    <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
      {isLoading ? (
        <CircularProgress />
      ) : (
        events && (
          <>
            {selectedOption === Options.NO_EVENTS && <NoEvents setSelectedOption={setSelectedOption} />}
            {selectedOption === Options.EVENT_LIST && (
              <EventList setSelectedOption={setSelectedOption} events={events} />
            )}
            {selectedOption === Options.NEW_EVENT && <NewEvent />}
          </>
        )
      )}
    </Grid>
  );
};
