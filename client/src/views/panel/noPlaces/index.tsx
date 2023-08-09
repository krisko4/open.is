import { Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import { AddNewBusiness } from './components/AddNewBusiness';
import { NewPlaceChooser } from './components/NewPlaceChooser';

export const NoPlaces: FC = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Grid container sx={{ height: '100%', overflow: 'hidden' }} justifyContent="center" alignItems="center">
      {buttonClicked ? <NewPlaceChooser /> : <AddNewBusiness setButtonClicked={setButtonClicked} />}
    </Grid>
  );
};
