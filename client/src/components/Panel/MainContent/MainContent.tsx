import { Grid } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { BusinessChainContextProvider } from "../../../contexts/PanelContexts/BusinessChainContext";
import { CurrentPlaceContextProvider } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import { LocationContextProvider } from "../../../contexts/PanelContexts/LocationContext";
import { StepContextProvider } from "../../../contexts/StepContext";
import { usePlacesSelector } from "../../../store/selectors/PlacesSelector";
import Header from "../Header";
import { BusinessChainManagement } from "./BusinessChainManagement/BusinessChainManagement";
import { Dashboard } from "./Dashboard/Dashboard";
import { AccountSettings } from "./MyAccount/AccountSettings";
import { NewBusinessChain } from './NewBusinessChain/NewBusinessChain';
import businessChainSteps from "./NewBusinessChain/steps";
import { NewPlace } from "./NewPlace/NewPlace";
import newPlaceSteps from "./NewPlace/Steps/steps";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { PlaceBoard } from "./PlaceManagement/PlaceBoard/PlaceBoard";

export const MainContent: FC = () => {

  let match = useRouteMatch();
  const places = usePlacesSelector()
  const location = useLocation()
  const history = useHistory()




  return (
    <Grid container style={{ height: '100%' }} direction="column" item lg={10}>
      <Grid container>
        <Header />
      </Grid>
      <Grid container style={{ flexGrow: 1 }}>
        {places.length === 0 && (location.pathname === '/panel' || location.pathname === '/panel/') && <NoPlaces />}
        <Route
          path={`${match.url}/new-place`}
        >
          <StepContextProvider steps={newPlaceSteps}>
            <NewPlace />
          </StepContextProvider>
        </Route>
        <Route
          path={`${match.url}/management/:id`}
        >
          <CurrentPlaceContextProvider>
            <PlaceBoard />
          </CurrentPlaceContextProvider>
        </Route>
        <Route
          path={`${match.url}/dashboard`}
        >
          <Dashboard />
        </Route>
        <Route
          path={`${match.url}/account`}
          component={AccountSettings}
        />
        <Route path={`${match.url}/business-chain/:id`}>
          <BusinessChainContextProvider>
            <BusinessChainManagement />
          </BusinessChainContextProvider>
        </Route>
        <Route
          path={`${match.url}/new-business-chain`}
        >
          <StepContextProvider steps={businessChainSteps}>
            <LocationContextProvider>
              <NewBusinessChain />
            </LocationContextProvider>
          </StepContextProvider>
        </Route>

      </Grid>

    </Grid >

  )
}

