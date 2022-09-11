import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNameSelector } from 'store/slices/currentPlaceSlice';

export const PlaceName: FC = () => {
  const name = useNameSelector();
  return (
    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
      {name || 'This is the name of your business'}
    </Typography>
  );
};
