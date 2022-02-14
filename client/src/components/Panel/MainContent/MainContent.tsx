import { Grid } from "@mui/material";
import React, { FC } from "react";
import { Route, useLocation, useRouteMatch } from "react-router-dom";
import { CurrentPlaceContextProvider } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import { StepContextProvider } from "../../../contexts/StepContext";
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector";
import Header from "../Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { AccountSettings } from "./MyAccount/AccountSettings";
import { NewBusinessChain } from './NewBusinessChain/NewBusinessChain';
import { NewPlace } from "./NewPlace/NewPlace";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { PlaceBoard } from "./PlaceManagement/PlaceBoard/PlaceBoard";

export const MainContent: FC = () => {

  let match = useRouteMatch();
  const places = usePlacesSelector()
  const location = useLocation()



  return (
    <Grid container style={{ height: '100%' }} direction="column" item lg={10}>
      <Grid container>
        <Header />
      </Grid>
      <Grid container style={{ flexGrow: 1 }}>
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
            component={(props: any) => <PlaceBoard {...props} />}
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
        >
          <StepContextProvider>
            <NewBusinessChain />
          </StepContextProvider>
        </Route>

      </Grid>

    </Grid>

  )
}

