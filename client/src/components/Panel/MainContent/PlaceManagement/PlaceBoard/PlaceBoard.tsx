import { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace, useCurrentPlaceSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { RawPlaceDataProps } from "../../../../../contexts/PlaceProps";
import { convertToCurrentPlace } from "../../../../../utils/place_data_utils";
import { NotReady } from "../../../../reusable/NotReady";
import { PanelTabNavigator } from "../../../../reusable/PanelTabNavigator";
import { OpeningHours } from "./OpeningHours/OpeningHours";
import { Opinions } from "./Opinions/Opinions";
import { PlaceData } from "./PlaceData/PlaceData";
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

    const places = usePlacesSelector()
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentPlace = useCurrentPlaceSelector()
    const [value, setValue] = useState('home')

    useEffect(() => {
        const place = places.find(pl => pl.locations.some(loc => loc._id === id)) as RawPlaceDataProps
        const currentPlace = convertToCurrentPlace(place)[0]
        dispatch(setCurrentPlace(currentPlace))
    }, [id])


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
                content: <PlaceData />
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
        <PanelTabNavigator value={value} setValue={setValue} placeId={currentPlace._id as string} tabs={tabs} />
    )
}