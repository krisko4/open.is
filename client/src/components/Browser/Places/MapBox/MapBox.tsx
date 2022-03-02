import makeStyles from '@mui/styles/makeStyles';
import 'leaflet/dist/leaflet.css';
import { FC, useMemo, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useAddressDetailsContext } from "../../../../contexts/AddressDetailsContext";
import { useColorMode } from '../../../../contexts/ColorModeContext';
import { useMapContext } from '../../../../contexts/MapContext/MapContext';
import { PlaceMarker } from "./PlaceMarker";
import { SetViewOnClick } from "./SetViewOnClick";



const useStyles = makeStyles({
    popup: {
        '& .leaflet-popup-content': {
            width: 160
        },
        '& .leaflet-popup-content-wrapper': {
            background: 'green'
        },
        '& .leaflet-popup-tip': {
            background: 'green'
        }
    },
    icon: {
        borderRadius: 15,
        objectFit: 'contain'
    }
})







export const MapBox: FC = () => {

    const { placeCoords } = useMapContext()
    const { chosenCriterias } = useAddressDetailsContext()
    const classes = useStyles()
    const layerRef = useRef<any>(null)
    const { mode } = useColorMode()


    const tileLayer = useMemo(() => {
        const attribution = 'copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        const url = mode === 'dark' ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        if (layerRef.current) {
            layerRef.current.setUrl(url)
        }
        return {
            attribution: attribution,
            url: url
        }

    }, [mode])


    return (
        <MapContainer
            style={{ height: '100%', flexGrow: 1 }}
            center={{ lat: placeCoords.lat, lng: placeCoords.lng }}
            zoom={placeCoords.mapZoom}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution={tileLayer.attribution}
                ref={layerRef}
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

