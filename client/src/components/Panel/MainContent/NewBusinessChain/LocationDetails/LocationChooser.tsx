import { Grid } from "@mui/material"
import { FC, useState } from "react"
import MapContextProvider from "../../../../../contexts/MapContext/MapContext"
import AddressDetailsContextProvider from "../../../../../contexts/AddressDetailsContext"
import { MapBox } from "../../../../Browser/Places/MapBox/MapBox"
import { AddressDetails } from "../../NewPlace/Steps/Step4/AddressDetails"
export const LocationChooser: FC = () => {

    const [tileLayer, setTileLayer] = useState({
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })
    return (
        <MapContextProvider isMarkerDraggable={true}>
            <AddressDetailsContextProvider isEditionMode={true}>
                <Grid container lg={8} justifyContent="center">
                    <AddressDetails />
                    <Grid style={{ height: 400, marginTop: 20 }} container>
                        <MapBox tileLayer={tileLayer} />
                    </Grid>
                </Grid >
            </AddressDetailsContextProvider>
        </MapContextProvider>
    );
}