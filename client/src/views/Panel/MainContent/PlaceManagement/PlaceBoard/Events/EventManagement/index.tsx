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
import { Participators } from './Participators';
import { Rewards } from './Rewards';

interface Props {
  event: EventData;
}
export const EventManagement: FC<Props> = ({ event }) => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid item xs={6}>
        <Rewards eventId={event._id} />
      </Grid>
      <Grid item container xs={6}>
        <Participators participators={event.participators} />
      </Grid>
    </Grid>
  );
};
