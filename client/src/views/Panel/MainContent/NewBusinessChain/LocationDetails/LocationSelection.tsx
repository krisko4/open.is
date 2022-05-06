import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { AddressDetails } from '../../NewPlace/Steps/Step4/AddressDetails';

export const LocationSelection: FC = () => {
  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Grid container item justifyContent="center" lg={11}>
          <AddressDetails isBusinessChain={true} />
        </Grid>
      </Grid>
    </>
  );
};
