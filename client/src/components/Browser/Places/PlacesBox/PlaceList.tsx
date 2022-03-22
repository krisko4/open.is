import { Grid } from '@mui/material';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PopularPlaces } from './PopularPlaces';
import { SelectPlacesTabs } from './SelectPlacesTabs';

export const PlaceList: FC = () => {
  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <SelectPlacesTabs />
      <Grid container style={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<Navigate to="popular" />} />
          <Route path="popular" element={<PopularPlaces key="popular" fetchUrl="/places/active/popular" />} />
          <Route path="recent" element={<PopularPlaces key="recent" fetchUrl="/places/active/new" />} />
          <Route path="top" element={<PopularPlaces key="top" fetchUrl="/places/active/top" />} />
          <Route path="favorite" element={<PopularPlaces key="favorite" fetchUrl="/places/active/favorite" />} />
          <Route path="subscribed" element={<PopularPlaces key="subscribed" fetchUrl="/places/active/subscribed" />} />
        </Routes>
      </Grid>
    </Grid>
  );
};
