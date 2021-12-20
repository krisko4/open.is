import { RawPlaceDataProps } from "../contexts/PanelContexts/BusinessChainContext";

export interface RootState {

    isUserLoggedIn: boolean,
    email: string,
    chosenPlace: any,
    places: RawPlaceDataProps[],
    userData: {
        firstName: string,
        lastName: string,
        email: string,
        img: string
    }


}