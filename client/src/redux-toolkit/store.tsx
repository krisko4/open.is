import { configureStore } from '@reduxjs/toolkit';
import { businessChainReducer } from './slices/businessChainSlice';
import { currentPlaceReducer } from './slices/currentPlaceSlice';
import { emailReducer } from './slices/emailSlice';
import { mapDataReducer } from './slices/mapSlice';
import { placesReducer } from './slices/placesSlice';
import { searcherOptionsReducer } from './slices/searcherOptionsSlice';
import { selectedAddressReducer } from './slices/selectedAddressSlice';
import { selectedLocationsReducer } from './slices/selectedLocationsSlice';
import { formLocationsReducer } from './slices/formLocationsSlice';
import { Provider } from 'react-redux';
import { FC } from 'react';
import { eventReducer } from './slices/eventSlice';
import { placesApi } from './api';

export const store = configureStore({
  reducer: {
    currentPlace: currentPlaceReducer,
    businessChain: businessChainReducer,
    places: placesReducer,
    [placesApi.reducerPath]: placesApi.reducer,
    selectedLocations: selectedLocationsReducer,
    mapData: mapDataReducer,
    selectedAddress: selectedAddressReducer,
    searcherOptions: searcherOptionsReducer,
    formLocations: formLocationsReducer,
    email: emailReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(placesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const StoreProvider: FC = ({ children }) => <Provider store={store}>{children}</Provider>;
