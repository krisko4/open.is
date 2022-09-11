import { Typography } from '@mui/material';
import { FC } from 'react';
import { useEndDateSelector, useStartDateSelector } from 'store/slices/eventSlice';

export const EventDate: FC = () => {
  const startDate = useStartDateSelector();
  const endDate = useEndDateSelector();
  return (
    <Typography variant="body2" color="primary">
      {startDate || 'start'} - {endDate || 'end'}
    </Typography>
  );
};
