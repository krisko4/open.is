import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Alert, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useParticipateMutation, useUnparticipateMutation } from 'store/api';
import { EventDetails } from 'store/api/types';
import { useCustomSnackbar } from 'utils/snackbars';

interface Props {
  event: EventDetails;
}

export const Participate: FC<Props> = ({ event }) => {
  const { id } = useParams();
  const { participators, isUserOwner } = event;
  const [participate, { isLoading }] = useParticipateMutation();
  const [unparticipate, { isLoading: isUnparticipateLoading }] = useUnparticipateMutation();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const isParticipator = useMemo(() => {
    return participators.some((user) => user._id === localStorage.getItem('uid'));
  }, [participators]);
  const [color, setColor] = useState<'error' | 'success'>(isParticipator ? 'success' : 'error');
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
        {isUserOwner ? (
          <>
            <Typography variant="h2">You are participating</Typography>
            <Tooltip arrow title="You are the owner of an event">
              <CheckIcon color={'success'} sx={{ width: 200, height: 200 }} />
            </Tooltip>
          </>
        ) : isParticipator ? (
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
