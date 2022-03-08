import { Grid } from "@mui/material";
import { NotReady } from "components/reusable/NotReady";
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
import { NoMatch } from "Router";
import { StepContextProvider } from "../../../contexts/StepContext";
import Header from "../Header";
import { BusinessChainManagement } from "./BusinessChainManagement/BusinessChainManagement";
import { Locations } from "./BusinessChainManagement/Locations/Locations";
import { BusinessChainSettings } from "./BusinessChainManagement/Settings/BusinessChainSettings";
import { Dashboard } from "./Dashboard/Dashboard";
import { AccountSettings } from "./MyAccount/AccountSettings";
import { NewBusinessChain } from './NewBusinessChain/NewBusinessChain';
import businessChainSteps from "./NewBusinessChain/steps";
import { NewPlace } from "./NewPlace/NewPlace";
import newPlaceSteps from "./NewPlace/Steps/steps";
import { NoPlaces } from "./NoPlaces/NoPlaces";
import { OpeningHours } from "./PlaceManagement/PlaceBoard/OpeningHours/OpeningHours";
import { PlaceBoard } from "./PlaceManagement/PlaceBoard/PlaceBoard";
import { PlaceDashboard } from "./PlaceManagement/PlaceBoard/PlaceDashboard/PlaceDashboard.";
import { PlaceSettings } from "./PlaceManagement/PlaceBoard/Settings/PlaceSettings";

export const MainContent: FC = () => {

  const places = usePlacesSelector()



  return (
    <Grid container style={{ height: '100%' }} direction="column" item lg={10}>
      <Grid container>
        <Header />
      </Grid>
      <Grid container style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="*" element={<NoMatch />} />
          <Route
            index
            element={places.length === 0 ? <NoPlaces /> : <Navigate to="dashboard" />}
          />
          <Route
            path={`new-place`}
            element={
              <StepContextProvider steps={newPlaceSteps}>
                <NewPlace />
              </StepContextProvider>
            }
          />
          <Route
            path={`new-business-chain`}
            element={
              <StepContextProvider steps={businessChainSteps}>
                <NewBusinessChain />
              </StepContextProvider>
            }
          />
          <Route
            path={`management/:id`}
            element={
              <PlaceBoard />
            }
          >
            <Route path="home" element={<PlaceDashboard />} />
            <Route path="settings" element={<PlaceSettings />} />
            <Route path="opening-hours" element={<OpeningHours />} />
            <Route path="statistics" element={<NotReady />} />
          </Route>
          {
            places.length === 0 ||
            <Route
              path={`dashboard`}
              element={<Dashboard />}
            />
          }
          <Route
            path={`account`}
            element={<AccountSettings />}
          />
          <Route path={`business-chain/:id`}
            element={
                <BusinessChainManagement />
            }
          >
            <Route path="dashboard" element={<NotReady />} />
            <Route path="locations" element={<Locations />} />
            <Route path="settings" element={<BusinessChainSettings />} />
          </Route>
        </Routes>
      </Grid>
    </Grid >
  )
}

