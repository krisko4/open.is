import { Fade, Avatar, Grid, styled, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { FC, useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setPopup, usePopupSelector } from "redux-toolkit/slices/mapSlice";
import { SelectedLocationProps } from "redux-toolkit/slices/selectedLocationsSlice";


const useStyles = makeStyles({
    icon: {
        borderRadius: 15,
        objectFit: 'contain',
    }
})

const StyledPopup = styled(Popup)(() => ({
    '& .leaflet-popup-content': {
        width: 160
    },
    // '& .leaflet-popup-content-wrapper, .leaflet-popup-tip': {
    //     background: theme.palette.background.paper
    // },
}))

interface Props {
    location: SelectedLocationProps,
    index: number,
}

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const PlaceMarker: FC<Props> = ({ location, index }) => {

    const placeMarker = useRef<any>(null)
    const classes = useStyles()
    const navigate = useNavigate()
    const popup = usePopupSelector()
    const dispatch = useAppDispatch()

    // const { popupOpen, popupIndex, setPlaceCardClicked, setPopupOpen, setPopupIndex, isMarkerDraggable } = useMapContext()
    // const { selectedPlaces, selectedAddress, setSelectedAddress, setSelectedPlaces } = useAddressDetailsContext()
    // const firstRender = useRef(true)
    // const navigate = useNavigate()
    // const img = place.logo

    const myIcon = L.icon({
        // iconUrl: `https://image.flaticon.com/icons/png/512/149/149059.png`,
        iconUrl: location.logo as string,
        iconSize: [50, 50],
        // iconAnchor: [10, 0],
        shadowUrl: iconShadow,
        popupAnchor: [0, -30],
        className: classes.icon

    });


    useEffect(() => {
        if (placeMarker.current && popup.index === index) {
            popup.isOpen ? placeMarker.current.openPopup() : placeMarker.current.closePopup()
        }
    }, [popup.isOpen])

    return (
        <Marker
            icon={location.logo ? myIcon : DefaultIcon}
            ref={placeMarker}
            eventHandlers={{
                click: () => {
                    dispatch(setPopup({
                        isOpen: !popup.isOpen,
                        index: index
                    }))
                    navigate(`/search/${location._id}/${location.locationId}`)
                    // if (!isMarkerDraggable) {
                    //     setPlaceCardClicked(true)
                    //     navigate(`${place._id}`)
                    // }
                },
                dragend: async () => {
                    // place.lat = placeMarker.current._latlng.lat
                    // place.lng = placeMarker.current._latlng.lng
                    // const lat: number = place.lat
                    // const lng: number = place.lng
                    // const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
                    // const places = [place]
                    // setSelectedPlaces(places)
                    // const address = res.data
                    // const { osm_type, osm_id } = address
                    // setSelectedAddress({
                    //     label: address.display_name,
                    //     language: navigator.language,
                    //     lat: lat,
                    //     lng: lng,
                    //     postcode: address.address.postcode,
                    //     addressId: `${osm_type[0].toString().toUpperCase()}${osm_id}`
                    // })
                }
            }}
            position={[location.lat, location.lng]}
        // draggable={isMarkerDraggable}
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
                        src={location.logo as string}
                    />
                    <Grid container item style={{ textAlign: 'center' }} alignItems="center" direction="column">
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            {location.name}
                        </Typography>
                    </Grid>
                    {/* <Rating
                        style={{ marginTop: 20 }}
                        name="simple-controlled"
                        readOnly
                        value={place.averageNote?.average || 0}
                    /> */}
                </Grid>
            </StyledPopup>
        </Marker>

    );

}