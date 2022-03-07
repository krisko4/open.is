import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RawPlaceDataProps } from "../../contexts/PlaceProps";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";


const initialState : RawPlaceDataProps[] = []
 

const placesSlice = createSlice({
    name : 'placessszs',
    initialState,
    reducers: {
        setPlaces: (state, action : PayloadAction<RawPlaceDataProps[]>) => {
            return action.payload
        },
        addPlace : (state, action: PayloadAction<RawPlaceDataProps>) => {
            state.push(action.payload)
        }
    }
})

export const usePlacesSelector = () => useAppSelector(state => state.places) 
export const {setPlaces, addPlace} = placesSlice.actions
export const placesReducer = placesSlice.reducer