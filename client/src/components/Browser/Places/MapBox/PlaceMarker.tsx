import { Avatar, Grid, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import L from 'leaflet';
import LCG from 'leaflet-control-geocoder';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { FC, useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { useSelectedPlacesContext } from "../../../../contexts/SelectedPlacesContext";








export const PlaceMarker: FC<any> = ({ criterium, index, classes }) => {

    const placeMarker = useRef<any>(null)
    const { popupOpen, popupIndex, setCurrentPlace, setPlaceCardClicked, setPopupOpen, setPopupIndex } = useMapContext()
    const { isEditionMode, chosenCriterias, setSelectedAddress, setChosenCriterias } = useSelectedPlacesContext()
    const firstRender = useRef(true)
    const history = useHistory()
    const match = useRouteMatch()

    const myIcon = L.icon({
        // iconUrl: `https://image.flaticon.com/icons/png/512/149/149059.png`,
        iconUrl: criterium.img || `https://image.flaticon.com/icons/png/512/149/149059.png`,
        iconSize: [50, 50],
        // iconAnchor: [10, 0],
        shadowUrl: iconShadow,
        popupAnchor: [0, -30],
        className: classes.icon

    });

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if (placeMarker.current && popupIndex === index) {
            popupOpen ? placeMarker.current.openPopup() : placeMarker.current.closePopup()
        }
    }, [popupOpen])

    return (
        <Marker
            icon={myIcon}
            ref={placeMarker}
            eventHandlers={{
                click: () => {
                    const place = chosenCriterias.find((criterium: any, index: number) => criterium.lat === placeMarker.current._latlng.lat && criterium.lng === placeMarker.current._latlng.lng)
                    setCurrentPlace(place)
                    setPopupIndex(index)
                    setPopupOpen(true)
                    setPlaceCardClicked(true)
                    history.push(`${match.url}/${place.name}`)
                },
                dragend: async () => {
                    criterium.lat = placeMarker.current._latlng.lat
                    criterium.lng = placeMarker.current._latlng.lng
                    const lat: number = criterium.lat
                    const lng: number = criterium.lng
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
                    const criterias = [criterium]
                    setChosenCriterias(criterias)
                    const address = res.data
                    console.log(address)
                    setSelectedAddress({
                        label: address.display_name,
                        lat: lat,
                        lng: lng,
                        postcode: address.address.postcode
                    })

                }
            }}
            position={[criterium.lat, criterium.lng]}
            draggable={isEditionMode}
        >
            <Popup className={classes.popup}>
                <Grid container justify="center" alignItems="center">
                    <Avatar style={{ width: 60, height: 60 }} src={criterium.img} />
                    <Grid container item style={{ textAlign: 'center' }} alignItems="center" direction="column">
                        <Typography variant="h6">
                            {criterium.name}
                        </Typography>
                    </Grid>
                    <Rating
                        style={{ marginTop: 20 }}
                        name="simple-controlled"
                        readOnly
                        value={criterium.averageNote.average || 0}
                    />
                </Grid>
            </Popup>
        </Marker>
    )

}