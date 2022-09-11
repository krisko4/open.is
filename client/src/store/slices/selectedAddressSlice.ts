import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store/hooks';

interface SelectedAddressProps {
  label: string;
  lat: number;
  lng: number;
  postcode?: string;
  addressId: string;
  language: string;
}
const initialState: SelectedAddressProps = {
  label: '',
  lat: 0,
  lng: 0,
  addressId: '',
  language: '',
};

const selectedAddressSlice = createSlice({
  name: 'selectedAddress',
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<SelectedAddressProps>) => action.payload,
    resetSelectedAddress: () => initialState,
  },
});

export const useSelectedAddressSelector = () => useAppSelector((state) => state.selectedAddress);

export const { setSelectedAddress, resetSelectedAddress } = selectedAddressSlice.actions;

export const selectedAddressReducer = selectedAddressSlice.reducer;
