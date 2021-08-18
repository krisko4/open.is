import {createContext, useContext, FC, useState} from "react";
import { ContextProps } from "./ContextProps";


export const SelectedPlacesContext = createContext<SelectedPlacesContextData | null>(null)

const SelectedPlacesContextProvider :FC<ContextProps> = ({children}) => {
    const state = useProviderSettings()
    return(
        <SelectedPlacesContext.Provider value={state}>
            {children}
        </SelectedPlacesContext.Provider>
    )
}

const useProviderSettings = () => {
    const [selectedPlaces, setSelectedPlaces] = useState([])
    const [chosenCriterias, setChosenCriterias] = useState([])
    return {
        selectedPlaces,
        setSelectedPlaces,
        chosenCriterias,
        setChosenCriterias
    }
}

type SelectedPlacesContextData = ReturnType<typeof useProviderSettings>

export const useSelectedPlacesContext = () => {
    const context = useContext(SelectedPlacesContext)
    if(!context) throw new Error('SelectedPlacesContextProvider should be placed inside SelectedPlacesContext')
    return context
}

export default SelectedPlacesContextProvider
