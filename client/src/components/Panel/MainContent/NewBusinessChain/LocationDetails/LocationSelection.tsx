import { Grid } from '@mui/material';
import React, { FC } from 'react';
import AddressDetailsContextProvider from '../../../../../contexts/AddressDetailsContext';
import { AddressDetails } from '../../NewPlace/Steps/Step4/AddressDetails';


interface Props {
  setAddressSubmitted?: React.Dispatch<React.SetStateAction<boolean>>,
}

export const LocationSelection: FC<Props> = ({ setAddressSubmitted }) => {

  return <>
        <Grid container alignItems="center" justifyContent="center">
            <AddressDetailsContextProvider isEditionMode={true}>
                <Grid container item justifyContent="center" lg={11}>
                    <AddressDetails multipleLocationsAllowed={true} setAddressSubmitted={setAddressSubmitted} />
                </Grid>
            </AddressDetailsContextProvider>
        </Grid>
    </>;
};

