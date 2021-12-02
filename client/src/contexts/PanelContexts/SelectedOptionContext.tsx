import { createContext, FC, useContext, useState } from "react";

export enum ChosenOptions {
    DASHBOARD,
    NEW_PLACE,
    NO_PLACES,
    PLACE_MANAGEMENT,
    MY_ACCOUNT,
    NEW_BUSINESS_CHAIN
}
const SelectedOptionContext = createContext<SelectedOptionContextData | null>(null)

export const SelectedOptionContextProvider : FC = ({ children }) => {

    const state = useProviderSettings()

    return (
        <SelectedOptionContext.Provider value={state}>
            {children}
        </SelectedOptionContext.Provider>
    )
}

const useProviderSettings = () => {

    const [selectedOption, setSelectedOption] = useState<ChosenOptions | null>(null)

    return {
        selectedOption, setSelectedOption
    }

}

type SelectedOptionContextData = ReturnType<typeof useProviderSettings>

export const useSelectedOptionContext = () => {
    const context = useContext(SelectedOptionContext)
    if (!context) throw new Error('SelectedPlacesContextProvider should be placed inside SelectedPlacesContext')
    return context
}