import { Grid } from "@mui/material";
import { NotReady } from "components/reusable/NotReady";
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useGetPlacesByUserId } from "redux-toolkit/api/placesApi";
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
import { PlaceBoard } from "./PlaceManagement/PlaceBoard/PlaceBoard";

export const MainContent: FC = () => {


    const { data : places } = useGetPlacesByUserId()


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
            element={places && places.length === 0 ? <NoPlaces /> : <Navigate to="dashboard" />}
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
          {places && places.map(place => {
            return place.locations.map(loc => (
              <Route
                key={place._id}
                path={`management/${loc._id}/*`}
                element={
                  <PlaceBoard placeId={place._id as string} locationId={loc._id as string} />
                }
              >
              </Route>

            ))
          })}
          {
            places && places.length === 0 ||
            <Route
              path={`dashboard`}
              element={<Dashboard />}
            />
          }
          <Route
            path={`account`}
            element={<AccountSettings />}
          />
          {places && places.filter(pl => pl.isBusinessChain).map((place, index) => (
            <Route key={index} path={`business-chain/${place._id as string}/*`}
              element={
                <BusinessChainManagement placeId={place._id as string} />
              }
            >
              <Route path="dashboard" element={<NotReady />} />
              <Route path="locations" element={<Locations />} />
              <Route path="settings" element={<BusinessChainSettings />} />
            </Route>

          ))}
        </Routes>
      </Grid>
    </Grid >
  )
}

