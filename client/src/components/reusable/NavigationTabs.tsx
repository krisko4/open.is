import { Grid, Paper, Slide, Tab, Tabs } from "@mui/material"
import React, { FC, useState, useEffect } from "react"
import { useMatch, Routes, Outlet, Route, useNavigate, Link, useLocation, matchPath, resolvePath, useResolvedPath } from "react-router-dom"

interface Props {
    tabs: {
        name: string,
        url: string,
        content?: any,
        icon?: any
    }[],
    variant?: any 
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

export const NavigationTabs: FC<Props> = ({ tabs, variant }) => {

    const currentTab = useRouteMatch(tabs.map(tab => tab.url));

    return (
        <Tabs
            variant={variant}
            value={currentTab}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{ width: '100%' }}
        >
            {tabs.map((tab) =>
                <Tab key={tab.url} icon={tab.icon} value={tab.url} component={Link} to={tab.url} disableRipple label={tab.name} />
            )}
        </Tabs>
    )

}