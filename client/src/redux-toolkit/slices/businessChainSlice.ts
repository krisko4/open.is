import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'redux-toolkit/hooks';
import { ContactData } from 'requests/PlaceRequests';
import { LocationProps, RawPlaceDataProps, Status } from './PlaceProps';
import { defaultImages } from 'utils/defaults';

export const clearBusinessChain = {
  name: '',
  _id: 'NEW_BUSINESS_CHAIN',
  locations: [
    {
      status: Status.CLOSED,
      address: '',
      addressId: '',
      addressLanguage: '',
      visitCount: 0,
      lat: 0,
      lng: 0,
      phone: '',
      instagram: '',
      facebook: '',
      email: '',
      website: '',
      isActive: false,
      alwaysOpen: false,
    },
  ],
  type: '',
  description: '',
  subtitle: '',
  logo: '',
  images: defaultImages,
  userId: '',
  isBusinessChain: true,
};
const initialState: RawPlaceDataProps = { ...clearBusinessChain };

interface ContactDetailsProps {
  selectedLocations: string[];
  contactDetails: ContactData;
}

interface OpeningHoursProps {
  openingHours: any;
  selectedLocations: string[];
}

const businessChainSlice = createSlice({
  name: 'businessChain',
  initialState,
  reducers: {
    setBusinessChain: (state, action: PayloadAction<RawPlaceDataProps>) => {
      return action.payload;
    },
    addLocations: (state, action: PayloadAction<LocationProps[]>) => {
      for (const location of action.payload) {
        state.locations.push(location);
      }
    },

    setLocations: (state, action: PayloadAction<LocationProps[]>) => {
      state.locations = action.payload;
    },
    deleteSelectedLocations: (state, action: PayloadAction<string[]>) => {
      state.locations = state.locations.filter((loc) => !action.payload.includes(loc._id as string));
    },
    setLocationsAlwaysOpen: (state, action: PayloadAction<string[]>) => {
      state.locations = state.locations
        .filter((loc) => action.payload.includes(loc._id as string))
        .map((loc) => ({
          ...loc,
          alwaysOpen: true,
          isActive: true,
        }));
    },
    setContactDetailsForSelectedLocations: (state, action: PayloadAction<ContactDetailsProps>) => {
      state.locations = state.locations.map((loc) => {
        if (action.payload.selectedLocations.includes(loc._id as string)) {
          return {
            ...loc,
            ...action.payload.contactDetails,
          };
        }
        return loc;
      });
    },
    setOpeningHoursForSelectedLocations: (state, action: PayloadAction<OpeningHoursProps>) => {
      state.locations = state.locations.map((loc) => {
        if (action.payload.selectedLocations.includes(loc._id as string)) {
          return {
            ...loc,
            isActive: true,
            ...action.payload.openingHours,
          };
        }
        return loc;
      });
    },
  },
});

export const {
  setBusinessChain,
  setLocations,
  addLocations,
  deleteSelectedLocations,
  setContactDetailsForSelectedLocations,
  setOpeningHoursForSelectedLocations,
  setLocationsAlwaysOpen,
} = businessChainSlice.actions;

export const useSubtitleSelector = () => useAppSelector((state) => state.businessChain.subtitle);
export const useNameSelector = () => useAppSelector((state) => state.businessChain.name);
export const useLogoSelector = () => useAppSelector((state) => state.businessChain.logo);
export const useBusinessChainSelector = () => useAppSelector((state) => state.businessChain);
export const useLocationsSelector = () => useAppSelector((state) => state.businessChain.locations);
export const useBusinessChainIdSelector = () => useAppSelector((state) => state.businessChain._id);

export const businessChainReducer = businessChainSlice.reducer;
