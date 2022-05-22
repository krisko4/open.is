import { useEffect, FC, useState } from 'react';
import messaging, { requestToken } from '../../firebase/firebase';
import { MessagePayload, onMessage } from 'firebase/messaging';
import {
  Button,
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';

interface Notification {
  title: string;
  eventId: string;
  startDate: string;
  endDate: string;
  img: string;
  locationName: string;
}

export const Notification: FC = () => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const navigate = useNavigate();
  onMessage(messaging, (payload: any) => {
    console.log('Received message ', payload);
    if (payload.data) {
      setOpen(true);
      setNotification({
        ...payload.data,
      });
    }
  });

  useEffect(() => {
    requestToken();
  }, []);

  const handleVisit = () => {
    navigate(`/search/events/${notification?.eventId}`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      sx={{ maxWidth: 460 }}
      open={open}
    >
      <SnackbarContent
        message={
          <span>
            <Grid container>
              <Typography variant="h5">{notification?.locationName} has added a new event!</Typography>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ width: 100, height: 100 }} alt={notification?.title} src={notification?.img} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={notification?.title}
                  secondary={
                    <Grid container direction="column">
                      <Typography component="span" sx={{ color: 'lightgrey' }}>
                        starts:
                        <Typography component="span" color="primary">
                          {` ${notification?.startDate}`}
                        </Typography>
                      </Typography>
                      <Typography component="span" sx={{ color: 'lightgrey' }}>
                        ends:
                        <Typography component="span" color="primary">
                          {` ${notification?.endDate}`}
                        </Typography>
                      </Typography>
                    </Grid>
                  }
                />
              </ListItem>
            </Grid>
          </span>
        }
        action={
          <>
            <Button color="primary" onClick={handleVisit} variant="outlined" size="small">
              Visit
            </Button>
            <Button onClick={handleClose} color="secondary" sx={{ ml: 1 }} size="small">
              Close
            </Button>
          </>
        }
      />
    </Snackbar>
  );
};
