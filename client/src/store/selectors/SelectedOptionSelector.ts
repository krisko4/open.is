import { useSelector } from "react-redux";


export const useSelectedOptionSelector = () => {
    return useSelector((state: any) => state.selectedOption)
}