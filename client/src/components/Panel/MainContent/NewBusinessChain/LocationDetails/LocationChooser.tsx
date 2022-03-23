import { Grid } from '@mui/material';
import { FC } from 'react';
import { MapBox } from '../../../../Browser/Places/MapBox/MapBox';
import { AddressDetails } from '../../NewPlace/Steps/Step4/AddressDetails';
export const LocationChooser: FC = () => {
  return (
      <Grid container lg={8} justifyContent="center">
        <AddressDetails />
        <Grid style={{ height: 400, marginTop: 20 }} container>
          <MapBox />
        </Grid>
      </Grid>
  );
};
