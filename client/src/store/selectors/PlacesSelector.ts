
import { useSelector } from "react-redux";
import { PlaceProps } from "../../contexts/PanelContexts/CurrentPlaceContext";

export interface RootState {
    isUserLoggedIn: boolean,
    email: string
    places: PlaceProps[]

}

export const usePlacesSelector = () => {
    return useSelector((state : RootState) => state.places)
}