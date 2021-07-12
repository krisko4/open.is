import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';



let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;




const MapBox = ({chosenCriterias, mapCenter}) => {

    function SetViewOnClick({ coords }) {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }

    useEffect(() => {
        console.log(mapCenter)
    }, [mapCenter])

   // const position = [53.13333, 23.16433]
    return (
        <Grid item lg={6}>
            <MapContainer style={{ height: "100%", flexGrow: 1 }} center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                   // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
                />
                {
                    chosenCriterias.map((criterium, index) => {
                        return(
                            <Marker key={index} position = {[criterium.lat, criterium.lng]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <SetViewOnClick coords={mapCenter} />
            </MapContainer>
        </Grid>
    )
}

export default MapBox