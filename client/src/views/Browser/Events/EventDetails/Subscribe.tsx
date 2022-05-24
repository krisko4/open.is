import { Tooltip, Slide, Divider, Alert, Typography, Grid, IconButton, CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { FC, useEffect, useState } from 'react';
import { EventDetails } from 'redux-toolkit/api/types';
import { CachedEvent } from 'components/Event/CachedEvent';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useLoginContext } from 'contexts';
import {
  useSubscribeLocationMutation,
  useUnsubscribeLocationMutation,
  useIsUserSubscriberQuery,
} from 'redux-toolkit/api';
import { useCustomSnackbar } from 'utils/snackbars';

interface Props {
  event: EventDetails;
}
export const Subscribe: FC<Props> = ({ event }) => {
  const { isUserOwner, locationId } = event;
  const { userData } = useLoginContext();
  const { data: isUserSubscriber, isFetching } = useIsUserSubscriberQuery(
    userData.isLoggedIn ? event.locationId : skipToken
  );
  const [subscribeLocation, { isLoading }] = useSubscribeLocationMutation();
  const [unsubscribeLocation, { isLoading: isUnsubLoading }] = useUnsubscribeLocationMutation();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const [color, setColor] = useState<'error' | 'success'>('success');

  useEffect(() => {
    setColor(isUserSubscriber ? 'success' : 'error');
  }, [isUserSubscriber]);

  const setSubscription = async (status: boolean) => {
    try {
      if (status) {
        await subscribeLocation(locationId).unwrap();
        enqueueSuccessSnackbar('You have subscribed to a new place');
        return;
      }
      await unsubscribeLocation(locationId).unwrap();
      enqueueSuccessSnackbar('You have cancelled your subscription');
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };

  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid item xs={6}>
        <Alert variant="outlined" sx={{ mb: 1 }} severity="success">
          You will receive notifications regarding all the events organized by this company
        </Alert>
        <Alert variant="outlined" severity="success">
          You will be included in reward drawings
        </Alert>
      </Grid>
      <Grid item sx={{ textAlign: 'center' }}>
        {isUserOwner ? (
          <>
            <Typography variant="h2">Subscribed</Typography>
            <Tooltip title="You are the owner of an event" arrow>
              <CheckIcon color={'success'} sx={{ width: 200, height: 200 }} />
            </Tooltip>
          </>
        ) : isUserSubscriber ? (
          <>
            <Typography variant="h2">Subscribed</Typography>
            <Tooltip title="Unsubscribe" arrow>
              <IconButton
                onClick={() => setSubscription(false)}
                onMouseEnter={() => setColor('error')}
                onMouseLeave={() => setColor('success')}
              >
                {color === 'error' ? (
                  <CancelIcon color={color} sx={{ width: '200px', height: '200px' }} />
                ) : (
                  <CheckIcon color={color} sx={{ width: 200, height: 200 }} />
                )}
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Typography variant="h2">Subscribe</Typography>
            <Tooltip title="Subscribe" arrow>
              <IconButton onClick={() => setSubscription(true)}>
                <SubscriptionsIcon sx={{ width: 200, color: 'red', height: 200 }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Grid>
    </Grid>
  );
};
