import { Box, Card, Grid, Paper, Tab, Tabs, Toolbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../../../../contexts/PlaceProps";
import { StepContextProvider } from "../../../../../contexts/StepContext";
import { setPlace } from "../../../../../store/actions/setCurrentPlace";
import { usePlacesSelector } from "../../../../../store/selectors/PlacesSelector";
import { convertToCurrentPlace } from "../../../../../utils/place_data_utils";
import { PanelTabNavigator } from "../../../../reusable/PanelTabNavigator";
import newPlaceSteps from "../../NewPlace/Steps/steps";
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
    SUBSCRIPTIONS = 'subscriptions'
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
        content: <h1>Hello world</h1>
    },
    {
        name: 'Opening hours',
        url: Destinations.OPENING_HOURS,
        content: <OpeningHours />
    },
    {
        name: 'Events',
        url: Destinations.EVENTS,
        content: <h1>Hello world</h1>
    },
    {
        name: 'Opinions',
        url: Destinations.OPINIONS,
        content: <Opinions />
    },
    {
        name: 'News',
        url: Destinations.NEWS,
        content: <h1>Hello world</h1>
    },
    {
        name: 'Visits',
        url: Destinations.VISITS,
        content: <h1>Hello world</h1>
    },
    {
        name: 'Settings',
        url: Destinations.SETTINGS,
        content:
            <StepContextProvider steps={newPlaceSteps}>
                <PlaceSettings />
            </StepContextProvider>
    },
    {
        name: 'Subscriptions',
        url: Destinations.SUBSCRIPTIONS,
        content: <h1>Hello world</h1>
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


    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const location = useLocation<LocationState>()
    const match = useRouteMatch<MatchProps>()
    const history = useHistory()
    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const [value, setValue] = useState(Destinations.HOME as string)



    useEffect(() => {
        console.log(match)
        const { id } = match.params
        const place = places.find(pl => pl.locations.some(loc => loc._id === id)) as RawPlaceDataProps
        const currentPlace = convertToCurrentPlace(place)[0]
        if (location.pathname === `${match.url}`) {
            if (currentPlace.isActive) {
                history.push(`${match.url}/${Destinations.HOME}`)
            }
            else {
                history.push(`${match.url}/${Destinations.OPENING_HOURS}`)
            }
        }
        const dest = location.pathname.substring(match.url.length + 1)
        setValue(dest)
        dispatch(setPlace(currentPlace))
        setCurrentPlace(currentPlace)
    }, [match])


    // const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    //     setValue(newValue);
    //     history.push(`${match.url}/${newValue}`)
    // };

    return (
        <PanelTabNavigator value={value} setValue={setValue} tabs={tabs} />
    )
}