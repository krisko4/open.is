import Grid from "@mui/material/Grid";
import React, { FC, useMemo } from "react";
import AddressDetailsContextProvider from "../../contexts/AddressDetailsContext";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { useColorMode } from "../../contexts/ColorModeContext";
import MapContextProvider from "../../contexts/MapContext/MapContext";
import { Auth } from "../Auth/Auth";
import FirstHeader from "./FirstHeader";
import { MapBox } from "./Places/MapBox/MapBox";
import PlacesBox from "./Places/PlacesBox";
import { SecondHeader } from "./SecondHeader";





const Browser: FC = () => {




    return (
        <Grid container direction="column" style={{ height: '100vh' }}>
            <AuthContextProvider>
                <FirstHeader />
                <Auth />
            </AuthContextProvider>
            <AddressDetailsContextProvider isEditionMode={false}>
                <SecondHeader />
                <MapContextProvider isMarkerDraggable={false}>
                    <Grid container style={{ flexGrow: 1 }}>
                        <Grid item lg={5}>
                            <PlacesBox />
                        </Grid>
                        <Grid item lg={7} xs={12}>
                            <MapBox />
                        </Grid>
                    </Grid>
                </MapContextProvider>
            </AddressDetailsContextProvider>
        </Grid >


    )

}

export default Browser