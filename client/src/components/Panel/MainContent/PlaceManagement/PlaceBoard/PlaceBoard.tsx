import { FC } from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../../contexts/PlaceProps";
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

const TestComp : FC = () => <h1>Hello world</h1>

const tabs = [
    {
        name: 'Home',
        url: Destinations.HOME,
        content: <PlaceData />
    },
    {
        name: 'Statistics',
        url: Destinations.STATISTICS,
        content: <TestComp />
    },
    {
        name: 'Opening hours',
        url: Destinations.OPENING_HOURS,
        content: <OpeningHours/>
    },
    {
        name: 'Events',
        url: Destinations.EVENTS,
        content: <TestComp />
    },
    {
        name: 'Opinions',
        url: Destinations.OPINIONS,
        content: <Opinions/>
    },
    {
        name: 'News',
        url: Destinations.NEWS,
        content: <TestComp />
    },
    {
        name: 'Visits',
        url: Destinations.VISITS,
        content: <TestComp />
    },
    {
        name: 'Settings',
        url: Destinations.SETTINGS,
        content: <PlaceSettings/>
    },
    {
        name: 'Subscriptions',
        url: Destinations.SUBSCRIPTIONS,
        content: <TestComp />
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

    return (
        <PanelTabNavigator placeId={match.params.id} tabs={tabs} />
    )
}