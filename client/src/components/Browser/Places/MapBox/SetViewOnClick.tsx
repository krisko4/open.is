import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapDataSelector } from "redux-toolkit/slices/mapSlice";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";

export const SetViewOnClick: FC = () => {
    // const {placeCoords} = useMapContext()
    const mapData = useMapDataSelector()
    const map = useMap();
    map.options.minZoom = 5
    useEffect(() => {
        map.setView({lat: mapData.lat, lng: mapData.lng}, mapData.zoom);
        
    }, [mapData])
    return null;
}