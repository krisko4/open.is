import { CurrentPlaceProps } from "../../contexts/PlaceProps"

export const setPlace = (currentPlace : CurrentPlaceProps) => {
    return {
        type: 'SET_CURRENT_PLACE',
        payload: currentPlace
    }
}