import { FC, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../../../../contexts/PlaceProps";
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




interface MatchProps {
    id: string
}

export const PlaceBoard: FC = () => {

    const match = useRouteMatch<MatchProps>()
    const [value, setValue] = useState(Destinations.HOME as string)
    const location = useLocation()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const places = usePlacesSelector()
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
        if(!currentPlace.isBusinessChain) tabs.push(settingsTab)
        return tabs

    }, [currentPlace.isBusinessChain])


    useEffect(() => {
        const placeId = match.params.id
        if (placeId !== currentPlace._id) {
            const place = places.find(pl => pl.locations.some(loc => loc._id === placeId)) as RawPlaceDataProps
            const placeCopy = { ...place, locations: place.locations.filter(loc => loc._id === placeId) }
            const currentPlace = convertToCurrentPlace(placeCopy)[0]

            setCurrentPlace(currentPlace)
        }
        const dest = location.pathname.substring(match.url.length + 1)
        setValue(dest)
    }, [match])

    return (
        <PanelTabNavigator value={value} setValue={setValue} placeId={match.params.id} tabs={tabs} />
    )
}