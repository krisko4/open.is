import { Grid, Paper, Tabs, Tab } from "@mui/material"
import { FC, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useRouteMatch, useHistory, Route } from "react-router-dom"
import { useCurrentPlaceContext } from "../../contexts/PanelContexts/CurrentPlaceContext"
import { CurrentPlaceProps, RawPlaceDataProps } from "../../contexts/PlaceProps"
import { setPlace } from "../../store/actions/setCurrentPlace"
import { usePlacesSelector } from "../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from "../../utils/place_data_utils"


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


interface LocationState {
    place: CurrentPlaceProps,
    businessId: string
}

interface MatchProps {
    id: string
}

interface Props{
    tabs: {
        name: string,
        url: string,
        content: JSX.Element
    }[],
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const PanelTabNavigator: FC<Props> = ({tabs, value, setValue}) => {


    const match = useRouteMatch<MatchProps>()
    const history = useHistory()
    // const [value, setValue] = useState(Destinations.HOME as string)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        history.push(`${match.url}/${newValue}`)
    };

    return (
        <Grid container direction="column" style={{ flexGrow: 1 }}>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    // variant="fullWidth"
                    sx={{ width: '100%' }}
                >
                    {tabs.map((tab) =>
                        <Tab key={tab.name} value={tab.url} disableRipple label={tab.name} />
                    )}
                </Tabs>
            </Paper>
            <Grid container sx={{ flexGrow: 1 }}>
                {tabs.map((tab) =>
                    //@ts-ignore
                    <Route key={tab.name} component={() => tab.content} path={`${match.url}/${tab.url as string}`}>
                        {/* {tab.content} */}
                    </Route>
                )}
            </Grid>

        </Grid>
    )
}