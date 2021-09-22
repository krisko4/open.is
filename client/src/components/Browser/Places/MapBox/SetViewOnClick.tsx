import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";

interface ViewProps {
    mapZoom: number,
    coords: {
        lat: number,
        lng: number
    }
}
export const SetViewOnClick: FC<ViewProps> = ({ coords, mapZoom }) => {
    const map = useMap();
    map.options.minZoom = 5
    useEffect(() => {
        console.log('hejs')
        map.setView(coords, mapZoom);
    }, [coords, mapZoom])
    return null;
}