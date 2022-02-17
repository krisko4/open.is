import { RawPlaceDataProps } from "../../contexts/PlaceProps"


export const setPlaces = (places : RawPlaceDataProps[]) => {
    return {
        type: 'SET_PLACES',
        payload: places
    }
}