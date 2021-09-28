import React, { createContext, FC, useContext, useState } from "react";
import { ContextProps } from "../ContextProps";


export const MapContext = createContext<MapContextData | null>(null)

const MapContextProvider : FC<ContextProps> = ({ children }) => {

    const state = useProviderSettings()

    return (
        <MapContext.Provider value={state}>
            {children}
        </MapContext.Provider>
    )
}

const useProviderSettings = () => {
    const [mapCenter, setMapCenter] = useState(
        {
            lat: 53.13333,
            lng: 23.16433
        }
       )
    const [placeCoords, setPlaceCoords] = useState({
        mapZoom: 10,
        lat: 53.13333,
        lng: 23.16433
    })
    const [mapZoom, setMapZoom] = useState(10)
    const [popupOpen, setPopupOpen] = useState(false)
    const [popupIndex, setPopupIndex] = useState(0)
    return {
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        popupOpen,
        setPopupOpen,
        popupIndex,
        setPopupIndex,
        placeCoords,
        setPlaceCoords
    }
}

type MapContextData = ReturnType<typeof useProviderSettings>

export const useMapContext = () => {
    const context = useContext(MapContext)
    if(!context) throw new Error('MapContext should be placed inside MapContextProvider')
    return context
}

export default MapContextProvider