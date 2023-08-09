import { Slide } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Auth } from 'components/auth';
import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useAppDispatch } from 'store/hooks';
import { resetMap } from 'store/slices/mapSlice';
import { resetSelectedLocations } from 'store/slices/selectedLocationsSlice';
import { EventBoard } from 'views/browser/events';
import { PlaceDetails } from 'views/browser/placeDetails';
import { PlaceList } from 'views/browser/placeList';
import { MapBox } from '../../components/MapBox';
import { AuthContextProvider } from '../../contexts/AuthContext';
import FirstHeader from './components/FirstHeader';
import { SecondHeader } from './components/SecondHeader';

export const Browser: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetMap());
    return () => {
      dispatch(resetMap());
      dispatch(resetSelectedLocations());
    };
  }, [dispatch]);

  return (
    <Grid container direction="column" style={{ height: '100vh' }}>
      <AuthContextProvider>
        <FirstHeader />
        <Auth />
      </AuthContextProvider>
      <Routes>
        <Route path="/events/*" element={<EventBoard />} />
        <Route
          path="/*"
          element={
            <>
              <SecondHeader />
              <Grid container style={{ flexGrow: 1, overflow: 'hidden' }}>
                <Slide in={true} direction="right">
                  <Grid item lg={5} xs={12} order={{ lg: 1, xs: 2 }}>
                    <Routes>
                      <Route path="/*" element={<PlaceList />}></Route>
                      <Route path=":placeId/:locationId" element={<PlaceDetails />} />
                    </Routes>
                  </Grid>
                </Slide>
                <Slide in={true} direction="left">
                  <Grid item lg={7} xs={12} order={{ lg: 2, xs: 1 }}>
                    <MapBox />
                  </Grid>
                </Slide>
              </Grid>
            </>
          }
        />
      </Routes>
    </Grid>
  );
};
