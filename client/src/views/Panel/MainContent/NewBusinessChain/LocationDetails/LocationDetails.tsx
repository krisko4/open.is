import { Slide, Button, Fade, Grid, Paper, Typography } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setLogo } from 'redux-toolkit/slices/currentPlaceSlice';
import { useColorMode } from '../../../../../contexts/ColorModeContext';
import { Location } from './Location';
import { LocationsConfirmDialog } from './LocationsConfirmDialog';
import {
  useInvalidFormsSelector,
  useFormSaveTriggerSelector,
  useFormLocationsSelector,
  saveForm,
} from 'redux-toolkit/slices/formLocationsSlice';

interface Props {
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  isEditionMode?: boolean;
  img?: File | ArrayBuffer | null | string;
  setAddLocationsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SubmitProps {
  isEditionMode?: boolean;
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  setConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSubmitButton: FC<SubmitProps> = ({ isEditionMode, setActiveStep, setConfirmDialogOpen }) => {
  const formSaveTrigger = useFormSaveTriggerSelector();
  const invalidForms = useInvalidFormsSelector();
  const dispatch = useAppDispatch();
  const isFirstRender = useRef(true);
  const handleClick = () => {
    dispatch(saveForm());
    if (isEditionMode) {
      setConfirmDialogOpen(true);
      return;
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (setActiveStep) setActiveStep((step) => step + 1);
  }, [formSaveTrigger]);
  return (
    <Button
      disabled={invalidForms.length > 0}
      style={{ marginRight: 20 }}
      onClick={handleClick}
      variant="contained"
      color="primary"
    >
      {isEditionMode ? 'Save changes' : 'Continue'}
    </Button>
  );
};

export const LocationDetails: FC<Props> = ({ setActiveStep, isEditionMode, img, setAddLocationsDialogOpen }) => {
  const { mode } = useColorMode();
  const formLocations = useFormLocationsSelector();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (img) {
      dispatch(setLogo(img));
    }
  }, [img]);

  return (
    <Grid container style={{ height: '100%', overflow: 'hidden' }}>
      <Slide in={true} direction="left" timeout={500}>
        <Paper square sx={{ flexGrow: 1, height: '100%' }}>
          {Object.keys(formLocations).length === 0 ? (
            <Fade in={true} timeout={1000}>
              <Grid container style={{ height: '100%' }} justifyContent="center" alignItems="center">
                <Typography variant="h3">Waiting for the first location...</Typography>
                <Grid item lg={8}>
                  <img
                    src={
                      mode === 'light'
                        ? `${process.env.REACT_APP_BASE_URL}/images/location.gif`
                        : 'https://thumbs.gfycat.com/WastefulGiganticClumber-max-1mb.gif'
                    }
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Fade>
          ) : (
            <>
              <Grid container style={{ height: '90%' }}>
                <Scrollbars>
                  <div style={{ flexGrow: 1 }}>
                    {Object.values(formLocations).map((location) => (
                      <Grid item key={location.address} style={{ width: '100%' }}>
                        <Location location={location} />
                      </Grid>
                    ))}
                  </div>
                </Scrollbars>
              </Grid>
              <Grid container style={{ height: '10%' }}>
                <Paper elevation={3} style={{ flexGrow: 1 }}>
                  <Grid container style={{ height: '100%' }} alignItems="center" justifyContent="flex-end">
                    <FormSubmitButton
                      setActiveStep={setActiveStep}
                      setConfirmDialogOpen={setConfirmDialogOpen}
                      isEditionMode={isEditionMode}
                    />
                  </Grid>
                </Paper>
              </Grid>
            </>
          )}
        </Paper>
      </Slide>
      {isEditionMode && (
        <LocationsConfirmDialog
          dialogOpen={confirmDialogOpen}
          setDialogOpen={setConfirmDialogOpen}
          setAddLocationsDialogOpen={setAddLocationsDialogOpen}
        />
      )}
    </Grid>
  );
};
