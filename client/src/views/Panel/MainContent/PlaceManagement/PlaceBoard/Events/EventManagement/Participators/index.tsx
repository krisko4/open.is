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
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: true,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: true,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: true,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: false,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: true,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: true,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: false,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
    isSubscriber: true,
  },
  {
    firstName: 'Patrick Watson',
    img: 'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
    email: 'patrick@gmail.com',
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
            <Typography>Total: 20</Typography>
            <Typography>Subscribers: 10</Typography>
            <Typography>Non-subscribers: 10</Typography>
          </Grid>
          <Alert variant="outlined" sx={{ mt: 1 }} severity="info">
            50% of all participators are subscribers
          </Alert>
          <Divider sx={{ pt: 1, pb: 1 }} />
          <ParticipatorList participators={PARTICIPATORS} />
        </Grid>
      </Grid>
    </Paper>
  );
};
