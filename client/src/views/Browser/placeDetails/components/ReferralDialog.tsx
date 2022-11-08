import { Button, Dialog, DialogActions, DialogTitle, Grid, Typography } from '@mui/material';
import { DialogTransition } from 'components/Transitions';
import React, { FC, useState } from 'react';
import { Referral } from 'store/api/types';
import InvitationsDialog from './InvitationsDialog';
import ReferralCard from './ReferralCard';

interface Props {
  isDialogOpen: boolean;
  referrals?: Referral[];
  onClose: () => void;
}

export const ReferralDialog: FC<Props> = ({ referrals, isDialogOpen, onClose }) => {
  const [isInvitationsDialogOpen, setInvitationsDialogOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const toggleInvitationsModal = (referral: Referral | null) => {
    setSelectedReferral(referral);
    setInvitationsDialogOpen((current) => !current);
  };

  return (
    <Dialog fullWidth TransitionComponent={DialogTransition} open={isDialogOpen} onClose={onClose}>
      <InvitationsDialog
        referral={selectedReferral}
        isDialogOpen={isInvitationsDialogOpen}
        onClose={() => toggleInvitationsModal(null)}
      />
      <DialogTitle>
        <Grid container direction="column">
          <Typography variant="h6">Refer this place</Typography>
          <Typography variant="caption">Gain rewards by inviting your friends to subscribe this place</Typography>
          <Grid container sx={{ pt: 1 }}>
            {referrals &&
              referrals.map((ref) => (
                <Grid item key={ref._id} sx={{ pb: 1 }} xs={12}>
                  <ReferralCard
                    onInvitationsButtonClick={() => toggleInvitationsModal(ref)}
                    key={ref._id}
                    referral={ref}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
