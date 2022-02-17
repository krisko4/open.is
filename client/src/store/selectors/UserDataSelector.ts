
import { useSelector } from "react-redux";
import { RootState } from "../RootState";


export const useUserDataSelector = () => {
    return useSelector((state : RootState) => state.userData)
}