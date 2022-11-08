import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { DialogTransition } from 'components/Transitions';
import React, { useState } from 'react';
import { useCreateInvitationMutation, useGetInvitationsByReferralIdQuery } from 'store/api';
import { Referral } from 'store/api/types';
import { useCustomSnackbar } from 'utils/snackbars';
import InvitedUserCard from './InvitedUserCard';

type Props = {
  onClose: () => void;
  isDialogOpen: boolean;
  referral: Referral | null;
};
const InvitationsDialog = ({ onClose, referral, isDialogOpen }: Props) => {
  const [email, setEmail] = useState('');
  const [invite, { isLoading }] = useCreateInvitationMutation();
  const { data: invitations } = useGetInvitationsByReferralIdQuery(referral ? referral._id : skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  const handleClick = async () => {
    if (!referral) return;
    try {
      await invite({
        invitedEmail: email,
        referralId: referral._id,
      }).unwrap();
      setEmail('');
      enqueueSuccessSnackbar('You have successfully invited your friend');
    } catch (error: any) {
      const message = error.data.message;
      enqueueErrorSnackbar(
        (() => {
          switch (message) {
            case 'INVALID_EMAIL':
              return 'This is not a valid e-mail address';
            case 'USER_NOT_FOUND':
              return `We have not found a user with e-mail: ${email}`;
            case 'USER_ALREADY_INVITED':
              return `User with e-mail: ${email} has already been invited`;
            case 'USER_ALREADY_SUBSCRIBES':
              return `User with e-mail: ${email} is already a subscriber`;
            case 'USER_IS_REFERRER':
              return `Are you sure you would like to invite yourself?`;
            default:
              return undefined;
          }
        })()
      );
    }
  };
  return (
    <Dialog fullWidth TransitionComponent={DialogTransition} open={isDialogOpen} onClose={onClose}>
      <DialogTitle>
        <Grid container direction="column">
          <Typography variant="h6">My invitations</Typography>
          <Typography variant="caption">Invite your friends in order to receive a reward</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ mt: '10px' }} alignItems="center">
          <TextField
            onChange={handleChange}
            value={email}
            sx={{ flexGrow: 1 }}
            label="Enter the e-mail address of your friend"
            variant="outlined"
          />
          <LoadingButton
            loading={isLoading}
            onClick={handleClick}
            disabled={!email}
            sx={{ ml: 1 }}
            size="large"
            variant="contained"
            color="primary"
          >
            Invite
          </LoadingButton>
        </Grid>
        {invitations && invitations.invitedUsers.map((u) => <InvitedUserCard key={u._id} user={u} />)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationsDialog;
