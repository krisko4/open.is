import { LoadingButton } from "@mui/lab";
import { Alert, Fade, Grid, Typography } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setAddressData, useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { useSelectedAddressSelector } from "redux-toolkit/slices/selectedAddressSlice";
import { setSelectedLocations } from "redux-toolkit/slices/selectedLocationsSlice";
import { getPlaceByLatLng } from "../../../../../../requests/PlaceRequests";
import { useCustomSnackbar } from "../../../../../../utils/snackbars";
import { MapBox } from "../../../../../Browser/Places/MapBox/MapBox";
import { AddressSearcher } from "../../../../../reusable/AddressSearcher";

interface Props {
    setActiveStep?: React.Dispatch<React.SetStateAction<number>>,
    setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,
    isEditionMode?: boolean

}


export const AddressDetails: FC<Props> = ({ setActiveStep, isEditionMode, setAddressSubmitted }) => {

    const { enqueueErrorSnackbar } = useCustomSnackbar()
    const dispatch = useAppDispatch()
    const selectedAddress = useSelectedAddressSelector()
    const [submitLoading, setSubmitLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const currentPlace = useCurrentPlaceSelector()
    const isFirstRender = useRef(true)

    const submitAddress = async () => {
        if (!selectedAddress.postcode) {
            setErrorMessage('This is not a valid address. Please provide a street number.')
            return
        }
        setSubmitLoading(true)
        try {
            const res = await getPlaceByLatLng(selectedAddress.lat, selectedAddress.lng)
            if (res.data && (!isEditionMode || (isEditionMode && selectedAddress.label !== res.data.locations[0].address))) {
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
        if(isFirstRender.current ){
            isFirstRender.current = false
            return
        }
        dispatch(setSelectedLocations([
            {
                name: currentPlace.name,
                type: currentPlace.type as string,
                logo: currentPlace.logo as string,
                lat: selectedAddress.lat,
                lng: selectedAddress.lng
            }
        ]))
    }, [selectedAddress])

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