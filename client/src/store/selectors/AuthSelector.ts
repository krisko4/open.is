import { useSelector } from "react-redux";

export interface RootState {
    isUserLoggedIn: boolean,
    email: string

}

export const useAuthSelector = () => {
    return useSelector((state: RootState) => state.isUserLoggedIn)
}