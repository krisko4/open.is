import { CurrentPlaceProps } from "../../contexts/PanelContexts/CurrentPlaceContext"

export const setPlace = (currentPlace : CurrentPlaceProps) => {
    return {
        type: 'SET_CURRENT_PLACE',
        payload: currentPlace
    }
}