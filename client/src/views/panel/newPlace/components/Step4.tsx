import { Fade, Grid } from '@mui/material';
import { useStepContext } from 'contexts';
import React, { FC, useEffect } from 'react';
import { useCustomSnackbar } from 'utils/snackbars';
import { AddressDetails } from './AddressDetails';

interface Props {
  isEditionMode: boolean;
  isBusinessChain?: boolean;
}

export const Step4: FC<Props> = ({ isEditionMode, isBusinessChain }) => {
  const { setActiveStep } = useStepContext();
  const { enqueueInfoSnackbar } = useCustomSnackbar();

  useEffect(() => {
    enqueueInfoSnackbar('You can drag the marker to change its location on the map');
  }, []);

  return (
    <Fade in={true} timeout={1500}>
      <Grid container justifyContent="center">
        <AddressDetails isBusinessChain={isBusinessChain} isEditionMode={isEditionMode} setActiveStep={setActiveStep} />
      </Grid>
    </Fade>
  );
};
