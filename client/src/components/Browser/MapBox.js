import Grid from "@material-ui/core/Grid";
import React, {useContext, useEffect, useRef} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Avatar from "@material-ui/core/Avatar";
import {Typography} from "@material-ui/core";
import {SelectedPlacesContext} from "../../contexts/SelectedPlacesContext";
import {MapContext} from "../../contexts/MapContext";


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapBox = () => {

    const {mapCenter, popupOpen, mapZoom} = useContext(MapContext)
    const {chosenCriterias} = useContext(SelectedPlacesContext)
    const placeMarker = useRef()
    const firstRender = useRef(true)


    function SetViewOnClick({coords, mapZoom}) {
        const map = useMap();
        map.setView(coords, mapZoom);
        return null;
    }

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false
            return
        }
        if (popupOpen) {
            placeMarker.current.openPopup()
            return
        }
        placeMarker.current.closePopup()
    }, [popupOpen])

    return (
        <Grid item lg={6}>
            <MapContainer style={{height: "100%", flexGrow: 1}} center={mapCenter} zoom={mapZoom}
                          scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                />
                {
                    chosenCriterias.map((criterium, index) => {
                        return (
                            <Marker ref={placeMarker} key={index} position={[criterium.lat, criterium.lng]}>
                                <Popup style={{width: 400}}>
                                    <Grid container>
                                        <Avatar src={`${process.env.REACT_APP_BASE_URL}/images/${criterium.img}`}/>
                                        <Typography variant="h6">
                                            {criterium.name}
                                        </Typography>
                                    </Grid>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <SetViewOnClick coords={mapCenter} mapZoom={mapZoom}/>
            </MapContainer>
        </Grid>
    )
}

export default MapBox