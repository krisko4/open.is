import KeyboardReturn from '@mui/icons-material/KeyboardReturn';
import SettingsIcon from '@mui/icons-material/Settings';
import { LoadingButton } from '@mui/lab';
import { Button, Grid, IconButton, Toolbar, Tooltip } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useLoginContext } from 'contexts/LoginContext';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetReferralsByLocationIdQuery, useIsUserSubscriberQuery, useUnsubscribeLocationMutation } from 'store/api';
import { useAppDispatch } from 'store/hooks';
import { closePopup, setMapCoords } from 'store/slices/mapSlice';
import { CurrentPlaceProps } from 'store/slices/PlaceProps';
import { useCustomSnackbar } from 'utils/snackbars';
import { ReferralDialog } from './ReferralDialog';
import { SubscribeDialog } from './SubscribeDialog';

interface Props {
  place: CurrentPlaceProps;
}

export const PlaceToolbar: FC<Props> = ({ place }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isReferralDialogOpen, setReferralDialogOpen] = useState(false);
  const { userData } = useLoginContext();
  const { enqueueInfoSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();
  const { data: referrals } = useGetReferralsByLocationIdQuery(place._id as string);
  const { data: isUserSubscriber, isFetching } = useIsUserSubscriberQuery(
    userData.isLoggedIn ? (place._id as string) : skipToken
  );
  const [unsubscribeLocation, { isLoading }] = useUnsubscribeLocationMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { placeId, locationId } = useParams();

  const toggleReferralDialog = () => {
    setReferralDialogOpen((current) => !current);
  };

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
          <>
            {referrals && referrals.length > 0 && (
              <Tooltip title={'Refer this place'} arrow>
                <span>
                  <Button sx={{ mr: 1 }} variant="contained" onClick={toggleReferralDialog} color="primary">
                    Refer this place
                  </Button>
                </span>
              </Tooltip>
            )}
            <Tooltip title={'Unsubscribe'} arrow>
              <span>
                <LoadingButton loading={isFetching || isLoading} color="primary" onClick={() => unsubscribe()}>
                  Subscribed
                </LoadingButton>
              </span>
            </Tooltip>
          </>
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
      <ReferralDialog isDialogOpen={isReferralDialogOpen} referrals={referrals} onClose={toggleReferralDialog} />
      <SubscribeDialog currentPlace={place} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
    </Toolbar>
  );
};
