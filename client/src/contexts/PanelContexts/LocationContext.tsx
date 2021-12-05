

import { createContext, FC, useContext, useState } from "react";



interface LocationDetails {
    address: string,
    phone: string,
    website: string,
    email: string,
    facebook: string,
    instagram: string,
    lat: number,
    lng: number
}


export const LocationContext = createContext<LocationContextData | null>(null)


export const LocationContextProvider: FC = ({ children }) => {

    const state = useProviderSettings()

    return (
        <LocationContext.Provider value={state}>
            {children}
        </LocationContext.Provider>
    )
}

const useProviderSettings = () => {


    const [selectedLocations, setSelectedLocations] = useState<LocationDetails[]>([])
    const [saveButtonClicked, setSaveButtonClicked] = useState(false)
    const [fieldForAll, setFieldForAll] = useState({
        field: '',
        value: ''
    })
    
    // const [businessSummary, setBusinessSummary] = useState({
    //     name: currentPlace.name,
    //     subtitle: currentPlace.subtitle,
    //     type: currentPlace.type,
    //     description: currentPlace.description,
    //     img: currentPlace.img,
    //     locations: selectedPlaces
    // })


    return {
        selectedLocations,
        setSelectedLocations,
        saveButtonClicked,
        setSaveButtonClicked,
        fieldForAll,
        setFieldForAll
    }
}

type LocationContextData = ReturnType<typeof useProviderSettings>

export const useLocationContext = () => {
    const context = useContext(LocationContext)
    if (!context) throw new Error('LocationContextProvider should be used inside LocationContext!')
    return context

}

