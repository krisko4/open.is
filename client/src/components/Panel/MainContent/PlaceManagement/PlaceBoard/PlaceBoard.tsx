import { Grid, Card, Toolbar, Tabs, Tab } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useLocation } from 'react-router-dom'
import Scrollbars from "react-custom-scrollbars";
import { PlaceData } from "../PlaceData/PlaceData";

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
        content: <h1>Hello world</h1>
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


export const PlaceBoard: FC = () => {

    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const location = useLocation()
    useEffect(() => {
        //@ts-ignore
        setCurrentPlace(location.state.place)
    }, [])
    const [value, setValue] = useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container direction="column" style={{ flexGrow: 1 }}>
            <Card >
                <Toolbar sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} variant="fullWidth" sx={{ width: '100%' }}>
                        {tabs.map((tab) =>
                            <Tab label={tab.name} key={tab.name} />
                        )}
                    </Tabs>
                </Toolbar>
            </Card>
            <Grid container sx={{ flexGrow: 1 }}>
                {tabs[value].content}
            </Grid>
        </Grid>
    )
}