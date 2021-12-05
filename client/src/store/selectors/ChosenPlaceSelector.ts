
import { useSelector } from "react-redux";
import { PlaceProps } from "../../contexts/PanelContexts/CurrentPlaceContext";

export interface RootState {
    chosenPlace: any

}

export const useChosenPlaceSelector = () => {
    return useSelector((state : RootState) => state.chosenPlace)
}