import { Grid } from "@material-ui/core"
import { FC, useState } from "react"
import MapContextProvider from "../../../../../contexts/MapContext/MapContext"
import SelectedPlacesContextProvider from "../../../../../contexts/SelectedPlacesContext"
import { MapBox } from "../../../../Browser/Places/MapBox/MapBox"
import { AddressDetails } from "../../NewPlace/Steps/Step4/AddressDetails"
export const LocationChooser: FC = () => {

    const [tileLayer, setTileLayer] = useState({
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    })
    return (
        <MapContextProvider>
            <SelectedPlacesContextProvider isEditionMode={true}>
                <Grid container lg={8} justify="center">
                    <AddressDetails />
                    <Grid style={{ height: 400, marginTop: 20 }} container>
                        <MapBox tileLayer={tileLayer} />
                    </Grid>
                </Grid >
            </SelectedPlacesContextProvider>
        </MapContextProvider>
    )
}