
import { useSelector } from "react-redux";
import { RootState } from "../RootState";


export const useChosenPlaceSelector = () => {
    return useSelector((state : RootState) => state.chosenPlace)
}