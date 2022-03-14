import { LoadingButton } from "@mui/lab";
import { Alert, Fade, Grid, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { useAddressSelector, setAddressData, useAddressDataSelector, useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { useAddressDetailsContext } from "../../../../../../contexts/AddressDetailsContext";
import { useMapContext } from "../../../../../../contexts/MapContext/MapContext";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { getPlaceByLatLng } from "../../../../../../requests/PlaceRequests";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";
import { MapBox } from "../../../../../Browser/Places/MapBox/MapBox";
import { AddressSearcher } from "../../../../../reusable/AddressSearcher";

interface Props {
    setActiveStep?: React.Dispatch<React.SetStateAction<number>>,
    setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,

}


export const AddressDetails: FC<Props> = ({ setActiveStep, setAddressSubmitted }) => {

    const { setPlaceCoords } = useMapContext()
    const { enqueueErrorSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const addressData = useAddressDataSelector()
    const { selectedAddress, isEditionMode, setSelectedAddress } = useAddressDetailsContext()
    const [submitLoading, setSubmitLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submitAddress = async () => {
        if (!selectedAddress.postcode) {
            setErrorMessage('This is not a valid address. Please provide a street number.')
            return
        }
        setSubmitLoading(true)
        try {
            const res = await getPlaceByLatLng(selectedAddress.lat, selectedAddress.lng)
            if (res.data && (!isEditionMode || (isEditionMode && addressData.address !== res.data.locations[0].address))) {
                setErrorMessage('Selected location is already occupied. If your place is located on this address, try to change the position of a marker.')
                return
            }
            const newAddressData = {
                lat: selectedAddress.lat,
                lng: selectedAddress.lng,
                address: selectedAddress.label,
                addressId: selectedAddress.addressId,
                addressLanguage: selectedAddress.language
            }
            dispatch(setAddressData(newAddressData))
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
        if (addressData.address !== '') {
            setSelectedAddress({
                label: addressData.address,
                lng: addressData.lng,
                language: navigator.language,
                lat: addressData.lat,
                addressId: addressData.addressId,
                postcode: 'default'
            })
            setPlaceCoords({
                lat: addressData.lat,
                lng: addressData.lng,
                mapZoom: 20
            })
        }
        // setSelectedPlaces([{ ...currentPlace }])
    }, [])

    return (
        <Fade timeout={1000} in={true}>
            <Grid container justifyContent="center">
                <Grid container justifyContent="center">
                    {selectedAddress.postcode &&
                        <Fade timeout={500} in={true}>
                            <Alert style={{ marginBottom: 10, flexGrow: 1 }} variant="filled" severity="info">Current address: {selectedAddress.label}</Alert>
                        </Fade>
                    }
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
                <LoadingButton
                    size="large"
                    loading={submitLoading}
                    disabled={!selectedAddress.postcode || submitLoading}
                    variant="contained"
                    onClick={() => submitAddress()}
                    fullWidth={true}
                    style={{ marginTop: 10 }}
                    color="primary"
                >
                    Submit
                </LoadingButton>
            </Grid>

        </Fade>
    );
}