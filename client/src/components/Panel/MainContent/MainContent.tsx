import { Grid } from "@mui/material";
import React, { FC } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Route, useLocation, useRouteMatch } from "react-router-dom";
import { CurrentPlaceContextProvider } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import { StepContextProvider } from "../../../contexts/StepContext";
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector";
import Header from "../Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { AccountSettings } from "./MyAccount/AccountSettings";
import { MyAccount } from './MyAccount/MyAccount';
import { NewBusinessChain } from './NewBusinessChain/NewBusinessChain';
import { NewPlace } from "./NewPlace/NewPlace";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { PlaceData } from "./PlaceManagement/PlaceData/PlaceData";

export const MainContent: FC = () => {

  let match = useRouteMatch();
  const places = usePlacesSelector()
  const location = useLocation()



  return (
    <Grid container style={{ height: '100%' }} item lg={10}>
      <Grid container style={{ height: '10%' }}>
        <Header />
      </Grid>
      <Grid container style={{ height: '90%' }}>
        {places.length === 0 && location.pathname === '/panel' && <NoPlaces />}
        <Route
          path={`${match.url}/new-place`}
        >
          <CurrentPlaceContextProvider>
            <StepContextProvider>
              <NewPlace />
            </StepContextProvider>
          </CurrentPlaceContextProvider>
        </Route>
        <CurrentPlaceContextProvider>
          <Route
            path={`${match.url}/management/:id`}
            component={(props: any) => <PlaceData {...props} />}
          >
          </Route>
        </CurrentPlaceContextProvider>

        <Route
          path={`${match.url}/dashboard`}
        >
          <Dashboard />
        </Route>
        <Route
          path={`${match.url}/account`}
          component={AccountSettings}
        />
        <Route
          path={`${match.url}/new-business-chain`}
          component={NewBusinessChain}
        />

      </Grid>

    </Grid>

  )
}

