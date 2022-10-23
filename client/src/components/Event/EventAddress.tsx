import { Typography } from '@mui/material';
import { FC } from 'react';
import { useSelectedAddressSelector } from 'store/slices/selectedAddressSlice';

export const EventAddress: FC = () => {
  const address = useSelectedAddressSelector();
  return (
    <Typography variant="body2" color="text.secondary">
      {address.label || 'This is an address of your event'}
    </Typography>
  );
};
