import { Grid } from '@mui/material';
import { useLoginContext } from 'contexts/LoginContext';
import { FC, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FilteredPlaces } from './FilteredPlaces';
import { SelectPlacesTabs } from './SelectPlacesTabs';

enum PlaceFilters {
  POPULAR = '/places/popular',
  RECENT = '/places/recent',
  TOP = '/places/top',
  FAVORITE = '/places/favorite',
  SUBSCRIBED = '/places/subscribed',
}

export const PlaceList: FC = () => {
  const { userData } = useLoginContext();
  const filterRoutes = useMemo(() => {
    return [
      {
        path: 'popular',
        filter: PlaceFilters.POPULAR,
      },
      {
        path: 'recent',
        filter: PlaceFilters.RECENT,
      },
      {
        path: 'top',
        filter: PlaceFilters.TOP,
      },
      {
        path: 'favorite',
        filter: PlaceFilters.FAVORITE,
      },
      userData.isLoggedIn && {
        path: 'subscribed',
        filter: PlaceFilters.SUBSCRIBED,
      },
    ];
  }, [userData.isLoggedIn]);
  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <SelectPlacesTabs />
      <Grid container style={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<Navigate to="popular" />} />
          {filterRoutes.map(
            (route) =>
              route && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<FilteredPlaces key={route.path} fetchUrl={route.filter} />}
                />
              )
          )}
        </Routes>
      </Grid>
    </Grid>
  );
};
