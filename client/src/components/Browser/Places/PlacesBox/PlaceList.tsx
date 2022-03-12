import { Grid } from "@mui/material"
import { FC } from "react"
import Scrollbars from "react-custom-scrollbars"
import { Routes, Route, Outlet } from "react-router-dom"
import { PopularPlaces } from "./PopularPlaces"
import { SelectPlacesTabs } from "./SelectPlacesTabs"

export const PlaceList: FC = () => {
    return (
        <Grid container direction="column" style={{ height: '100%' }} >
            <SelectPlacesTabs />
            <Grid container style={{ flexGrow: 1 }} >
                <Outlet/>
            </Grid>
        </Grid>
    )
}