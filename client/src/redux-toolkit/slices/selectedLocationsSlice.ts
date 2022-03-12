import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "redux-toolkit/hooks";


export interface SelectedLocationProps {
    _id: string,
    name: string,
    type: string,
    subtitle: string,
    logo: string,
    status: string,
    address: string,
    locationId: string,
    lat: number,
    lng: number
}

const initialState: SelectedLocationProps[] = []

const selectedLocationsSlice = createSlice({
    name: 'selectedLocations',
    initialState,
    reducers: {
        setSelectedLocations: (state, action: PayloadAction<SelectedLocationProps[]>) => {
            return action.payload
        },
        addLocations: (state, action: PayloadAction<SelectedLocationProps[]>) => {
            state.push(...action.payload)
        },
        reset: () => initialState
    }
})
export const useSelectedLocationsSelector = () => useAppSelector(state => state.selectedLocations)
export const {
    setSelectedLocations,
    reset,
    addLocations
} = selectedLocationsSlice.actions
export const selectedLocationsReducer = selectedLocationsSlice.reducer