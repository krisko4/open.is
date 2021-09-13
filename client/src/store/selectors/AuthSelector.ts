import { useSelector } from "react-redux";

interface RootState {
    isUserLoggedIn: boolean
}

export const useAuthSelector = () => {
    return useSelector((state: RootState) => state.isUserLoggedIn)
}