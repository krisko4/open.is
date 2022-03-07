import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { CurrentPlaceProps } from "../../contexts/PlaceProps";
import { defaultImages, defaultOpinions, defaultNews } from "../../utils/defaults";
import { useAppSelector } from "../hooks";

const initialState : CurrentPlaceProps = {
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
    opinions: defaultOpinions,
    visits: [],
    news: defaultNews,
    alwaysOpen: false
}


const currentPlaceSlice = createSlice({
    name: 'currentPlace',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const {setName} = currentPlaceSlice.actions
export const useNameSelector = () => useAppSelector(state => state.currentPlace.name)

export const currentPlaceReducer = currentPlaceSlice.reducer