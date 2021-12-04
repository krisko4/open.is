import { PlaceProps } from "../../contexts/PanelContexts/PanelContext"


export const setPlaces = (places : PlaceProps[]) => {
    return {
        type: 'SET_PLACES',
        payload: places
    }
}