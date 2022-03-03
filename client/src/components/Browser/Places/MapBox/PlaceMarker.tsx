import { Paper, Avatar, Grid, Typography, styled } from "@mui/material";
import { Rating } from '@mui/material';
import axios from "axios";
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { FC, useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useAddressDetailsContext } from "../../../../contexts/AddressDetailsContext";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";
import icon from 'leaflet/dist/images/marker-icon.png';



const StyledPopup = styled(Popup)(({ theme }) => ({
    '& .leaflet-popup-content': {
        width: 160
    },
    '& .leaflet-popup-content-wrapper, .leaflet-popup-tip': {
        background: theme.palette.background.paper
    },
}))

interface Props {
    criterium: CurrentPlaceProps,
    index: number,
    classes: any
}

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const PlaceMarker: FC<Props> = ({ criterium, index, classes }) => {

    const placeMarker = useRef<any>(null)
    const { popupOpen, popupIndex, setCurrentPlace, setPlaceCardClicked, setPopupOpen, setPopupIndex, isMarkerDraggable } = useMapContext()
    const { chosenCriterias, setSelectedAddress, setChosenCriterias } = useAddressDetailsContext()
    const firstRender = useRef(true)
    const history = useHistory()
    const match = useRouteMatch()
    const img = criterium.logo as string
    const myIcon = L.icon({
        // iconUrl: `https://image.flaticon.com/icons/png/512/149/149059.png`,
        iconUrl: img,
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
            icon={img ? myIcon : DefaultIcon}
            ref={placeMarker}
            eventHandlers={{
                click: () => {
                    const place = chosenCriterias.find((criterium: any, index: number) => criterium.lat === placeMarker.current._latlng.lat && criterium.lng === placeMarker.current._latlng.lng)
                    setCurrentPlace(place)
                    setPopupIndex(index)
                    setPopupOpen(true)
                    if (!isMarkerDraggable) {
                        setPlaceCardClicked(true)
                        history.push(`${match.url}/${place._id}`)
                    }
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
                    const { osm_type, osm_id } = address
                    setSelectedAddress({
                        label: address.display_name,
                        language: navigator.language,
                        lat: lat,
                        lng: lng,
                        postcode: address.address.postcode,
                        addressId: `${osm_type[0].toString().toUpperCase()}${osm_id}`
                    })

                }
            }}
            position={[criterium.lat, criterium.lng]}
            draggable={isMarkerDraggable}
        >
            <StyledPopup>
                <Grid container justifyContent="center" alignItems="center">
                    <Avatar
                        imgProps={{
                            style: {
                                objectFit: 'contain'
                            }
                        }}
                        style={{ width: 60, height: 60 }}
                        src={criterium.logo as string}
                    />
                    <Grid container item style={{ textAlign: 'center' }} alignItems="center" direction="column">
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            {criterium.name}
                        </Typography>
                    </Grid>
                    <Rating
                        style={{ marginTop: 20 }}
                        name="simple-controlled"
                        readOnly
                        value={criterium.averageNote?.average || 0}
                    />
                </Grid>
            </StyledPopup>
        </Marker>
    );

}