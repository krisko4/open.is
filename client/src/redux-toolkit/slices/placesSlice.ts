import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RawPlaceDataProps } from "../../contexts/PlaceProps";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

interface StateProps{
    places : RawPlaceDataProps[]
}

const initialState : StateProps = {
    places : []
} 

const placesSlice = createSlice({
    name : 'places',
    initialState,
    reducers: {
        setPlaces: (state, action : PayloadAction<RawPlaceDataProps[]>) => {
            state.places = action.payload
        }
    }
})

export const usePlacesSelector = () => useAppSelector(state => state.places.places) 
export const {setPlaces} = placesSlice.actions
export const placesReducer = placesSlice.reducer