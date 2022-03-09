
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearBusinessChain } from "contexts/PanelContexts/BusinessChainContext";
import { useSelector } from "react-redux";
import { useAppSelector } from "redux-toolkit/hooks";
import { ContactData } from "requests/PlaceRequests";
import { LocationProps, RawPlaceDataProps } from "../../contexts/PlaceProps";

const initialState: RawPlaceDataProps = { ...clearBusinessChain }

interface ContactDetailsProps {
    selectedLocations: string[],
    contactDetails: ContactData
}



const businessChainSlice = createSlice({
    name: 'businessChain',
    initialState,
    reducers: {
        setBusinessChain: (state, action: PayloadAction<RawPlaceDataProps>) => {
            return action.payload
        },
        addLocations: (state, action: PayloadAction<LocationProps[]>) => {
            for (const location of action.payload) {
                state.locations.push(location)
            }
        },

        setLocations: (state, action: PayloadAction<LocationProps[]>) => {
            state.locations = action.payload
        },
        deleteSelectedLocations: (state, action: PayloadAction<string[]>) => {
            state.locations = state.locations.filter(loc => !action.payload.includes(loc._id as string))
        },
        setContactDetailsForSelectedLocations: (state, action: PayloadAction<ContactDetailsProps>) => {
            state.locations = state.locations.map(loc => {
                if (action.payload.selectedLocations.includes(loc._id as string)) {
                    return {
                        ...loc,
                        ...action.payload.contactDetails
                    }
                }
                return loc
            })
        }
    }
})

export const {
    setBusinessChain,
    setLocations,
    addLocations,
    deleteSelectedLocations,
    setContactDetailsForSelectedLocations
} = businessChainSlice.actions

export const useBusinessChainSelector = () => useAppSelector(state => state.businessChain)
export const useLogoSelector = () => useAppSelector(state => state.businessChain.logo)
export const useLocationsSelector = () => useAppSelector(state => state.businessChain.locations)
export const useBusinessChainIdSelector = () => useAppSelector(state => state.businessChain._id)


export const businessChainReducer = businessChainSlice.reducer