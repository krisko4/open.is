import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTitleSelector } from 'redux-toolkit/slices/eventSlice';

export const EventTitle: FC = () => {
  const title = useTitleSelector();
  return (
    <Typography gutterBottom variant="h5" component="div">
      {title || 'This is a title of your event!'}
    </Typography>
  );
};
