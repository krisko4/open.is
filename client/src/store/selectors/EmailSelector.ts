

import { useSelector } from "react-redux";
import { RootState } from "../RootState";


export const useEmailSelector = () => {
    return useSelector((state : RootState) => state.email)
}