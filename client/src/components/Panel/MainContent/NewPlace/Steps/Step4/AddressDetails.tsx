import { Fade, Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Alert } from '@mui/material';
import React, { FC, useEffect, useState } from "react";
import { useAddressDetailsContext } from "../../../../../../contexts/AddressDetailsContext";
import { useMapContext } from "../../../../../../contexts/MapContext/MapContext";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { getPlaceByLatLng } from "../../../../../../requests/PlaceRequests";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";
import { MapBox } from "../../../../../Browser/Places/MapBox/MapBox";
import { AddressSearcher } from "../../../../../reusable/AddressSearcher";
import { LoadingButton } from "@mui/lab";

interface Props {
    setActiveStep?: React.Dispatch<React.SetStateAction<number>>,
    setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,

}


export const AddressDetails: FC<Props> = ({ setActiveStep, setAddressSubmitted }) => {

    const { setPlaceCoords } = useMapContext()
    const { enqueueErrorSnackbar } = useCustomSnackbar()


    const { setChosenCriterias, selectedAddress, isEditionMode, setSelectedAddress } = useAddressDetailsContext()
    const { currentPlace } = useCurrentPlaceContext()
    const [submitLoading, setSubmitLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitAddress = async () => {
        setSubmitLoading(true)
        try {
            const res = await getPlaceByLatLng(selectedAddress.lat, selectedAddress.lng)
            if (!selectedAddress.postcode) {
                setErrorMessage('This is not a valid address. Please provide a street number.')
                return
            }
            if (res.data && (!isEditionMode || (isEditionMode && currentPlace.address !== res.data.locations[0].address))) {
                setErrorMessage('Selected location is already occupied by another place. If your place is located on this address, try to change the position of a marker.')
                return
            }
            currentPlace.address = selectedAddress.label
            currentPlace.addressId = selectedAddress.addressId 
            currentPlace.lat = selectedAddress.lat
            currentPlace.lng = selectedAddress.lng
            currentPlace.addressLanguage = selectedAddress.language
            setActiveStep && setActiveStep(currentStep => currentStep + 1)
            setAddressSubmitted && setAddressSubmitted(addressSubmitted => !addressSubmitted)
        } catch (err) {
            enqueueErrorSnackbar()
        }
        finally {
            setSubmitLoading(false)
        }
    }


    useEffect(() => {
        if (currentPlace.address !== '') {
            setSelectedAddress({
                label: currentPlace.address,
                lng: currentPlace.lng,
                language: navigator.language,
                lat: currentPlace.lat,
                addressId: currentPlace.addressId,
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
        <Fade timeout={1000} in={true}>
            <Grid container justifyContent="center">
                <Grid container justifyContent="center">
                    {selectedAddress.postcode && <Alert style={{ marginBottom: 10, flexGrow: 1 }} variant="filled" severity="info">Current address: {selectedAddress.label}</Alert>}
                </Grid>
                <Grid item lg={12}>
                    <AddressSearcher errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                </Grid>
                <Fade in={errorMessage !== ''}>
                    <Grid item lg={12} style={{ textAlign: 'center' }}>
                        <Typography style={{ color: 'red' }} variant="caption">{errorMessage}</Typography>
                    </Grid>
                </Fade>
                <Grid style={{ height: 500, marginTop: 10 }} container>
                    <MapBox />
                </Grid>
                <LoadingButton size="large" loading={submitLoading} disabled={!selectedAddress.postcode || submitLoading} variant="contained" onClick={() => submitAddress()} fullWidth={true} style={{ marginTop: 10 }} color="primary">Submit</LoadingButton>
            </Grid>

        </Fade>
    );
}