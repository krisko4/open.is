import { Slide } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { FC, useEffect } from "react";
import { useAppDispatch } from "redux-toolkit/hooks";
import { resetMap } from "redux-toolkit/slices/mapSlice";
import { resetSelectedLocations } from "redux-toolkit/slices/selectedLocationsSlice";
import AddressDetailsContextProvider from "../../contexts/AddressDetailsContext";
import { AuthContextProvider } from "../../contexts/AuthContext";
import MapContextProvider from "../../contexts/MapContext/MapContext";
import { Auth } from "../Auth/Auth";
import FirstHeader from "./FirstHeader";
import { MapBox } from "./Places/MapBox/MapBox";
import PlacesBox from "./Places/PlacesBox";
import { SecondHeader } from "./SecondHeader";





const Browser: FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(resetMap())
        return () => {
            dispatch(resetMap())
            dispatch(resetSelectedLocations())
        }
    }, [])

    return (
        <Grid container direction="column" style={{ height: '100vh' }}>
            <AuthContextProvider>
                <FirstHeader />
                <Auth />
            </AuthContextProvider>
            <AddressDetailsContextProvider isEditionMode={false}>
                <SecondHeader />
                {/* <MapContextProvider isMarkerDraggable={false}> */}
                <Grid container style={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Slide in={true} direction="right">
                        <Grid item lg={5}>
                            <PlacesBox />
                        </Grid>
                    </Slide>
                    <Slide in={true} direction="left">
                        <Grid item lg={7} xs={12}>
                            <MapBox />
                        </Grid>
                    </Slide>
                </Grid>
                {/* </MapContextProvider> */}
            </AddressDetailsContextProvider>
        </Grid >

    )

}

export default Browser