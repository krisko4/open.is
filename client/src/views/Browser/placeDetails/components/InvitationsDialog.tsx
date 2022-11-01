import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { DialogTransition } from 'components/Transitions';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  onClose: () => void;
  isDialogOpen: boolean;
};
const InvitationsDialog = ({ onClose, isDialogOpen }: Props) => {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  const handleClick = async () => {
    try {
    } catch (error) {}
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
        <Grid container alignItems="center">
          <TextField
            onChange={handleChange}
            value={email}
            sx={{ flexGrow: 1 }}
            label="Enter the e-mail address of your friend"
            variant="outlined"
          />
          <Button
            onClick={handleClick}
            disabled={!email}
            sx={{ ml: 1 }}
            size="large"
            variant="contained"
            color="primary"
          >
            Invite
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationsDialog;
