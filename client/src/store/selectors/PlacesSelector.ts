
import { useSelector } from "react-redux";
import { RawPlaceDataProps } from "../../contexts/PanelContexts/BusinessChainContext";

export interface RootState {
    isUserLoggedIn: boolean,
    email: string
    places: RawPlaceDataProps[]

}

export const usePlacesSelector = () => {
    return useSelector((state: RootState) => state.places)
}