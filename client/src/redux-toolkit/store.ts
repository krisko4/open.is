import { configureStore, createStore } from "@reduxjs/toolkit";
import { placesApi } from "./api/placesApi";
import { businessChainReducer } from "./slices/businessChainSlice";
import { currentPlaceReducer } from "./slices/currentPlaceSlice";
import { mapDataReducer } from "./slices/mapSlice";
import { placesReducer } from "./slices/placesSlice";
import { searcherOptionsReducer } from "./slices/searcherOptionsSlice";
import { selectedAddressReducer } from "./slices/selectedAddressSlice";
import { selectedLocationsReducer } from "./slices/selectedLocationsSlice";

export const store = configureStore({
    reducer: {
        currentPlace: currentPlaceReducer,
        businessChain: businessChainReducer,
        places: placesReducer,
        [placesApi.reducerPath]: placesApi.reducer,
        selectedLocations: selectedLocationsReducer,
        mapData: mapDataReducer,
        selectedAddress : selectedAddressReducer,
        searcherOptions: searcherOptionsReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(placesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch