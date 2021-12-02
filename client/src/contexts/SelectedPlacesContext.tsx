import { createContext, FC, ReactNode, useContext, useState } from "react";


export const SelectedPlacesContext = createContext<SelectedPlacesContextData | null>(null)
interface Props {
    children: ReactNode,
    isEditionMode: boolean

}

const SelectedPlacesContextProvider: FC<Props> = ({ isEditionMode, children }) => {
    const state = useProviderSettings(isEditionMode)
    return (
        <SelectedPlacesContext.Provider value={state}>
            {children}
        </SelectedPlacesContext.Provider>
    )
}

interface SelectedAddressProps {
    label: string,
    lat: number,
    lng: number,
    postcode?: string
}

const useProviderSettings = (isEdition: boolean) => {
    const [selectedPlaces, setSelectedPlaces] = useState<any>([])
    const [chosenCriterias, setChosenCriterias] = useState<any>([])
    const [isEditionMode, setEditionMode] = useState(isEdition)

    const [selectedAddress, setSelectedAddress] = useState<SelectedAddressProps>({
        label: '',
        lat: 0,
        lng: 0
    })
    return {
        selectedPlaces,
        setSelectedPlaces,
        chosenCriterias,
        setChosenCriterias,
        isEditionMode,
        setEditionMode,
        selectedAddress,
        setSelectedAddress
    }
}

type SelectedPlacesContextData = ReturnType<typeof useProviderSettings>

export const useSelectedPlacesContext = () => {
    const context = useContext(SelectedPlacesContext)
    if (!context) throw new Error('SelectedPlacesContextProvider should be placed inside SelectedPlacesContext')
    return context
}

export default SelectedPlacesContextProvider
