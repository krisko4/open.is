import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'store/hooks';

export interface FormLocationProps {
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

interface ValidatedLocationProps {
  isValid: boolean;
  addressId: string;
}

interface FillFormDataProps {
  addressId: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
}

interface FormLocation {
  [key: string]: FormLocationProps;
}

interface StateProps {
  invalidForms: string[];
  formLocations: FormLocation;
  // formLocations: FormLocationProps[],
  formSaveTrigger: boolean;
}

const initialState: StateProps = {
  formLocations: {},
  invalidForms: [],
  formSaveTrigger: false,
};

const formLocationsSlice = createSlice({
  name: 'formLocations',
  initialState,
  reducers: {
    addFormLocation: (state, action: PayloadAction<FormLocationProps>) => {
      state.formLocations[action.payload.addressId as string] = action.payload;
      // Object.assign(state.formLocations, { addressId : action.payload });
    },
    removeFormLocationByAddressId: (state, action: PayloadAction<string>) => {
      delete state.formLocations[action.payload];
      // state.formLocations = state.formLocations.filter(loc => loc.addressId !== action.payload);
    },
    fillFormData: (state, action: PayloadAction<FillFormDataProps>) => {
      const { addressId, ...rest } = action.payload;
      Object.assign(state.formLocations[action.payload.addressId], rest);
    },
    saveForm: (state) => {
      state.formSaveTrigger = !state.formSaveTrigger;
    },
    setValid: (state, action: PayloadAction<ValidatedLocationProps>) => {
      const validState = action.payload.isValid;
      const isInvalid = state.invalidForms.find((addressId) => addressId === action.payload.addressId);
      if (isInvalid) {
        if (validState) {
          state.invalidForms = state.invalidForms.filter((addressId) => addressId !== action.payload.addressId);
        }
        return;
      }
      if (!validState) {
        state.invalidForms.push(action.payload.addressId);
      }
    },
    resetFormLocations: () => initialState,
  },
});
export const useFormSaveTriggerSelector = () => useAppSelector((state) => state.formLocations.formSaveTrigger);
export const useInvalidFormsSelector = () => useAppSelector((state) => state.formLocations.invalidForms);
export const useFormLocationsSelector = () => useAppSelector((state) => state.formLocations.formLocations);
export const { saveForm, setValid, addFormLocation, fillFormData, removeFormLocationByAddressId, resetFormLocations } =
  formLocationsSlice.actions;
export const formLocationsReducer = formLocationsSlice.reducer;
