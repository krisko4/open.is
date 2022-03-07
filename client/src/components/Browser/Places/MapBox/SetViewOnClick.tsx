import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";

export const SetViewOnClick: FC = () => {
    const {placeCoords} = useMapContext()
    const map = useMap();
    map.options.minZoom = 5
    useEffect(() => {
        map.setView({lat: placeCoords.lat, lng: placeCoords.lng}, placeCoords.mapZoom);
        
    }, [placeCoords])
    return null;
}