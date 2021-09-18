import { Avatar, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import L, { tileLayer } from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { FC, useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";


const myIcon = L.icon({
    iconUrl: `https://image.flaticon.com/icons/png/512/149/149059.png`,
    iconSize: [50, 50],
    // iconAnchor: [10, 0],
    shadowUrl: iconShadow,
    popupAnchor: [0, -30]

});


export const PlaceMarker: FC<any> = ({criterium, index, classes}) => {

    const placeMarker = useRef<L.Marker<any> | null>(null)
    const {popupOpen, popupIndex} = useMapContext()
    const firstRender = useRef(true)
    useEffect(() => {
        if (firstRender.current) {
            console.log(tileLayer)
            firstRender.current = false
            return
        }
        
        if (placeMarker.current && popupIndex === index) {
            popupOpen ? placeMarker.current.openPopup() : placeMarker?.current.closePopup()
        }
    }, [popupOpen])
    
    return (
        <Marker icon={myIcon} ref={placeMarker} position={[criterium.lat, criterium.lng]}>
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

}