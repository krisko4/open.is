import React, { createContext, FC, useContext, useState } from "react";
import { CurrentPlaceProps } from "../PlaceProps";
import MapContextProps from "./MapContextProps";


export const MapContext = createContext<MapContextData | null>(null)

const MapContextProvider: FC<MapContextProps> = ({ children, isMarkerDraggable }) => {

    const state = useProviderSettings(isMarkerDraggable)

    return (
        <MapContext.Provider value={state}>
            {children}
        </MapContext.Provider>
    )
}

const useProviderSettings = (isDraggable: boolean) => {

    const [placeCoords, setPlaceCoords] = useState({
        mapZoom: 5,
        lat: 53.13333,
        lng: 23.16433
    })
    const [isMarkerDraggable, setMarkerDraggable] = useState(isDraggable)
    const [popupOpen, setPopupOpen] = useState(false)
    const [popupIndex, setPopupIndex] = useState(0)
    const [isPlaceCardClicked, setPlaceCardClicked] = useState(false)
    const [currentPlace, setCurrentPlace] = useState<CurrentPlaceProps | null>(null)
    return {
        popupOpen,
        setPopupOpen,
        popupIndex,
        setPopupIndex,
        placeCoords,
        setPlaceCoords,
        isPlaceCardClicked,
        setPlaceCardClicked,
        currentPlace,
        setCurrentPlace,
        isMarkerDraggable,
        setMarkerDraggable

    }
}

type MapContextData = ReturnType<typeof useProviderSettings>

export const useMapContext = () => {
    const context = useContext(MapContext)
    if (!context) throw new Error('MapContext should be placed inside MapContextProvider')
    return context
}

export default MapContextProvider