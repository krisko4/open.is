import { AddressSearcher } from 'components/AddressSearcher';
import { FC, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks';
import {
  resetSelectedAddress,
  setSelectedAddress,
  useSelectedAddressSelector,
} from 'store/slices/selectedAddressSlice';
import { Fields } from '..';

export const EventAddress: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSelectedAddress());
    };
  }, []);

  return (
    <AddressSearcher
      placeholder="Enter the address of your event"
      label="This is the address of my event!"
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};
