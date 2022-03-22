import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'redux-toolkit/hooks';

export interface SelectedLocationProps {
  _id?: string;
  name?: string;
  type?: string;
  subtitle?: string;
  addressId?: string;
  addressLanguage?: string;
  logo?: string;
  status?: string;
  address?: string;
  locationId?: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
}

const initialState: SelectedLocationProps[] = [];

const selectedLocationsSlice = createSlice({
  name: 'selectedLocations',
  initialState,
  reducers: {
    setSelectedLocations: (state, action: PayloadAction<SelectedLocationProps[]>) => {
      return action.payload;
    },
    addLocations: (state, action: PayloadAction<SelectedLocationProps[]>) => {
      state.push(...action.payload);
    },
    addLocation: (state, action: PayloadAction<SelectedLocationProps>) => {
      state.push(action.payload);
    },
    replaceLocation: (state, action: PayloadAction<SelectedLocationProps>) => {
      state.splice(state.length - 1, 1, action.payload);
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      return state.filter((loc) => loc.locationId !== action.payload);
    },
    removeLocationByAddressId: (state, action: PayloadAction<string>) => {
      return state.filter((loc) => loc.addressId !== action.payload);
    },
    resetSelectedLocations: () => initialState,
  },
});
export const useSelectedLocationsSelector = () => useAppSelector((state) => state.selectedLocations);
export const {
  replaceLocation,
  removeLocation,
  removeLocationByAddressId,
  setSelectedLocations,
  resetSelectedLocations,
  addLocations,
  addLocation,
} = selectedLocationsSlice.actions;
export const selectedLocationsReducer = selectedLocationsSlice.reducer;
