import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import MapContextProvider from "../../../../../../contexts/MapContext/MapContext";
import SelectedPlacesContextProvider from "../../../../../../contexts/SelectedPlacesContext";
import { AddressDetails } from "./AddressDetails";






export const Step4 : FC = () => {
    
    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 4</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Address details</Typography>
                <Typography style={{ marginTop: 20 }} variant="subtitle1">Please enter the location of your business inside the field below.
                 Make sure to provide valid address, including city and street number.
                 </Typography>
            </Grid>
            <MapContextProvider>
                <SelectedPlacesContextProvider>
                    <AddressDetails />
                </SelectedPlacesContextProvider>
            </MapContextProvider>
        </Grid>
    )
}