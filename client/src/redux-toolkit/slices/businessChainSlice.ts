
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearBusinessChain } from "contexts/PanelContexts/BusinessChainContext";
import { useSelector } from "react-redux";
import { useAppSelector } from "redux-toolkit/hooks";
import { LocationProps, RawPlaceDataProps } from "../../contexts/PlaceProps";

const initialState: RawPlaceDataProps = { ...clearBusinessChain}



const businessChainSlice = createSlice({
    name: 'businessChain',
    initialState,
    reducers: {
        setBusinessChain: (state, action : PayloadAction<RawPlaceDataProps>) => {
            return action.payload
        },
        addLocations : (state, action : PayloadAction<LocationProps[]>) => {
            for (const location of action.payload){
                state.locations.push(location)
            }
        },
        setLocations : (state, action : PayloadAction<LocationProps[]>) => {
            state.locations = action.payload
        },
        deleteSelectedLocations: (state, action : PayloadAction<string[]>) => {
            state.locations = state.locations.filter(loc => !action.payload.includes(loc._id as string))
        },
    }
})

export const {
    setBusinessChain,
    setLocations,
    addLocations,
    deleteSelectedLocations
} = businessChainSlice.actions

export const useBusinessChainSelector = () => useAppSelector(state => state.businessChain)


export const businessChainReducer = businessChainSlice.reducer