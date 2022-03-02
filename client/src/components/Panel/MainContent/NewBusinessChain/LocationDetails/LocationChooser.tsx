import { Grid } from "@mui/material"
import { FC, useState } from "react"
import MapContextProvider from "../../../../../contexts/MapContext/MapContext"
import AddressDetailsContextProvider from "../../../../../contexts/AddressDetailsContext"
import { MapBox } from "../../../../Browser/Places/MapBox/MapBox"
import { AddressDetails } from "../../NewPlace/Steps/Step4/AddressDetails"
export const LocationChooser: FC = () => {

    return (
        <MapContextProvider isMarkerDraggable={true}>
            <AddressDetailsContextProvider isEditionMode={true}>
                <Grid container lg={8} justifyContent="center">
                    <AddressDetails />
                    <Grid style={{ height: 400, marginTop: 20 }} container>
                        <MapBox  />
                    </Grid>
                </Grid >
            </AddressDetailsContextProvider>
        </MapContextProvider>
    );
}