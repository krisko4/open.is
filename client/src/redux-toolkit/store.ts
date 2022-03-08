import { configureStore, createStore } from "@reduxjs/toolkit";
import { businessChainReducer } from "./slices/businessChainSlice";
import { currentPlaceReducer } from "./slices/currentPlaceSlice";
import { placesReducer } from "./slices/placesSlice";

export const store = configureStore({
    reducer: {
        currentPlace: currentPlaceReducer,
        businessChain: businessChainReducer,
        places: placesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch