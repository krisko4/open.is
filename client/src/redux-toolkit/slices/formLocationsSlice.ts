
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'redux-toolkit/hooks';


export interface FormLocationProps {
  _id?: string,
  name?: string,
  type?: string,
  subtitle?: string,
  addressId?: string,
  addressLanguage?: string,
  logo?: string,
  status?: string,
  address?: string,
  locationId?: string,
  lat: number,
  lng: number,
  phone?: string,
  email?: string,
  website?: string,
  facebook?: string,
  instagram?: string,
  isValid?: boolean
}

interface ValidatedLocationProps {
  isValid: boolean,
  addressId: string
}

interface StateProps {
  invalidForms: string[],
  formLocations: FormLocationProps[]
}

const initialState: StateProps = {
  formLocations: [],
  invalidForms: [],
};

const formLocationsSlice = createSlice({
  name: 'formLocations',
  initialState,
  reducers: {
    addFormLocation: (state, action: PayloadAction<FormLocationProps>) => {
      state.formLocations.push(action.payload);
    },
    removeFormLocationByAddressId: (state, action: PayloadAction<string>) => {
      state.formLocations = state.formLocations.filter(loc => loc.addressId !== action.payload);
    },
    setValid: (state, action: PayloadAction<ValidatedLocationProps>) => {
      const validState = action.payload.isValid;
      const isInvalid = state.invalidForms.find(addressId => addressId === action.payload.addressId);
      if (isInvalid) {
        if (validState) {
          state.invalidForms = state.invalidForms.filter(addressId => addressId !== action.payload.addressId);
        }
        return;
      }
      if (!validState){
        state.invalidForms.push(action.payload.addressId);
      }
    },
    resetFormLocations: () => initialState,
  },
});
export const useInvalidFormsSelector = () => useAppSelector(state => state.formLocations.invalidForms);
export const useFormLocationsSelector = () => useAppSelector(state => state.formLocations.formLocations);
export const useValidSelector = (addressId: string) => useAppSelector(state => state.formLocations.formLocations.find(loc => loc.addressId === addressId)?.isValid);
export const {
  setValid,
  addFormLocation,
  removeFormLocationByAddressId,
  resetFormLocations,
} = formLocationsSlice.actions;
export const formLocationsReducer = formLocationsSlice.reducer;