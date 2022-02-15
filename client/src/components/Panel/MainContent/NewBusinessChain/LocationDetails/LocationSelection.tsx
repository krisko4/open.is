import { Grid, IconButton, Typography } from "@mui/material"
import { KeyboardReturn } from "@mui/icons-material"
import React, { FC } from "react"
import AddressDetailsContextProvider from "../../../../../contexts/AddressDetailsContext"
import MapContextProvider from "../../../../../contexts/MapContext/MapContext"
import { AddressDetails } from "../../NewPlace/Steps/Step4/AddressDetails"

enum Steps {
    BUSINESS_INFORMATION,
    BUSINESS_DETAILS
}

interface Props {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,

}

export const LocationSelection: FC<Props> = ({ setCurrentStep, setAddressSubmitted }) => {

    return <>
        <Grid container alignItems="center" justifyContent="center">
            <MapContextProvider isMarkerDraggable={true}>
                <AddressDetailsContextProvider isEditionMode={true}>
                    <Grid container item justifyContent="center" lg={11}>
                        <AddressDetails setAddressSubmitted={setAddressSubmitted} />
                    </Grid>
                </AddressDetailsContextProvider>
            </MapContextProvider>
        </Grid>
    </>;
}

