import { Fade, CircularProgress, Grid } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useGetPlaceByIdAndSelectedLocationQuery } from "redux-toolkit/api/placesApi";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace, useCurrentPlaceSelector, useIsBusinessChainSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { getPlaceById, getPlaceByIdAndSelectedLocation } from "requests/PlaceRequests";
import { useCustomSnackbar } from "utils/snackbars";
import { RawPlaceDataProps } from "../../../../../contexts/PlaceProps";
import { convertToCurrentPlace } from "../../../../../utils/place_data_utils";
import { NotReady } from "../../../../reusable/NotReady";
import { PanelTabNavigator } from "../../../../reusable/PanelTabNavigator";
import { OpeningHours } from "./OpeningHours/OpeningHours";
import { Opinions } from "./Opinions/Opinions";
import { PlaceDashboard } from "./PlaceDashboard/PlaceDashboard.";
import { PlaceSettings } from "./Settings/PlaceSettings";
import {useNavigate, useParams} from 'react-router-dom'
import { OpeningHoursWrapper } from "./OpeningHours/OpeningHoursWrapper";


export enum Destinations {
    HOME = 'home',
    STATISTICS = 'statistics',
    OPENING_HOURS = 'opening-hours',
    EVENTS = 'events',
    OPINIONS = 'opinions',
    NEWS = 'news',
    VISITS = 'visits',
    SETTINGS = 'settings',
    SUBSCRIPTIONS = 'subscriptions',
    NONE = ''
}


export const PlaceBoard: FC = () => {

    const dispatch = useAppDispatch()
    const { enqueueErrorSnackbar } = useCustomSnackbar()
    const {placeId, locationId} = useParams()


    const { data: place, isFetching, isError } = useGetPlaceByIdAndSelectedLocationQuery({
        placeId: placeId as string,
        locationId: locationId as string
    })

    useEffect(() => {
        if (isError) {
            enqueueErrorSnackbar()
        }
    }, [isError])



    const tabs = useMemo(() => {
        const settingsTab = {
            name: 'Settings',
            url: Destinations.SETTINGS,
            content: <PlaceSettings />
        }

        const tabs = [
            {
                name: 'Home',
                url: Destinations.HOME,
                content: <PlaceDashboard />
            },
            {
                name: 'Statistics',
                url: Destinations.STATISTICS,
                content: <NotReady />
            },
            {
                name: 'Opening hours',
                url: Destinations.OPENING_HOURS,
                content: <OpeningHoursWrapper />
            },
            {
                name: 'Events',
                url: Destinations.EVENTS,
                content: <NotReady />
            },
            {
                name: 'Opinions',
                url: Destinations.OPINIONS,
                content: <Opinions />
            },
            {
                name: 'News',
                url: Destinations.NEWS,
                content: <NotReady />
            },
            {
                name: 'Visits',
                url: Destinations.VISITS,
                content: <NotReady />
            },
            {
                name: 'Subscriptions',
                url: Destinations.SUBSCRIPTIONS,
                content: <NotReady />
            },
        ]
        if (!place?.isBusinessChain) tabs.push(settingsTab)
        return tabs
    }, [place?.isBusinessChain])



    return (
        <>
            {isFetching ?
                <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress disableShrink size={100} />
                </Grid> :
                <PanelTabNavigator tabs={tabs} />
            }
        </>
    )
}