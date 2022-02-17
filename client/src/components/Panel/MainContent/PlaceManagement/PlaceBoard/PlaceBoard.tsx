import { Card, Grid, Paper, Tab, Tabs, Toolbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps, RawPlaceDataProps } from "../../../../../contexts/PlaceProps";
import { OpeningHours } from "./OpeningHours/OpeningHours";
import { PlaceData } from "./PlaceData/PlaceData";

const tabs = [
    {
        name: 'Home',
        content: <PlaceData />
    },
    {
        name: 'Statistics',
        content: <h1>Hello world</h1>
    },
    {
        name: 'Opening hours',
        content: <OpeningHours />
    },
    {
        name: 'Events',
        content: <h1>Hello world</h1>
    },
    {
        name: 'Opinions',
        content: <h1>Hello world</h1>
    },
    {
        name: 'News',
        content: <h1>Hello world</h1>
    },
    {
        name: 'Visits',
        content: <h1>Hello world</h1>
    },
    {
        name: 'Settings',
        content: <h1>Hello world</h1>
    },
    {
        name: 'Subscriptions',
        content: <h1>Hello world</h1>
    },
]

interface LocationState {
    place: CurrentPlaceProps,
    businessId: string
}

export const PlaceBoard: FC = () => {

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const location = useLocation<LocationState>()


    useEffect(() => {
        const { place } = location.state
        setCurrentPlace(place)
    }, [])

    useEffect(() => {
        setValue(currentPlace.isActive ? 0 : 2)
    }, [currentPlace])


    const [value, setValue] = useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container direction="column" style={{ flexGrow: 1 }}>
            <Grid item>
                <Paper square>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        sx={{ width: '100%' }}
                    >
                        {tabs.map((tab) =>
                            <Tab key={tab.name} disableRipple label={tab.name} />
                        )}
                    </Tabs>
                </Paper>
            </Grid>
            <Grid container sx={{ flexGrow: 1 }}>
                {tabs[value].content}
            </Grid>

        </Grid>
    )
}