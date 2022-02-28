import { Grid, Paper, Tab, Tabs } from "@mui/material"
import React, { FC, useEffect, useState } from "react"
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom"
import { useCurrentPlaceContext } from "../../contexts/PanelContexts/CurrentPlaceContext"
import { RawPlaceDataProps } from "../../contexts/PlaceProps"
import { usePlacesSelector } from "../../store/selectors/PlacesSelector"
import { convertToCurrentPlace } from "../../utils/place_data_utils"
import { Destinations } from "../Panel/MainContent/PlaceManagement/PlaceBoard/PlaceBoard"


interface MatchProps {
    id: string
}

interface Props {
    tabs: {
        name: string,
        url: string,
        content: any
    }[],
    placeId: string,
    value: string,
    setValue: any,
    areBusinessChainTabs?: boolean
}


export const PanelTabNavigator: FC<Props> = (({ value, areBusinessChainTabs, setValue, tabs, placeId }) => {


    const match = useRouteMatch<MatchProps>()
    const history = useHistory()
    const { currentPlace} = useCurrentPlaceContext()



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
                                    {value === tab.url && (placeId === currentPlace._id || areBusinessChainTabs) &&
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