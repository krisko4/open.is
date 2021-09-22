import { makeStyles } from "@material-ui/core";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { FC, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useMapContext } from '../../../../contexts/MapContext/MapContext';
import { useSelectedPlacesContext } from "../../../../contexts/SelectedPlacesContext";
import { PlaceMarker } from "./PlaceMarker";
import { SetViewOnClick } from "./SetViewOnClick"

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const useStyles = makeStyles({
    popup: {
        '& .leaflet-popup-content': {
            width: 160
        }
    }
})


interface Props {
    tileLayer: any
}




export const MapBox: FC<Props> = ({ tileLayer }) => {

    const { mapCenter, mapZoom } = useMapContext()
    const { chosenCriterias } = useSelectedPlacesContext()
    const classes = useStyles()
   
    return (
        <MapContainer style={{ height: '100%', flexGrow: 1 }} center={mapCenter} zoom={mapZoom}
            scrollWheelZoom={true}>
            <TileLayer
                attribution={tileLayer.attribution}
                url={tileLayer.url}
            />
            {chosenCriterias.map((criterium: any, index: number) => <PlaceMarker key={index} index={index} criterium={criterium} classes={classes} />)}
            <SetViewOnClick coords={mapCenter} mapZoom={mapZoom} />
        </MapContainer>
    )
}

