import { useEndDateSelector, useStartDateSelector } from 'redux-toolkit/slices/eventSlice';
import { Typography } from '@mui/material';
import { FC } from 'react';

export const EventDate: FC = () => {
  const startDate = useStartDateSelector();
  const endDate = useEndDateSelector();
  return (
    <Typography variant="body2" color="primary">
      {startDate || 'start'} - {endDate || 'end'}
    </Typography>
  );
};
