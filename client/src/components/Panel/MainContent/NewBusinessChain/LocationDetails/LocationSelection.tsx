import { Grid, IconButton, Typography } from "@material-ui/core"
import { KeyboardReturn } from "@material-ui/icons"
import React, { FC } from "react"
import MapContextProvider from "../../../../../contexts/MapContext/MapContext"
import SelectedPlacesContextProvider from "../../../../../contexts/SelectedPlacesContext"
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

    return (
        <>
            <IconButton onClick={() => setCurrentStep(Steps.BUSINESS_INFORMATION)} color="primary">
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
                    <SelectedPlacesContextProvider isEditionMode={true}>
                        <Grid item container lg={10} justify="center" style={{ marginTop: 20 }}>
                            <Grid item lg={10}>
                                <AddressDetails setAddressSubmitted={setAddressSubmitted} />
                            </Grid>
                        </Grid >
                    </SelectedPlacesContextProvider>
                </MapContextProvider>
            </Grid>
        </>
    )
}

