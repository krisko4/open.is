import { Grid } from '@mui/material';
import { BusinessChainManagement } from 'layouts/BusinessChainManagement';
import { PlaceBoard } from 'layouts/PlaceManagement';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useGetPlacesByUserId } from 'redux-toolkit/api';
import { NoMatch } from 'routes/Router';
import { AccountSettings } from 'views/panel/accountSettings';
import { Dashboard } from 'views/panel/dashboard';
import { NewBusinessChain } from 'views/panel/newBusinessChain';
import businessChainSteps from 'views/panel/newBusinessChain/utils/steps';
import { NewPlace } from 'views/panel/newPlace';
import newPlaceSteps from 'views/panel/newPlace/utils/steps';
import { NoPlaces } from 'views/panel/noPlaces';
import { StepContextProvider } from '../../../contexts/StepContext';

export const MainContent: FC = () => {
  const { data: places } = useGetPlacesByUserId();

  return (
    <Grid container item sx={{ flexGrow: 1 }}>
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
