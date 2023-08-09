import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { DialogTransition } from 'components/Transitions';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useGetReferralsByLocationIdQuery } from 'store/api';
import { Referral } from 'store/api/types';
import InvitationsDialog from './InvitationsDialog';
import ReferralCard from './ReferralCard';

interface Props {
  isDialogOpen: boolean;
  onClose: () => void;
}

export const ReferralDialog: FC<Props> = ({ isDialogOpen, onClose }) => {
  const [isInvitationsDialogOpen, setInvitationsDialogOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const { locationId } = useParams();
  const { data: referrals, isFetching } = useGetReferralsByLocationIdQuery(locationId as string, {
    refetchOnMountOrArgChange: true,
  });

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
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container sx={{ pt: 1 }}>
          {!isFetching &&
            referrals &&
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
