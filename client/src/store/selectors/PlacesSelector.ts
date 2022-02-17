
import { useSelector } from "react-redux";
import { RootState } from "../RootState";


export const usePlacesSelector = () => {
    return useSelector((state: RootState) => state.places)
}