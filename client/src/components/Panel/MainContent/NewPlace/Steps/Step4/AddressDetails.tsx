import { Fade, Grid, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMapContext } from "../../../../../../contexts/MapContext/MapContext";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { usePanelContext } from "../../../../../../contexts/PanelContexts/PanelContext";
import { useSelectedPlacesContext } from "../../../../../../contexts/SelectedPlacesContext";
import { findByAddress, getPlaceByLatLng } from "../../../../../../requests/PlaceRequests";
import { MapBox } from "../../../../../Browser/Places/MapBox/MapBox";
import { AddressSearcher } from "../../../../../reusable/AddressSearcher";
import { LoadingButton } from "../../../../../reusable/LoadingButton";

interface Props {
    setActiveStep?: React.Dispatch<React.SetStateAction<number>>,
    setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,
    
}

export const AddressDetails: FC<Props> = ({ setActiveStep, setAddressSubmitted }) => {

    const [open, setOpen] = useState(false)
    const { setPlaceCoords } = useMapContext()
    const { enqueueSnackbar } = useSnackbar()

    const [tileLayer, setTileLayer] = useState({
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })

    const { selectedPlaces, setSelectedPlaces, setChosenCriterias, selectedAddress, isEditionMode, setSelectedAddress, setEditionMode } = useSelectedPlacesContext()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const isFirstFind = useRef(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitAddress = async () => {
        setSubmitLoading(true)
        try {
            console.log(selectedAddress)
            const res = await getPlaceByLatLng(selectedAddress.lat, selectedAddress.lng)
            console.log(res.data)
            if (!selectedAddress.postcode) {
                setErrorMessage('This is not a valid address. Please provide a street number.')
                return
            }
            if (res.data && !isEditionMode || (isEditionMode && res.data.address !== currentPlace.address)) {
                setErrorMessage('Selected location is already occupied by another place. If your place is located on this address, try to change the position of a marker.')
                return
            }
            console.log(selectedAddress.postcode)
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.address = selectedAddress.label
            const lat: number = selectedAddress.lat
            const lng: number = selectedAddress.lng
            newCurrentPlace.lat = lat
            newCurrentPlace.lng = lng
            setCurrentPlace(newCurrentPlace)
            setActiveStep && setActiveStep(currentStep => currentStep + 1)
            setAddressSubmitted && setAddressSubmitted(addressSubmitted => !addressSubmitted)
        } catch (err) {
            enqueueSnackbar("Oops, something went wrong", {
                variant: 'error'
            })
        }
        finally {
            setSubmitLoading(false)
        }
    }


    useEffect(() => {
        console.log(selectedAddress)
        if (currentPlace.address !== '') {
            setSelectedAddress({
                label: currentPlace.address,
                lng: currentPlace.lng,
                lat: currentPlace.lat,
                postcode: 'default'
            })
            setPlaceCoords({
                lat: currentPlace.lat,
                lng: currentPlace.lng,
                mapZoom: 20
            })
            setChosenCriterias([{ ...currentPlace }])
        }
    }, [])

    return (
        <Grid container justify="center">
            <Fade in={errorMessage !== ''}>
                <Grid item lg={8} style={{ textAlign: 'center', marginBottom: 10 }}>
                    <Typography style={{ color: 'red' }} variant="caption">{errorMessage}</Typography>
                </Grid>
            </Fade>
            <Grid container justify="center">
                {selectedAddress.postcode &&  <Alert variant="outlined" style={{ marginBottom: 20 }} severity="info">Current address: {selectedAddress.label}</Alert>}
            </Grid>
            <Grid item lg={8}>
                <AddressSearcher setErrorMessage={setErrorMessage} />
            </Grid>
            <Grid style={{ height: 400, marginTop: 20 }} container>
                <MapBox tileLayer={tileLayer} />
            </Grid>
            <LoadingButton loading={submitLoading} disabled={!selectedAddress.label || submitLoading} variant="contained" onClick={() => submitAddress()} fullWidth={true} style={{ marginTop: 10, marginBottom: 10 }} color="primary">Submit</LoadingButton>
        </Grid>
    )
}