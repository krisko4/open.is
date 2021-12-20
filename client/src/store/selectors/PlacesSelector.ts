
import { useSelector } from "react-redux";
import { RawPlaceDataProps } from "../../contexts/PanelContexts/BusinessChainContext";
import { RootState } from "../RootState";


export const usePlacesSelector = () => {
    return useSelector((state: RootState) => state.places)
}