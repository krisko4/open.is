import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'redux-toolkit/hooks';


export interface SelectedLocationProps {
  _id?: string,
  name: string,
  type: string,
  subtitle?: string,
  logo: string,
  status?: string,
  address?: string,
  locationId?: string,
  lat: number,
  lng: number
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
    removeLocation: (state, action: PayloadAction<string>) => {
      return state.filter(loc => loc.locationId !== action.payload);
    }, 
    resetSelectedLocations: () => initialState,
  },
});
export const useSelectedLocationsSelector = () => useAppSelector(state => state.selectedLocations);
export const {
  removeLocation,
  setSelectedLocations,
  resetSelectedLocations,
  addLocations,
} = selectedLocationsSlice.actions;
export const selectedLocationsReducer = selectedLocationsSlice.reducer;