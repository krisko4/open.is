import { Grid } from '@mui/material';
import { useLoginContext } from 'contexts/LoginContext';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PopularPlaces } from './PopularPlaces';
import { SelectPlacesTabs } from './SelectPlacesTabs';

enum PlaceFilters {
  POPULAR = '/places/active/popular',
  NEW = '/places/active/new',
  TOP = '/places/active/top',
  FAVORITE = '/places/active/favorite',
  SUBSCRIBED = '/places/active/subscribed',
}

export const PlaceList: FC = () => {
  const { userData } = useLoginContext();
  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <SelectPlacesTabs />
      <Grid container style={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<Navigate to="popular" />} />
          <Route path="popular" element={<PopularPlaces key="popular" fetchUrl={PlaceFilters.POPULAR} />} />
          <Route path="recent" element={<PopularPlaces key="recent" fetchUrl={PlaceFilters.NEW} />} />
          <Route path="top" element={<PopularPlaces key="top" fetchUrl={PlaceFilters.TOP} />} />
          <Route path="favorite" element={<PopularPlaces key="favorite" fetchUrl={PlaceFilters.FAVORITE} />} />
          {userData.isLoggedIn && (
            <Route path="subscribed" element={<PopularPlaces key="subscribed" fetchUrl={PlaceFilters.SUBSCRIBED} />} />
          )}
        </Routes>
      </Grid>
    </Grid>
  );
};
