import { Alert, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribeLocationMutation } from 'redux-toolkit/api/placesApi';
import { CurrentPlaceProps } from '../../../../redux-toolkit/slices/PlaceProps';
import { useCustomSnackbar } from '../../../../utils/snackbars';
import DialogTransition from '../../../reusable/DialogTransition';
import { LoadingButton } from '../../../reusable/LoadingButton';

interface Props {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlace?: CurrentPlaceProps;
}

export const SubscribeDialog: FC<Props> = ({ isDialogOpen, setDialogOpen }) => {
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const [subscribeLocation, { isLoading }] = useSubscribeLocationMutation();
  const { locationId } = useParams();

  const addSubscription = async () => {
    try {
      await subscribeLocation(locationId as string).unwrap();
      enqueueSuccessSnackbar('You have subscribed to a new place');
      setDialogOpen(false);
    } catch (err) {
      enqueueErrorSnackbar();
    }
  };

  return (
    <Dialog TransitionComponent={DialogTransition} open={isDialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>
        <Grid container direction="column">
          <Typography variant="h6">Subscribe to a new place</Typography>
          <Typography variant="caption">Set a subscription and benefit from regular visits</Typography>
        </Grid>
      </DialogTitle>
      <Grid container justifyContent="center">
        <Typography variant="h6">Why should I subscribe?</Typography>
        <CardMedia
          style={{ height: 300, marginTop: 20 }}
          component="img"
          src="https://cdn.dribbble.com/users/7709373/screenshots/15601987/media/2866e963d360e43b8ceb08eedbc3b673.gif"
        ></CardMedia>
      </Grid>
      <DialogContent>
        <Typography variant="h6">You will:</Typography>
        <Grid container justifyContent="center">
          <Alert variant="outlined" sx={{ flexGrow: 1 }}>
            receive notifications whenever a new event or important information is added
          </Alert>
          <Alert variant="outlined" sx={{ flexGrow: 1, mt: 1 }}>
            always be informed about bargains and special offers
          </Alert>
          <Alert variant="outlined" sx={{ flexGrow: 1, mt: 1 }}>
            receive personal coupons and promo codes
          </Alert>
        </Grid>
      </DialogContent>

      <DialogActions>
        <LoadingButton loading={isLoading} disabled={isLoading} onClick={() => addSubscription()} color="primary">
          Subscribe
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
