import { Typography } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { useTypeSelector } from 'redux-toolkit/slices/currentPlaceSlice';

export const PlaceType: FC = () => {
  const type = useTypeSelector();
  return <Typography variant="body1">{type || 'Business type'}</Typography>;
};
