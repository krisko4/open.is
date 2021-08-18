import { useSelector } from "react-redux";

interface RootState {
    isUserLoggedIn : boolean
}

export const UseAuthSelector = () => useSelector((state : RootState) => state.isUserLoggedIn)