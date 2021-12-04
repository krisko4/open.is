

import { useSelector } from "react-redux";

// export interface RootState {
//     isUserLoggedIn: boolean,
//     email: string

// }

export const useSelectedOptionSelector = () => {
    return useSelector((state: any) => state.selectedOption)
}