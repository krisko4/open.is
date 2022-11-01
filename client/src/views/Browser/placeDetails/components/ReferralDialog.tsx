import { LoadingButton } from '@mui/lab';
import { Alert, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { DialogTransition } from 'components/Transitions';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribeLocationMutation } from 'store/api';
import { Referral } from 'store/api/types';
import { CurrentPlaceProps } from 'store/slices/PlaceProps';
import { useCustomSnackbar } from 'utils/snackbars';
import InvitationsDialog from './InvitationsDialog';
import ReferralCard from './ReferralCard';

interface Props {
  isDialogOpen: boolean;
  referrals?: Referral[];
  onClose: () => void;
}

export const ReferralDialog: FC<Props> = ({ referrals, isDialogOpen, onClose }) => {
  const [isInvitationsDialogOpen, setInvitationsDialogOpen] = useState(false);
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const [subscribeLocation, { isLoading }] = useSubscribeLocationMutation();
  const { locationId } = useParams();

  const toggleInvitationsModal = () => {
    setInvitationsDialogOpen((current) => !current);
  };

  return (
    <Dialog TransitionComponent={DialogTransition} open={isDialogOpen} onClose={onClose}>
      <InvitationsDialog isDialogOpen={isInvitationsDialogOpen} onClose={toggleInvitationsModal} />
      <DialogTitle>
        <Grid container direction="column">
          <Typography variant="h6">Refer this place</Typography>
          <Typography variant="caption">Gain rewards by inviting your friends to subscribe this place</Typography>
          <Grid container sx={{ pt: 1 }}>
            {referrals &&
              referrals.map((ref) => (
                <Grid item key={ref._id} sx={{ pb: 1 }} xs={12}>
                  <ReferralCard onInvitationsButtonClick={toggleInvitationsModal} key={ref._id} referral={ref} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
};
