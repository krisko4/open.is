import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Image } from 'store/slices/PlaceProps';
import { defaultImages, defaultNews } from '../../utils/defaults';
import { useAppSelector } from '../hooks';
import {
  AddressDataProps,
  AverageNoteProps,
  CurrentPlaceProps,
  ImageType,
  NewsProps,
  OpinionProps,
  Status,
} from './PlaceProps';

const initialState: CurrentPlaceProps = {
  name: '',
  address: '',
  addressId: '',
  addressLanguage: '',
  type: null,
  lat: 0,
  lng: 0,
  description: '',
  subtitle: '',
  phone: '',
  logo: '',
  images: defaultImages,
  email: '',
  website: '',
  instagram: '',
  facebook: '',
  opinions: [],
  visits: [],
  news: defaultNews,
  alwaysOpen: false,
};

interface ConcreteImageProps {
  image: Image;
  index: number;
}

interface NewOpinionProps {
  opinion: OpinionProps;
  averageNote: AverageNoteProps;
}

const currentPlaceSlice = createSlice({
  name: 'currentPlace',
  initialState,
  reducers: {
    resetCurrentPlace: () => initialState,
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setSubtitle: (state, action: PayloadAction<string>) => {
      state.subtitle = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFacebook: (state, action: PayloadAction<string>) => {
      state.facebook = action.payload;
    },
    setInstagram: (state, action: PayloadAction<string>) => {
      state.instagram = action.payload;
    },
    setWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setCurrentPlace: (state, action: PayloadAction<CurrentPlaceProps>) => {
      return action.payload;
    },
    setLogo: (state, action: PayloadAction<ImageType>) => {
      state.logo = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setImages: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },
    setAverageNote: (state, action: PayloadAction<AverageNoteProps>) => {
      state.averageNote = action.payload;
    },
    setConcreteImage: (state, action: PayloadAction<ConcreteImageProps>) => {
      state.images[action.payload.index] = action.payload.image;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setNews: (state, action: PayloadAction<NewsProps>) => {
      state.news?.push(action.payload);
    },
    addNewOpinion: (state, action: PayloadAction<NewOpinionProps>) => {
      state.opinions?.push(action.payload.opinion);
      state.averageNote = action.payload.averageNote;
    },
    setAddressData: (state, action: PayloadAction<AddressDataProps>) => {
      state.address = action.payload.address;
      state.addressId = action.payload.addressId;
      state.addressLanguage = action.payload.addressLanguage;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    setSubscription: (state, action: PayloadAction<boolean>) => {
      state.isUserOwner = action.payload;
    },
    setLogoFile: (state, action: PayloadAction<File | null>) => {
      state.logoFile = action.payload;
    },
    setAlwaysOpen: (state) => {
      state.alwaysOpen = true;
      state.isActive = true;
    },
    setOpeningHours: (state, action: PayloadAction<any>) => {
      state.openingHours = action.payload;
      state.isActive = true;
    },
  },
});

export const {
  resetCurrentPlace,
  setLogoFile,
  setName,
  setCurrentPlace,
  setDescription,
  setEmail,
  setOpeningHours,
  setAlwaysOpen,
  setNews,
  addNewOpinion,
  setAddressData,
  setFacebook,
  setInstagram,
  setLogo,
  setPhone,
  setSubtitle,
  setWebsite,
  setSubscription,
  setStatus,
  setType,
  setImages,
  setConcreteImage,
} = currentPlaceSlice.actions;
const selectSelf = (state: RootState) => state;

const selectAddress = (state: RootState) => state.currentPlace.address;
const selectAddressId = (state: RootState) => state.currentPlace.addressId;
const selectAddressLanguage = (state: RootState) => state.currentPlace.addressLanguage;
const selectLat = (state: RootState) => state.currentPlace.lat;
const selectLng = (state: RootState) => state.currentPlace.lng;

export const basicPlaceDataSelector = createDraftSafeSelector(selectSelf, (state) => ({
  name: state.currentPlace.name,
  type: state.currentPlace.type,
  logo: state.currentPlace.logo,
}));
export const addressDataSelector = createDraftSafeSelector(
  selectAddress,
  selectAddressId,
  selectAddressLanguage,
  selectLat,
  selectLng,
  (address, id, lang, lat, lng) => ({
    address: address,
    addressId: id,
    addressLanguage: lang,
    lat: lat,
    lng: lng,
  })
);
export const openingHoursDataSelector = createDraftSafeSelector(selectSelf, (state) => ({
  openingHours: state.currentPlace.openingHours,
  alwaysOpen: state.currentPlace.alwaysOpen,
  isUserOwner: state.currentPlace.isUserOwner,
  isActive: state.currentPlace.isActive,
  placeId: state.currentPlace._id,
}));
export const opinionDataSelector = createDraftSafeSelector(selectSelf, (state) => ({
  opinions: state.currentPlace.opinions,
  placeId: state.currentPlace._id,
  isUserOwner: state.currentPlace.isUserOwner,
}));
export const useIsBusinessChainSelector = () => useAppSelector((state) => state.currentPlace.isBusinessChain);
export const useOpinionsSelector = () => useAppSelector((state) => state.currentPlace.opinions);
export const useNewsSelector = () => useAppSelector((state) => state.currentPlace.news);
export const useIsAlwaysOpenSelector = () => useAppSelector((state) => state.currentPlace.alwaysOpen);
export const useIsUserOwnerSelector = () => useAppSelector((state) => state.currentPlace.isUserOwner);
export const useOpeningHoursSelector = () => useAppSelector((state) => state.currentPlace.openingHours);
export const useIdSelector = () => useAppSelector((state) => state.currentPlace._id);
export const useNameSelector = () => useAppSelector((state) => state.currentPlace.name);
export const useTypeSelector = () => useAppSelector((state) => state.currentPlace.type);
export const useCurrentPlaceSelector = () => useAppSelector((state) => state.currentPlace);
export const useDescriptionSelector = () => useAppSelector((state) => state.currentPlace.description);
export const useEmailSelector = () => useAppSelector((state) => state.currentPlace.email);
export const useFacebookSelector = () => useAppSelector((state) => state.currentPlace.facebook);
export const useInstagramSelector = () => useAppSelector((state) => state.currentPlace.instagram);
export const useLogoSelector = () => useAppSelector((state) => state.currentPlace.logo);
export const usePhoneSelector = () => useAppSelector((state) => state.currentPlace.phone);
export const useSubtitleSelector = () => useAppSelector((state) => state.currentPlace.subtitle);
export const useWebsiteSelector = () => useAppSelector((state) => state.currentPlace.website);
export const useImagesSelector = () => useAppSelector((state) => state.currentPlace.images);
export const useAddressSelector = () => useAppSelector((state) => state.currentPlace.address);
export const useAverageNoteSelector = () => useAppSelector((state) => state.currentPlace.averageNote);
export const useStatusSelector = () => useAppSelector((state) => state.currentPlace.status);
export const useVisitsSelector = () => useAppSelector((state) => state.currentPlace.visits);
export const useAddressDataSelector = () => useAppSelector((state) => addressDataSelector(state));
export const useBasicPlaceDataSelector = () => useAppSelector((state) => basicPlaceDataSelector(state));
export const useOpeningHoursDataSelector = () => useAppSelector((state) => openingHoursDataSelector(state));
export const useOpinionDataSelector = () => useAppSelector((state) => opinionDataSelector(state));

export const currentPlaceReducer = currentPlaceSlice.reducer;
