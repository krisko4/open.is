import { Grid } from "@mui/material";
import React, { FC } from "react";
import { Route, useLocation, Outlet } from "react-router-dom";
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
import { BusinessChainContextProvider } from "../../../contexts/PanelContexts/BusinessChainContext";
import { CurrentPlaceContextProvider } from "../../../contexts/PanelContexts/CurrentPlaceContext";
import { StepContextProvider } from "../../../contexts/StepContext";
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

  const places = usePlacesSelector()
  const location = useLocation()



  return (
    <Grid container style={{ height: '100%' }} direction="column" item lg={10}>
      <Grid container>
        <Header />
      </Grid>
      <Grid container style={{ flexGrow: 1 }}>
        {places.length === 0 && (location.pathname === '/panel' || location.pathname === '/panel/') && <NoPlaces />}
        <Outlet />
        {/* <Route
          path={`new-place`}
          element={
            <StepContextProvider steps={newPlaceSteps}>
              <NewPlace />
            </StepContextProvider>
          }
        />
        <Route
          path={`management/:id`}
          element={
            <CurrentPlaceContextProvider>
              <PlaceBoard />
            </CurrentPlaceContextProvider>
          }
        />
        <Route
          path={`dashboard`}
          element={
            <Dashboard />
          }
        />
        <Route
          path={`account`}
          element={<AccountSettings />}
        />
        <Route path={`business-chain/:id`}
          element={
            <BusinessChainContextProvider>
              <BusinessChainManagement />
            </BusinessChainContextProvider>
          }
        />
        <Route
          path={`new-business-chain`}
          element={
            <StepContextProvider steps={businessChainSteps}>
              <NewBusinessChain />
            </StepContextProvider>
          }
        /> */}
      </Grid>
    </Grid >
  )
}

