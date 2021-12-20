
import { useSelector } from "react-redux";
import { CurrentPlaceProps } from "../../contexts/PanelContexts/CurrentPlaceContext";
import { RootState } from "../RootState";


export const useUserDataSelector = () => {
    return useSelector((state : RootState) => state.userData)
}