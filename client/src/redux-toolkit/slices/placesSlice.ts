import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearBusinessChain } from "contexts/PanelContexts/BusinessChainContext";
import { ContactData } from "requests/PlaceRequests";
import { LocationProps, RawPlaceDataProps } from "../../contexts/PlaceProps";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";


const initialState: RawPlaceDataProps[] = []

interface DeletedLocationsProps {
    selectedLocations: string[],
    placeId: string
}

interface ModifiedLocationsProps {
    placeId: string,
    locations: LocationProps[]
}
interface ContactDetailsProps {
    placeId: string,
    selectedLocations: string[],
    contactDetails: ContactData
}


const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<RawPlaceDataProps[]>) => {
            return action.payload
        },
        addPlace: (state, action: PayloadAction<RawPlaceDataProps>) => {
            state.push(action.payload)
        },
        deleteSelectedLocationsFromSelectedPlace: (state, action: PayloadAction<DeletedLocationsProps>) => {
            const selectedPlace = state.find(place => place._id as string === action.payload.placeId) as RawPlaceDataProps
            selectedPlace.locations = selectedPlace.locations.filter(loc => !action.payload.selectedLocations.includes(loc._id as string))
        },
        deletePlace: (state, action: PayloadAction<string>) => {
            state = state.filter(place => place._id !== action.payload)
        },
        setLocationsForSelectedPlace: (state, action: PayloadAction<ModifiedLocationsProps>) => {
            const selectedPlace = state.find(place => place._id as string === action.payload.placeId) as RawPlaceDataProps
            selectedPlace.locations = action.payload.locations
        },
        setContactDetailsForSelectedLocations: (state, action: PayloadAction<ContactDetailsProps>) => {
            const selectedPlace = state.find(place => place._id as string === action.payload.placeId) as RawPlaceDataProps
            selectedPlace.locations = selectedPlace.locations.map(loc => {
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

export const usePlacesSelector = () => useAppSelector(state => state.places)
export const
    {
        setPlaces,
        addPlace,
        deletePlace,
        setLocationsForSelectedPlace,
        deleteSelectedLocationsFromSelectedPlace,
        setContactDetailsForSelectedLocations
    } = placesSlice.actions
export const placesReducer = placesSlice.reducer