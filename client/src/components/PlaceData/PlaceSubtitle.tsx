import { Typography } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { useSubtitleSelector } from 'redux-toolkit/slices/currentPlaceSlice';
export const PlaceSubtitle: FC = () => {
  const subtitle = useSubtitleSelector();
  return <Typography variant="h6">{subtitle || 'This is a short subtitle of your business'}</Typography>;
};
