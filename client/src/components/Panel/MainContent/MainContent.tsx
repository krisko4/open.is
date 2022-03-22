import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';
import { NoMatch } from 'Router';
import { StepContextProvider } from '../../../contexts/StepContext';
import { BusinessChainManagement } from './BusinessChainManagement/BusinessChainManagement';
import { Dashboard } from './Dashboard/Dashboard';
import { AccountSettings } from './MyAccount/AccountSettings';
import { NewBusinessChain } from './NewBusinessChain/NewBusinessChain';
import businessChainSteps from './NewBusinessChain/steps';
import { NewPlace } from './NewPlace/NewPlace';
import newPlaceSteps from './NewPlace/Steps/steps';
import { NoPlaces } from './NoPlaces/NoPlaces';
import { PlaceBoard } from './PlaceManagement/PlaceBoard/PlaceBoard';

export const MainContent: FC = () => {
  const { data: places } = useGetPlacesByUserId();

  return (
    <Grid container item style={{ flexGrow: 1 }}>
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route index element={places && places.length === 0 ? <NoPlaces /> : <Navigate to="dashboard" />} />
        <Route
          path={'new-place'}
          element={
            <StepContextProvider key="new-place" steps={newPlaceSteps}>
              <NewPlace />
            </StepContextProvider>
          }
        />
        <Route
          path={'new-business-chain'}
          element={
            <StepContextProvider key="new-business-chain" steps={businessChainSteps}>
              <NewBusinessChain />
            </StepContextProvider>
          }
        />
        <Route path={'management/:placeId/:locationId/*'} element={<PlaceBoard />} />
        {(places && places.length === 0) || <Route path={'dashboard'} element={<Dashboard />} />}
        <Route path={'account'} element={<AccountSettings />} />
        <Route path={'business-chain/:placeId/*'} element={<BusinessChainManagement />}></Route>
      </Routes>
    </Grid>
  );
};
