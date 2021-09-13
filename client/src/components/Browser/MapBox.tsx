import { makeStyles, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Rating } from "@material-ui/lab";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { FC, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useMapContext } from '../../contexts/MapContext/MapContext';
import { useSelectedPlacesContext } from "../../contexts/SelectedPlacesContext";


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const useStyles = makeStyles({
    popup: {
        '& .leaflet-popup-content': {
            width: 150
        }
    }
})

interface ViewProps {
    mapZoom: number,
    coords: {
        lat: number,
        lng: number
    }
}

interface Props {
    tileLayer: any
}


const SetViewOnClick: FC<ViewProps> = ({ coords, mapZoom }) => {
    const map = useMap();
    map.setView(coords, mapZoom);
    return null;
}


export const MapBox: FC<Props> = ({ tileLayer }) => {

    const { mapCenter, popupOpen, mapZoom } = useMapContext()
    const { chosenCriterias } = useSelectedPlacesContext()
    const placeMarker = useRef<any>(null)
    const firstRender = useRef(true)
    const classes = useStyles()


    useEffect(() => {
        if (firstRender.current) {
            console.log(tileLayer)
            firstRender.current = false
            return
        }
        console.log(chosenCriterias)
        popupOpen && placeMarker ? placeMarker.current.openPopup() : placeMarker && placeMarker?.current.closePopup()
    }, [popupOpen])

    return (
        <MapContainer style={{ height: '100%', flexGrow: 1 }} center={mapCenter} zoom={mapZoom}
            scrollWheelZoom={true}>
            <TileLayer
                attribution={tileLayer.attribution}
                url={tileLayer.url}
            />
            {
                chosenCriterias.map((criterium: any, index: number) => {

                    const myIcon = L.icon({
                        iconUrl: `https://image.flaticon.com/icons/png/512/149/149059.png`,
                        iconSize: [50, 50],
                        // iconAnchor: [10, 0],
                        shadowUrl: iconShadow,
                        popupAnchor : [0, -30]

                    });

                    return (
                        <Marker icon={myIcon} ref={placeMarker} key={index} position={[criterium.lat, criterium.lng]}>
                            <Popup className={classes.popup}>
                                <Grid container justify="center">
                                    <Avatar src={`${process.env.REACT_APP_BASE_URL}/images/places/${criterium.img}`} />
                                    <Grid container item xs={8} alignItems="center" direction="column">
                                        <Typography variant="h6">
                                            {criterium.name}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {criterium.subtitle}
                                        </Typography>
                                    </Grid>
                                    <Rating
                                        style={{ marginTop: 20 }}
                                        name="simple-controlled"
                                        readOnly
                                        value={criterium.averageNote.average}
                                    />
                                </Grid>
                            </Popup>
                        </Marker>
                    )
                })
            }
            <SetViewOnClick coords={mapCenter} mapZoom={mapZoom} />
        </MapContainer>
    )
}

