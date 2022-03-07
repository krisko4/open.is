import { Grid } from "@mui/material"
import React, { FC } from "react"
import AddressDetailsContextProvider from "../../../../../contexts/AddressDetailsContext"
import MapContextProvider from "../../../../../contexts/MapContext/MapContext"
import { AddressDetails } from "../../NewPlace/Steps/Step4/AddressDetails"

enum Steps {
    BUSINESS_INFORMATION,
    BUSINESS_DETAILS
}

interface Props {
    setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,

}

export const LocationSelection: FC<Props> = ({setAddressSubmitted }) => {

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

