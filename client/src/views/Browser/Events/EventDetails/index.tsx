import {
  CardContent,
  Slide,
  Divider,
  Alert,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Card,
} from '@mui/material';
import { FC } from 'react';
import { EventData } from 'redux-toolkit/api/types';
import { CachedEvent } from 'components/Event/CachedEvent';
import { useLoginContext } from 'contexts';
import { useCustomSnackbar } from 'utils/snackbars';
import { Subscribe } from './Subscribe';
import { Participate } from './Participate';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useGetEventByIdQuery } from 'redux-toolkit/api';
import { useParams } from 'react-router';
import Scrollbars from 'react-custom-scrollbars';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CancelIcon from '@mui/icons-material/Cancel';

export const EventDetails: FC = () => {
  const { id } = useParams();
  const { data: event, isFetching } = useGetEventByIdQuery(id as string);

  return (
    <Grid container direction="column" sx={{ flexGrow: 1, overflow: 'hidden' }}>
      {isFetching ? (
        <Grid container sx={{ height: '100%' }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        event && (
          <Scrollbars>
            <Grid container sx={{ pt: 12 }}>
              <Grid item xs={7} container justifyContent="center">
                <Grid item container xs={11} direction="column" alignItems="center" justifyContent="center">
                  <Slide in={true} direction="right" timeout={1000}>
                    <div>
                      <Participate event={event} />
                    </div>
                  </Slide>
                  <Divider sx={{ width: '100%', mt: 5, mb: 5 }} />
                  <Slide in={true} direction="right" timeout={1000}>
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
              <Grid container sx={{ pt: 5, pb: 2 }} justifyContent="center">
                <Grid item xs={10}>
                  <Divider />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Slide in={true} timeout={1000} direction="up">
                  <Typography variant="h2">Rewards</Typography>
                </Slide>
              </Grid>
              <Grid container sx={{ pt: 10, pb: 10 }} justifyContent="space-evenly">
                <Grid item container justifyContent="center" direction="column" alignItems="center" xs={5}>
                  <CancelIcon color="error" sx={{ width: 200, height: 200 }} />
                  <Typography variant="h4">This event has no rewards specified</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h2">What is a reward?</Typography>
                      <Divider />
                      <Grid container item style={{ marginTop: 10 }} xs={11}>
                        <Typography variant="body1">
                          The event organizer has the ability to praise event participators for taking part in the
                          happening. Such reward is a special code, individual for each participator. As a business
                          subscriber, you will be included in codes drawing if you participate in the event and if the
                          event has reward drawing specified. The event organizer decides what kind of priviledge is
                          connected with the code and what percentage of all participators will be rewarded. In order to
                          be included in reward drawings, you should fulfill the following requirements:
                        </Typography>
                        <Grid item>
                          <Alert
                            icon={<SubscriptionsIcon color="error" />}
                            sx={{ mb: 1, mt: 2 }}
                            severity="info"
                            variant="outlined"
                          >
                            Press the subscribe button to become a business subscriber
                          </Alert>
                          <Alert
                            icon={<EventAvailableIcon color="info" />}
                            sx={{ mb: 1 }}
                            severity="info"
                            variant="outlined"
                          >
                            Press the participate button to participate in the event
                          </Alert>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Scrollbars>
        )
      )}
    </Grid>
  );
};
