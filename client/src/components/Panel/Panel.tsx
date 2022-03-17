import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPlacesByUserId } from 'redux-toolkit/api/placesApi';
import { setPlaces } from 'redux-toolkit/slices/placesSlice';
import { useAppDispatch } from '../../redux-toolkit/hooks';
import Header from './Header';
import { DrawerHeader, LeftNavigation } from './LeftNavigation/LeftNavigation';
import { MainContent } from './MainContent/MainContent';


export const Panel: FC = () => {

  const { isFetching, data, isSuccess } = useGetPlacesByUserId();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setPlaces(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    const uid: string = localStorage.getItem('uid') as string;
    if (!uid) {
      navigate('/');
      return;
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>

      {/* // <Grid
    //   sx={{
    //     minHeight: '100vh',
    //   }}
    //   container
    //   direction="column"
    // > */}
      {isFetching ?
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Grid> :
        /* <Grid container sx={{ flex: '1 1 auto' }}> */
        <>
          <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <LeftNavigation drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <Box component="main" sx={{  display: 'flex', flexGrow: 1, flexDirection: 'column', height: '100vh' }}>
            <DrawerHeader />
            <MainContent />
          </Box>
        </>
      }
    </Box>
    // </Grid >
    // </Grid>
  );
};