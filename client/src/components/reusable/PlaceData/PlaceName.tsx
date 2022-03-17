import { Typography } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { useNameSelector } from 'redux-toolkit/slices/currentPlaceSlice';

export const PlaceName: FC = () => {
  const name = useNameSelector();
  return (
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            {name || 'This is the name of your business'}
        </Typography>

  );
};
