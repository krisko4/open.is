

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "redux-toolkit/hooks";

export interface SearcherOptionsProps{
    name: string,
    foundBy: string
}

const initialState: SearcherOptionsProps[] = [] 

const searcherOptionsSlice = createSlice({
    name: 'searcherOptions',
    initialState,
    reducers: {
        setSearcherOptions: (state, action: PayloadAction<SearcherOptionsProps[]>) => {
            return action.payload
        },
        resetSearcherOptions: () => initialState

    }
})

export const useSearcherOptionsSelector = () => useAppSelector(state => state.searcherOptions)

export const {
    setSearcherOptions,
    resetSearcherOptions
} = searcherOptionsSlice.actions

export const searcherOptionsReducer = searcherOptionsSlice.reducer