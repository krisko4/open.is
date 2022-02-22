import { Grid, Paper, Tab, Tabs } from "@mui/material"
import React, { useMemo, useState } from "react"
import { FC, useRef, useEffect } from "react"
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { useCurrentPlaceContext } from "../../contexts/PanelContexts/CurrentPlaceContext"
import { RawPlaceDataProps } from "../../contexts/PlaceProps"
import { usePlacesSelector } from "../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from "../../utils/place_data_utils"
import { OpeningHours } from "../Panel/MainContent/PlaceManagement/PlaceBoard/OpeningHours/OpeningHours"
import { Destinations } from "../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard"
import { PlaceData } from "../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceData/PlaceData"
import { PlaceSettings } from "../Panel/MainContent/PlaceManagement/PlaceBoard/Settings/PlaceSettings"


interface MatchProps {
    id: string
}

interface Props {
    tabs: {
        name: string,
        url: string,
        content: any
    }[],
    placeId: string
}

interface RCProps {
    // location: any,
    // url: string,
    tabContent: JSX.Element,
    value: string

}


export const PanelTabNavigator: FC<Props> = (({ tabs, placeId }) => {


    const match = useRouteMatch<MatchProps>()
    const [value, setValue] = useState(Destinations.HOME as string)
    const history = useHistory()
    const location = useLocation()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const places = usePlacesSelector()


    useEffect(() => {
        if (placeId !== currentPlace._id) {
            const place = places.find(pl => pl.locations.some(loc => loc._id === placeId)) as RawPlaceDataProps
            console.log(place)
            const currentPlace = convertToCurrentPlace(place)[0]
            setCurrentPlace(currentPlace)
        }
        const dest = location.pathname.substring(match.url.length + 1)
        setValue(dest)
    }, [match])


    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        history.push(`${match.url}/${newValue}`)
    };

    return (
        <Grid container direction="column" style={{ flexGrow: 1 }}>
            <Paper>
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="secondary"
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
                <Switch>
                    {
                        tabs.map((tab) =>
                            <Route
                                key={`${match.url}/${tab.url}`}
                                component={() => <>
                                    {value === tab.url && placeId === currentPlace._id &&
                                        tab.content
                                    }
                                </>}
                                path={`${match.url}/${tab.url}`}
                            />
                        )
                    }
                </Switch>
            </Grid>

        </Grid>
    )
})