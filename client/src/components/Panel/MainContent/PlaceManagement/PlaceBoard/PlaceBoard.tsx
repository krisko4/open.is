import { CircularProgress, Grid } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace, useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
import { getPlaceById, getPlacesByUserId } from "requests/PlaceRequests";
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
    placeId: string
}

export const PlaceBoard: FC<Props> = ({ placeId }) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentPlace = useCurrentPlaceSelector()
    const [value, setValue] = useState('home')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                console.log(placeId)
                if (!placeId) return
                const res = await getPlaceById(placeId)
                console.log(res.data)
                const place = res.data as RawPlaceDataProps
                console.log(place)
                const currentPlace = convertToCurrentPlace(place)[0]
                if (!currentPlace.isActive) {
                    setValue('opening-hours')
                    navigate('opening-hours')
                }
                else{
                    navigate('home')
                    setValue('home')
                }
                dispatch(setCurrentPlace(currentPlace))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [placeId])


    useEffect(() => {
        navigate(value)
    }, [value])

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
        if (!currentPlace.isBusinessChain) tabs.push(settingsTab)
        return tabs

    }, [currentPlace.isBusinessChain])



    return (
        <>
            {loading ?
                <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                    <CircularProgress size={100} />
                </Grid> :
                <PanelTabNavigator value={value} setValue={setValue} placeId={currentPlace._id as string} tabs={tabs} />
            }
        </>
    )
}