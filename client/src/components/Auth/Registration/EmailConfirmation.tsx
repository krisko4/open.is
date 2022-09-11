import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DialogTransition } from 'components/Transitions';
import React, { FC, useState } from 'react';
import { useEmailSelector } from 'store/slices/emailSlice';
import { resendConfirmationEmail } from '../../../api/auth';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useCustomSnackbar } from '../../../utils/snackbars';

export const EmailConfirmation: FC = () => {
  const { confirmationOpen, setConfirmationOpen, setLoginOpen } = useAuthContext();
  const { enqueueSuccessSnackbar } = useCustomSnackbar();
  const [loading, setLoading] = useState(false);
  const email = useEmailSelector();

  const resendEmail = async (mail: string) => {
    setLoading(true);
    try {
      await resendConfirmationEmail(mail);
      enqueueSuccessSnackbar('Confirmation e-mail sent successfully.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={confirmationOpen} keepMounted TransitionComponent={DialogTransition} fullWidth={true} maxWidth={'xs'}>
      <Grid container style={{ marginTop: 10 }} justifyContent="center">
        <Grid item lg={6} style={{ textAlign: 'center' }}>
          <Typography variant="h4">Thank you!</Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 20 }} justifyContent="center">
        <Grid item lg={10} style={{ textAlign: 'center' }}>
          <Typography>
            Your account has been created, but is inactive. Activation message has been sent to your e-mail:
            <br /> <b>{email}</b>
            <br />
            To activate your account, please visit your e-mail. In case you have not received an e-mail, please press
            the button below.
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 20, marginBottom: 20 }} justifyContent="center">
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          disabled={loading}
          onClick={() => resendEmail(email)}
        >
          Resend confirmation e-mail
        </LoadingButton>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>Once confirmed, your account will be available to use.</Typography>
      </Grid>
      <Grid container style={{ marginTop: 10 }}>
        <Grid item style={{ marginLeft: 5, marginBottom: 5 }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              setConfirmationOpen(false);
              setLoginOpen(true);
            }}
          >
            Return
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
