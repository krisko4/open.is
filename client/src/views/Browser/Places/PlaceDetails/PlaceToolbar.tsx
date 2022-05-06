import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
import { LoadingButton } from '@mui/lab';
import SettingsIcon from '@mui/icons-material/Settings';
import { Toolbar, IconButton, Grid, Button, Tooltip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { useCustomSnackbar } from 'utils/snackbars';
import { SubscribeDialog } from './SubscribeDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginContext } from 'contexts/LoginContext';
import { CurrentPlaceProps } from 'redux-toolkit/slices/PlaceProps';
import { setMapCoords, closePopup } from 'redux-toolkit/slices/mapSlice';
import { useIsUserSubscriberQuery, useUnsubscribeLocationMutation } from 'redux-toolkit/api/placesApi';
import { skipToken } from '@reduxjs/toolkit/query';

interface Props {
  place: CurrentPlaceProps;
}

export const PlaceToolbar: FC<Props> = ({ place }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { userData } = useLoginContext();
  const { enqueueInfoSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();
  const { data: isUserSubscriber, isFetching } = useIsUserSubscriberQuery(
    userData.isLoggedIn ? (place._id as string) : skipToken
  );
  const [unsubscribeLocation, { isLoading }] = useUnsubscribeLocationMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { placeId, locationId } = useParams();

  useEffect(() => {
    dispatch(
      setMapCoords({
        lat: place.lat,
        lng: place.lng,
        zoom: 15,
      })
    );
  }, [place, dispatch]);

  const closePlaceDetails = () => {
    dispatch(closePopup());
    navigate('/search');
  };

  const unsubscribe = async () => {
    try {
      await unsubscribeLocation(place._id as string).unwrap();
      enqueueInfoSnackbar('You have cancelled your subscription');
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };

  return (
    <Toolbar style={{ flexGrow: 1 }} disableGutters>
      <IconButton onClick={() => closePlaceDetails()} color="primary" size="large">
        <KeyboardReturn />
      </IconButton>
      <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }} item>
        {userData.isLoggedIn && place.isUserOwner && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            startIcon={<SettingsIcon />}
            onClick={() => navigate(`/panel/management/${placeId}/${locationId}/home`)}
          >
            Manage
          </Button>
        )}
        {isUserSubscriber ? (
          <Tooltip title={'Unsubscribe'} arrow>
            <span>
              <LoadingButton loading={isFetching || isLoading} color="primary" onClick={() => unsubscribe()}>
                Subscribed
              </LoadingButton>
            </span>
          </Tooltip>
        ) : (
          <Tooltip
            title={
              !userData.isLoggedIn
                ? 'Sign in to subscribe'
                : place.isUserOwner
                ? 'You cannot subscribe to your own place'
                : 'Subscribe'
            }
          >
            <span>
              <Button
                disabled={!userData.isLoggedIn || place.isUserOwner}
                variant="contained"
                color="primary"
                onClick={() => setDialogOpen(true)}
              >
                Subscribe
              </Button>
            </span>
          </Tooltip>
        )}
      </Grid>
      <SubscribeDialog currentPlace={place} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
    </Toolbar>
  );
};
