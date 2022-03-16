import { CircularProgress, Grid } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdAndSelectedLocationQuery } from "redux-toolkit/api/placesApi";
import { useAppDispatch } from "redux-toolkit/hooks";
import { useCustomSnackbar } from "utils/snackbars";
import { NotReady } from "../../../../reusable/NotReady";
import { PanelTabNavigator } from "../../../../reusable/PanelTabNavigator";
import { OpeningHoursWrapper } from "./OpeningHours/OpeningHoursWrapper";
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


export const PlaceBoard: FC = () => {

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
        const key = place?._id as string
        const settingsTab = {
            name: 'Settings',
            url: Destinations.SETTINGS,
            content: <PlaceSettings key={key} />
        }

        const tabs = [
            {
                name: 'Home',
                url: Destinations.HOME,
                content: <PlaceDashboard key={key} />
            },
            {
                name: 'Statistics',
                url: Destinations.STATISTICS,
                content: <NotReady />
            },
            {
                name: 'Opening hours',
                url: Destinations.OPENING_HOURS,
                content: <OpeningHoursWrapper key={key} />
            },
            {
                name: 'Events',
                url: Destinations.EVENTS,
                content: <NotReady />
            },
            {
                name: 'Opinions',
                url: Destinations.OPINIONS,
                content: <Opinions key={key} />
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
    }, [place])



    return (
        <>
            {isFetching ?
                <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress disableShrink />
                </Grid> :
                <PanelTabNavigator tabs={tabs} />
            }
        </>
    )
}