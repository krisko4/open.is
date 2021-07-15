import Grid from "@material-ui/core/Grid";
import React, {useContext, useEffect} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Avatar from "@material-ui/core/Avatar";
import {Typography} from "@material-ui/core";
import {SelectedPlacesContext} from "../../contexts/SelectedPlacesContext";



let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;




const MapBox = ({mapCenter}) => {

    const {chosenCriterias} = useContext(SelectedPlacesContext)

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
                    url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                />
                {
                    chosenCriterias.map((criterium, index) => {
                        return(
                            <Marker key={index} position = {[criterium.lat, criterium.lng]}>
                                <Popup style={{width: 400}}>
                                    <Grid container>
                                        <Avatar src="https://d-art.ppstatic.pl/kadry/k/r/1/53/86/5ca4afec59405_o_medium.jpg"/>
                                        <Typography variant="h6">
                                            {criterium.name}
                                        </Typography>
                                    </Grid>

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