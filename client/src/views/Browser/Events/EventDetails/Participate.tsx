import { Alert, Tooltip, Typography, Grid, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useUnparticipateMutation, useParticipateMutation } from 'redux-toolkit/api';
import { useCustomSnackbar } from 'utils/snackbars';
import { useParams } from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

const isParticipator = (uid: string, participators: any[]) => {
  return participators.some((user) => user._id === uid);
};

interface Props {
  participators: any[];
}

export const Participate: FC<Props> = ({ participators }) => {
  const { id } = useParams();
  const [participate, { isLoading }] = useParticipateMutation();
  const [unparticipate, { isLoading: isUnparticipateLoading }] = useUnparticipateMutation();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const [color, setColor] = useState<'error' | 'success'>(
    isParticipator(localStorage.getItem('uid') as string, participators) ? 'success' : 'error'
  );
  const setParticipation = async (status: boolean) => {
    if (id) {
      try {
        if (status) {
          await participate(id);
          enqueueSuccessSnackbar('You will participate in this event');
          return;
        }
        await unparticipate(id);
        enqueueSuccessSnackbar('You have cancelled your participation');
      } catch (err) {
        enqueueErrorSnackbar();
      }
    }
  };
  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid item sx={{ textAlign: 'center' }}>
        {isParticipator(localStorage.getItem('uid') as string, participators) ? (
          <>
            <Typography variant="h2">You are participating</Typography>
            <Tooltip arrow title="Cancel participation">
              <IconButton
                onClick={() => setParticipation(false)}
                onMouseEnter={() => setColor('error')}
                onMouseLeave={() => setColor('success')}
              >
                {color === 'error' ? (
                  <CancelIcon color={color} sx={{ width: '200px', height: '200px' }} />
                ) : (
                  <CheckIcon color={color} sx={{ width: 200, height: 200 }} />
                )}
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Typography variant="h2">Participate</Typography>
            <Tooltip arrow title="Participate">
              <IconButton
                onClick={() => setParticipation(true)}
                onMouseEnter={() => setColor('success')}
                onMouseLeave={() => setColor('error')}
              >
                <EventAvailableIcon color={'info'} sx={{ width: 200, height: 200 }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Grid>
      <Grid item>
        <Alert variant="outlined" severity="success">
          You will receive notifications regarding this event
        </Alert>
      </Grid>
    </Grid>
  );
};
