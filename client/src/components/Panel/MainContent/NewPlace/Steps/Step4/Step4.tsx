import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import AddressDetailsContextProvider from "../../../../../../contexts/AddressDetailsContext";
import MapContextProvider from "../../../../../../contexts/MapContext/MapContext";
import { useStepContext } from "../../../../../../contexts/StepContext";
import { AddressDetails } from "./AddressDetails";




interface Props{
    isEditionMode: boolean
}

export const Step4 : FC<Props> = ({isEditionMode}) => {

    const {setActiveStep} = useStepContext()
    
    return (
        <Grid item lg={12} container justifyContent="center">
            <MapContextProvider isMarkerDraggable={true}>
                <AddressDetailsContextProvider isEditionMode={isEditionMode}>
                    <AddressDetails setActiveStep={setActiveStep} />
                </AddressDetailsContextProvider>
            </MapContextProvider>
        </Grid>
    );
}