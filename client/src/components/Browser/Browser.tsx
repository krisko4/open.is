import Grid from "@material-ui/core/Grid";
import React, { FC } from "react";
import { AuthContextProvider } from "../../contexts/AuthContext";
import MapContextProvider from "../../contexts/MapContext/MapContext";
import SelectedPlacesContextProvider from "../../contexts/SelectedPlacesContext";
import FirstHeader from "./FirstHeader";
import { MapBox } from "./Places/MapBox/MapBox";
import PlacesBox from "./Places/PlacesBox";
import { SecondHeader } from "./SecondHeader";





const Browser: FC = () => {


    const tileLayer = {
        attribution: 'copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    }


    return (
        <SelectedPlacesContextProvider isEditionMode={false}>
            <Grid container direction="column" style={{ height: '100vh' }}>
                <AuthContextProvider>
                    <FirstHeader />
                </AuthContextProvider>
                <SecondHeader />
                <MapContextProvider isMarkerDraggable={false}>
                    <Grid container style={{ flexGrow: 1 }}>
                        <Grid item lg={6} xs={12}>
                            <MapBox tileLayer={tileLayer} />
                        </Grid>
                        <Grid item lg={6} xs={12} style={{background: '#202020'}}>
                            <PlacesBox />
                        </Grid>
                    </Grid>

                </MapContextProvider>
            </Grid>
        </SelectedPlacesContextProvider>


    )

}

export default Browser