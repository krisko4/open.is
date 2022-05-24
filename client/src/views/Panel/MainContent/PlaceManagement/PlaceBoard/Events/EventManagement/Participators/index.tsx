import Scrollbars from 'react-custom-scrollbars';
import {
  Paper,
  Divider,
  Button,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { useMemo, FC } from 'react';
import { EventData } from 'redux-toolkit/api/types';
import { ParticipatorList } from './ParticipatorList';
const PARTICIPATORS = [
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: true,
  },
  {
    firstName: 'robert',
    img: '',
    email: 'kuku',
    isSubscriber: false,
  },
];

interface Props {
  participators: any[];
}

export const Participators: FC<Props> = ({ participators }) => {
  //   const subPercentage = useMemo(() => {
  //     const { participators } = event;
  //     let count = 0;
  //     if (participators.length === 0) return 0;
  //     participators.forEach((participator) => {
  //       if (participator.isSubscriber) {
  //         count++;
  //       }
  //     });
  //     return (count / participators.length) * 100;
  //   }, [participators]);

  return (
    <Paper>
      <Grid container justifyContent="center" sx={{ pt: 3, pb: 3 }}>
        <Typography variant="h2">Participators</Typography>
        <Grid item xs={10}>
          <Grid container justifyContent="space-between">
            <Typography>Total: 10</Typography>
            <Typography>Subscribers: 10</Typography>
            <Typography>Non-subscribers: 10</Typography>
          </Grid>
          <Alert variant="outlined" sx={{ mt: 1 }} severity="info">
            70% of all participators are subscribers
          </Alert>
          <Divider sx={{ pt: 1, pb: 1 }} />
          <ParticipatorList participators={PARTICIPATORS} />
        </Grid>
      </Grid>
    </Paper>
  );
};
