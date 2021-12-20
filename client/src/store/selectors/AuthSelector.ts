import { useSelector } from "react-redux";
import {RootState} from '../RootState'

export const useAuthSelector = () => {
    return useSelector((state: RootState) => state.isUserLoggedIn)
}