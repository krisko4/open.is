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
        <IconButton
            onClick={() => setCurrentStep(Steps.BUSINESS_INFORMATION)}
            color="primary"
            size="large">
            <KeyboardReturn />
        </IconButton>
        <Grid item container alignItems="center" direction="column">
            <Typography variant="h4">
                Step 2
            </Typography>
            <Typography variant="subtitle1">Location selection</Typography>
            <Typography variant="subtitle2" style={{textAlign: 'center'}}>
                Please enter the location of your business in the field below.  <br/>You can also modify the location by dragging your place over the map.
                </Typography>
            <MapContextProvider isMarkerDraggable={true}>
                <AddressDetailsContextProvider isEditionMode={true}>
                    <Grid item container lg={10} justifyContent="center" style={{ marginTop: 20 }}>
                        <Grid item lg={10}>
                            <AddressDetails setAddressSubmitted={setAddressSubmitted} />
                        </Grid>
                    </Grid >
                </AddressDetailsContextProvider>
            </MapContextProvider>
        </Grid>
    </>;
}

