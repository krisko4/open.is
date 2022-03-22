import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PlaceDetails } from './PlaceDetails/PlaceDetails';
import { PlaceList } from './PlacesBox/PlaceList';

const PlacesBox: FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<PlaceList />}></Route>
      <Route path=":placeId/:locationId" element={<PlaceDetails />} />
    </Routes>
  );
};

export default PlacesBox;
