import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTypeSelector } from 'store/slices/currentPlaceSlice';

export const PlaceType: FC = () => {
  const type = useTypeSelector();
  return <Typography variant="body1">{type || 'Business type'}</Typography>;
};
