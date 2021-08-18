import React, { FC } from "react";
import { Button, Grid, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { AddressDetailsForm } from "./AddressDetailsForm";
import MapBox from "../../../../../Browser/MapBox";
import MapContextProvider from "../../../../../../contexts/MapContext/MapContext";
import SelectedPlacesContextProvider from "../../../../../../contexts/SelectedPlacesContext";


const tileLayer = {
    attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}



export const Step4 = ({setActiveStep}) => {
    const submitAddress = () => {
        setActiveStep(currentStep => currentStep + 1)
    }
    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 4</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Address details</Typography>
                <Typography style={{ marginTop: 20 }} variant="subtitle1">Please enter the location of your business inside the field below</Typography>
            </Grid>
            <MapContextProvider>
                <SelectedPlacesContextProvider>
                    <AddressDetailsForm />
                    <Grid style={{ height: 400, marginTop: 20 }} item lg={12}>
                        <MapBox tileLayer={tileLayer}/>
                    </Grid>
                    <Button variant="contained" onClick={() => submitAddress()} fullWidth={true} style={{marginTop: 10}} color="primary">Submit</Button>
                </SelectedPlacesContextProvider>
            </MapContextProvider>
        </Grid>
    )
}