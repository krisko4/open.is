
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "redux-toolkit/hooks";


export interface MapProps {
    zoom: number,
    lat: number,
    lng: number

}

const initialState: MapProps = {
    zoom: 5,
    lat: 53.13333,
    lng: 23.16433
}

const mapDataSlice = createSlice({
    name: 'mapData',
    initialState,
    reducers: {
        setMapData: (state, action: PayloadAction<MapProps>) => {
            return action.payload
        },
        reset: () => initialState,

    }
})
export const useMapDataSelector = () => useAppSelector(state => state.mapData)
export const {
    setMapData,
    reset
} = mapDataSlice.actions
export const mapDataReducer = mapDataSlice.reducer