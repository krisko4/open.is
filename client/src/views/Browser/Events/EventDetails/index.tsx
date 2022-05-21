import { Slide, Divider, Alert, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { EventData } from 'redux-toolkit/api/types';
import { CachedEvent } from 'components/Event/CachedEvent';
import { useLoginContext } from 'contexts';
import { useCustomSnackbar } from 'utils/snackbars';
import { Subscribe } from './Subscribe';
import { Participate } from './Participate';
import { useGetEventByIdQuery } from 'redux-toolkit/api';
import { useParams } from 'react-router';

export const EventDetails: FC = () => {
  const { id } = useParams();
  const { data: event, isFetching } = useGetEventByIdQuery(id as string);

  return (
    <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }} justifyContent="center">
      {isFetching ? (
        <Grid container alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        event && (
          <Grid container>
            <Grid item xs={7} container justifyContent="center">
              <Grid item container xs={11} direction="column" alignItems="center" justifyContent="center">
                <Slide in={true} direction="right" timeout={1000}>
                  <div>
                    <Participate participators={event.participators} />
                  </div>
                </Slide>
                <Divider sx={{ width: '100%', mt: 5, mb: 5 }} />
                <Slide in={true} direction="up" timeout={1000}>
                  <div>
                    <Subscribe event={event} />
                  </div>
                </Slide>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" justifyContent="center" xs={5}>
              <Slide in={true} direction="left" timeout={1000}>
                <Grid item xs={8}>
                  <CachedEvent eventData={event} />
                </Grid>
              </Slide>
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  );
};
