import { Grid, Paper, Slide } from '@mui/material';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationTabs } from './NavigationTabs';


interface Props {
  tabs: {
    name: string,
    url: string,
    content? : any
  }[],
}


export const PanelTabNavigator: FC<Props> = ({ tabs }) => {

  return (
        <Grid container direction="column" style={{ overflow: 'hidden', flexGrow: 1 }}>
            <Slide in={true} timeout={500}>
                <Paper>
                    <NavigationTabs tabs={tabs} />
                </Paper>
            </Slide>
            <Grid container sx={{ flexGrow: 1 }}>
                <Routes>
                    <Route index element={<Navigate to={tabs[0].url} /> } />
                    {tabs.map((tab) => (
                        <Route key={tab.url} path={tab.url} element={tab.content} />),
                    )}
                </Routes>
            </Grid>
        </Grid>
  );
};

