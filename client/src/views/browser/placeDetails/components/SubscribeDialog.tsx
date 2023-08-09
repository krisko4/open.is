import { CheckBox } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { getCodeByValueAndLocationId } from 'api/codes';
import { DialogTransition } from 'components/Transitions';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSubscribeLocationMutation } from 'store/api';
import { CurrentPlaceProps } from 'store/slices/PlaceProps';
import { useCustomSnackbar } from 'utils/snackbars';

interface Props {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlace?: CurrentPlaceProps;
}

export const SubscribeDialog: FC<Props> = ({ isDialogOpen, setDialogOpen }) => {
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const [subscribeLocation, { isLoading }] = useSubscribeLocationMutation();
  const [code, setCode] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [referralDetails, setReferralDetails] = useState(null);
  const { locationId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleClick = async () => {
    try {
      setSubmitting(true);
      const res = await getCodeByValueAndLocationId(code, locationId as string);
      setReferralDetails(res.data);
      if (res.data) {
        enqueueSuccessSnackbar('The code is valid');
      }
    } catch (err) {
      enqueueErrorSnackbar();
      setReferralDetails(null);
    } finally {
      setSubmitting(false);
    }
  };

  const addSubscription = async () => {
    try {
      await subscribeLocation({ locationId: locationId as string, referralCode: code }).unwrap();
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
        <Grid container sx={{ mt: '10px' }} alignItems="center">
          <TextField
            InputProps={{
              endAdornment: referralDetails && (
                <Fade in={true} timeout={1000}>
                  <InputAdornment position="start">
                    <CheckCircleIcon sx={{ color: '#81c784' }} />
                  </InputAdornment>
                </Fade>
              ),
            }}
            onChange={handleChange}
            value={code}
            sx={{ flexGrow: 1 }}
            label="Enter the referral code"
            placeholder="This is my referral code!"
            variant="outlined"
          />
          <LoadingButton
            loading={isLoading}
            onClick={handleClick}
            disabled={!code}
            sx={{ ml: 1 }}
            size="large"
            variant="contained"
            color="primary"
          >
            Submit
          </LoadingButton>
        </Grid>
        <Grid container sx={{ mt: '10px' }} justifyContent="center">
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
