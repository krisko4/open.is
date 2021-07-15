import {createContext, useState} from "react";


export const SelectedPlacesContext = createContext()

const Provider = ({children}) => {
    const [selectedPlaces, setSelectedPlaces] = useState([])
    const [chosenCriterias, setChosenCriterias] = useState([])
    const state = {
        selectedPlaces,
        setSelectedPlaces,
        chosenCriterias,
        setChosenCriterias
    }
    return(
        <SelectedPlacesContext.Provider value={{...state}}>
            {children}
        </SelectedPlacesContext.Provider>
    )
}

export default Provider
