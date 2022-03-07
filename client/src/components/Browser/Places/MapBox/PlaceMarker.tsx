import { Avatar, Grid, Rating, styled, Typography } from "@mui/material";
import axios from "axios";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { FC, useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useNavigate} from "react-router-dom";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace } from "redux-toolkit/slices/currentPlaceSlice";
import { useAddressDetailsContext } from "../../../../contexts/AddressDetailsContext";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";



const StyledPopup = styled(Popup)(({ theme }) => ({
    '& .leaflet-popup-content': {
        width: 160
    },
    // '& .leaflet-popup-content-wrapper, .leaflet-popup-tip': {
    //     background: theme.palette.background.paper
    // },
}))

interface Props {
    place: CurrentPlaceProps,
    index: number,
    classes: any
}

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const PlaceMarker: FC<Props> = ({ place, index, classes }) => {

    const placeMarker = useRef<any>(null)
    const { popupOpen, popupIndex, setPlaceCardClicked, setPopupOpen, setPopupIndex, isMarkerDraggable } = useMapContext()
    const { selectedPlaces, selectedAddress, setSelectedAddress, setSelectedPlaces } = useAddressDetailsContext()
    const firstRender = useRef(true)
    const navigate = useNavigate()
    const img = place.logo
    
    console.log(img)
    const myIcon = L.icon({
        // iconUrl: `https://image.flaticon.com/icons/png/512/149/149059.png`,
        iconUrl: img as string,
        iconSize: [50, 50],
        // iconAnchor: [10, 0],
        shadowUrl: iconShadow,
        popupAnchor: [0, -30],
        className: classes.icon

    });
    const dispatch = useAppDispatch()


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
                    const place = selectedPlaces.find(
                        (place, index: number) =>
                            place.lat === placeMarker.current._latlng.lat &&
                            place.lng === placeMarker.current._latlng.lng
                    ) as CurrentPlaceProps
                    dispatch(setCurrentPlace(place))
                    setPopupIndex(index)
                    setPopupOpen(true)
                    if (!isMarkerDraggable) {
                        setPlaceCardClicked(true)
                        navigate(`${place._id}`)
                    }
                },
                dragend: async () => {
                    place.lat = placeMarker.current._latlng.lat
                    place.lng = placeMarker.current._latlng.lng
                    const lat: number = place.lat
                    const lng: number = place.lng
                    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
                    const places = [place]
                    setSelectedPlaces(places)
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
            position={[place.lat, place.lng]}
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
                        src={place.logo as string}
                    />
                    <Grid container item style={{ textAlign: 'center' }} alignItems="center" direction="column">
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                            {place.name}
                        </Typography>
                    </Grid>
                    <Rating
                        style={{ marginTop: 20 }}
                        name="simple-controlled"
                        readOnly
                        value={place.averageNote?.average || 0}
                    />
                </Grid>
            </StyledPopup>
        </Marker>
    );

}