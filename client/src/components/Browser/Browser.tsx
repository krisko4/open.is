import { Slide } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC, useEffect } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { resetMap } from 'redux-toolkit/slices/mapSlice';
import { resetSelectedLocations } from 'redux-toolkit/slices/selectedLocationsSlice';
import { AuthContextProvider } from '../../contexts/AuthContext';
import { Auth } from '../Auth/Auth';
import FirstHeader from './FirstHeader';
import { MapBox } from './Places/MapBox/MapBox';
import PlacesBox from './Places/PlacesBox';
import { SecondHeader } from './SecondHeader';





const Browser: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetMap());
    return () => {
      dispatch(resetMap());
      dispatch(resetSelectedLocations());
    };
  }, []);

  return (
        <Grid container direction="column" style={{ height: '100vh' }}>
            <AuthContextProvider>
                <FirstHeader />
                <Auth />
            </AuthContextProvider>
                <SecondHeader />
                <Grid container style={{ flexGrow: 1, overflow: 'hidden' }}>
                    <Slide in={true} direction="right">
                        <Grid item lg={5} xs={12} order={{ lg: 1, xs: 2 }}>
                            <PlacesBox />
                        </Grid>
                    </Slide>
                    <Slide in={true} direction="left">
                        <Grid item lg={7} xs={12} order={{ lg: 2, xs: 1 }}>
                            <MapBox />
                        </Grid>
                    </Slide>
                </Grid>
        </Grid >

  );

};

export default Browser;