import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useSubtitleSelector } from 'store/slices/currentPlaceSlice';
export const PlaceSubtitle: FC = () => {
  const subtitle = useSubtitleSelector();
  return <Typography variant="h6">{subtitle || 'This is a short subtitle of your business'}</Typography>;
};
