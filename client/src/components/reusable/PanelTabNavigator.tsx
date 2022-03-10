import { Grid, Paper, Slide, Tab, Tabs } from "@mui/material"
import React, { FC, useState, useEffect } from "react"
import { useMatch, Routes, Outlet, Route, useNavigate, Link, useLocation, matchPath, resolvePath, useResolvedPath } from "react-router-dom"



interface Props {
    tabs: {
        name: string,
        url: string,
        content: any
    }[],
}

function useRouteMatch(patterns: readonly string[]) {
    const location = useLocation();
    const parent = useResolvedPath('.');

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(`${parent.pathname}/${pattern}`, location.pathname);
        if (possibleMatch !== null) {
            return pattern;
        }
    }
    return null;
}

const NavigationTabs: FC<Props> = ({ tabs }) => {

    const currentTab = useRouteMatch(tabs.map(tab => tab.url));

    return (
        <Tabs
            value={currentTab}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{ width: '100%' }}
        >
            {tabs.map((tab) =>
                <Tab key={tab.url} value={tab.url} component={Link} to={tab.url} disableRipple label={tab.name} />
            )}
        </Tabs>
    )

}

export const PanelTabNavigator: FC<Props> = ({ tabs }) => {

    console.log('uhuhu')

    return (
        <Grid container direction="column" style={{ overflow: 'hidden', flexGrow: 1 }}>
            <Slide in={true} timeout={500}>
                <Paper>
                    <NavigationTabs tabs={tabs} />
                </Paper>
            </Slide>
            <Grid container sx={{ flexGrow: 1 }}>
                <Routes>
                    {tabs.map((tab) => (
                        <Route key={tab.url} path={tab.url} element={tab.content} />)
                    )}
                </Routes>
            </Grid>
        </Grid>
    )
}

