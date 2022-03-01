import { FC, useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../../../../contexts/PlaceProps";
import { usePlacesSelector } from "../../../../../store/selectors/PlacesSelector";
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
        name: 'Settings',
        url: Destinations.SETTINGS,
        content: <PlaceSettings />
    },
    {
        name: 'Subscriptions',
        url: Destinations.SUBSCRIPTIONS,
        content: <NotReady />
    },
]

interface LocationState {
    place: CurrentPlaceProps,
    businessId: string
}

interface MatchProps {
    id: string
}

export const PlaceBoard: FC<any> = () => {

    const match = useRouteMatch<MatchProps>()
    const [value, setValue] = useState(Destinations.HOME as string)
    const location = useLocation()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const places = usePlacesSelector()

    useEffect(() => {
        const placeId = match.params.id
        console.log(placeId)
        console.log(currentPlace._id)
        if (placeId !== currentPlace._id) {
            const place = places.find(pl => pl.locations.some(loc => loc._id === placeId)) as RawPlaceDataProps
            console.log(place)
            place.locations = place.locations.filter(loc => loc._id === placeId)
            const currentPlace = convertToCurrentPlace(place)[0]
            setCurrentPlace(currentPlace)
        }
        const dest = location.pathname.substring(match.url.length + 1)
        setValue(dest)
    }, [match])

    return (
            <PanelTabNavigator value={value} setValue={setValue} placeId={match.params.id} tabs={tabs} />
    )
}