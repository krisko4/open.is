import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPlacesByUserId } from 'store/api';
import { setPlaces } from 'store/slices/placesSlice';
import { useAppDispatch } from '../../store/hooks';
import { MainContent } from './components/Content';
import Header from './components/Header';
import { DrawerHeader, LeftNavigation } from './components/LeftNavigation';

export const Panel: FC = () => {
  const { isFetching, data, isSuccess } = useGetPlacesByUserId();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setPlaces(data));
    }
  }, [isSuccess, dispatch, data]);

  useEffect(() => {
    const uid: string = localStorage.getItem('uid') as string;
    if (!uid) {
      navigate('/');
      return;
    }
  }, [navigate]);

  return (
    <Box data-testid="panel" sx={{ display: 'flex' }}>
      {isFetching ? (
        <Grid container sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        <>
          <Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <LeftNavigation drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
          <Box component="main" sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', height: '100vh' }}>
            <DrawerHeader />
            <MainContent />
          </Box>
        </>
      )}
    </Box>
  );
};
