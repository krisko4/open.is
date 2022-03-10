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

interface Props {
    placeId: string,
    locationId: string
}

export const PlaceBoard: FC<Props> = ({ placeId, locationId }) => {

    const dispatch = useAppDispatch()
    const { enqueueErrorSnackbar } = useCustomSnackbar()
    const { data: place, isLoading, isError } = useGetPlaceByIdAndSelectedLocationQuery({
        placeId: placeId,
        locationId: locationId
    })

    useEffect(() => {
        if (isError) {
            enqueueErrorSnackbar()
        }
    }, [isError])

    useEffect(() => {
        if (place) {
            console.log(place)
            const currentPlace = convertToCurrentPlace(place)[0]
            dispatch(setCurrentPlace(currentPlace))
        }
    }, [place])


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
                content: <OpeningHours />
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
            {isLoading ?
                <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress size={100} />
                </Grid> :
                <PanelTabNavigator tabs={tabs} />
            }
        </>
    )
}