import makeStyles from '@mui/styles/makeStyles';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAddressDetailsContext } from "../../../../contexts/AddressDetailsContext";
import { useMapContext } from '../../../../contexts/MapContext/MapContext';
import { PlaceMarker } from "./PlaceMarker";
import { SetViewOnClick } from "./SetViewOnClick";

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
    },
    icon: {
        borderRadius: 15,
        objectFit: 'cover'
    }
})


interface Props {
    tileLayer: any
}




export const MapBox: FC<Props> = ({ tileLayer }) => {

    const { placeCoords } = useMapContext()
    const { chosenCriterias } = useAddressDetailsContext()
    const classes = useStyles()

    return (
        <MapContainer
            style={{ height: '100%', flexGrow: 1 }}
            center={{ lat: placeCoords.lat, lng: placeCoords.lng }}
            zoom={placeCoords.mapZoom}
            scrollWheelZoom={true}>
            <TileLayer
                attribution={tileLayer.attribution}
                url={tileLayer.url}
            />
            {chosenCriterias.map((criterium: any, index: number) =>
                <PlaceMarker
                    key={index}
                    index={index}
                    criterium={criterium}
                    classes={classes}
                />
            )}
            <SetViewOnClick />
        </MapContainer>

    )
}

