import { Fade, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useCustomSnackbar } from 'utils/snackbars';
import { useStepContext } from '../../../../../../contexts/StepContext';
import { AddressDetails } from './AddressDetails';




interface Props {
  isEditionMode: boolean
}

export const Step4: FC<Props> = ({ isEditionMode }) => {

  const { setActiveStep } = useStepContext();
  const { enqueueInfoSnackbar } = useCustomSnackbar();

  useEffect(() => {
    enqueueInfoSnackbar('You can drag the marker to change its location on the map');
  }, []);

  return (
        <Fade in={true} timeout={1500}>
            <Grid container justifyContent="center">
                    <AddressDetails isEditionMode={isEditionMode} setActiveStep={setActiveStep} />
            </Grid>
        </Fade>
  );
};