import { RawPlaceDataProps } from "../../contexts/PanelContexts/BusinessChainContext"


export const setPlaces = (places : RawPlaceDataProps[]) => {
    return {
        type: 'SET_PLACES',
        payload: places
    }
}