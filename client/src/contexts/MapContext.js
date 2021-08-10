import React, {createContext, useState} from "react";


export const MapContext = createContext()

const MapContextProvider = ({children}) => {

    const [mapCenter, setMapCenter] = useState([53.13333, 23.16433])
    const [mapZoom, setMapZoom] = useState(10)
    const [popupOpen, setPopupOpen] = useState(false)

    const state = {
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        popupOpen,
        setPopupOpen
    }
    return (
        <MapContext.Provider value={{...state}}>
            {children}
        </MapContext.Provider>
    )
}

export default MapContextProvider