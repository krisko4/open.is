import { Button, Fade, Grid, Paper, Slide, Typography } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { setLogo, useCurrentPlaceSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { useColorMode } from '../../../../../contexts/ColorModeContext';
import { useLocationContext } from '../../../../../contexts/PanelContexts/LocationContext';
import { useCustomSnackbar } from '../../../../../utils/snackbars';
import { Location } from './Location';
import { LocationsConfirmDialog } from './LocationsConfirmDialog';


interface Props {
  addressSubmitted: boolean,
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>,
  isEditionMode?: boolean,
  img?: File | ArrayBuffer | null | string,
  setAddLocationsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>,
}

export const LocationDetails: FC<Props> = ({ addressSubmitted, setActiveStep, isEditionMode, img, setAddLocationsDialogOpen }) => {

  const isFirstRenderAddress = useRef(true);
  const isFirstRenderSave = useRef(true);
  const { enqueueInfoSnackbar } = useCustomSnackbar();
  const { setSaveButtonClicked, saveButtonClicked, selectedLocations, setSelectedLocations } = useLocationContext();
  const [validationStateChanged, setValidationStateChanged] = useState(false);
  const isFirstValidationRender = useRef(true);
  const [isValid, setValid] = useState(false);
  const { mode } = useColorMode();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const currentPlace = useCurrentPlaceSelector();
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (img) {
      dispatch(setLogo(img));
    }
  }, [img]);

  useEffect(() => {
    if (isFirstValidationRender.current) {
      isFirstValidationRender.current = false;
      return;
    }
    setValid(!selectedLocations.some(loc => !loc.isValid));
  }, [validationStateChanged]);


  useEffect(() => {
    if (isFirstRenderSave.current) {
      isFirstRenderSave.current = false;
      return;
    }
    if (isEditionMode) {
      setConfirmDialogOpen(true);
      return;
    }
    if (setActiveStep) setActiveStep(step => step + 1);
  }, [saveButtonClicked]);


  const handleClick = () => {
    setSaveButtonClicked(state => !state);
  };

  useEffect(() => {
    if (isFirstRenderAddress.current) {
      isFirstRenderAddress.current = false;
      return;
    }
    if (selectedLocations.some(place => place.address === currentPlace.address)) {
      enqueueInfoSnackbar('You have already selected this location.');
      return;
    }
    const newLocation = {
      address: currentPlace.address,
      addressId: currentPlace.addressId,
      addressLanguage: currentPlace.addressLanguage,
      lat: currentPlace.lat,
      lng: currentPlace.lng,
      phone: '',
      email: '',
      website: '',
      instagram: '',
      facebook: '',
    };
    selectedLocations.push(newLocation);
    setSelectedLocations([...selectedLocations]);
  }, [addressSubmitted]);


  return (
        <Slide in={true} direction="left" timeout={500}>
            <Grid container style={{ height: '100%', paddingTop: 1 }}>
                <Paper square sx={{ flexGrow: 1, height: '100%' }}>
                    {selectedLocations.length === 0 ?
                        <Fade in={true} timeout={1000}>
                            <Grid container style={{ height: '100%' }} justifyContent="center" alignItems="center">
                                <Typography variant="h3">Waiting for the first location...</Typography>
                                <Grid item lg={8} style={{ marginTop: 10 }}>
                                    <img src={mode === 'light' ? `${process.env.REACT_APP_BASE_URL}/images/location.gif` : 'https://thumbs.gfycat.com/WastefulGiganticClumber-max-1mb.gif'} style={{ width: '100%' }} />
                                </Grid>
                            </Grid>
                        </Fade>
                      : <>
                            <Grid container style={{ height: '90%' }}>
                                <Scrollbars>
                                    <div style={{ flexGrow: 1 }}>
                                        {
                                            selectedLocations.map((location) =>
                                                <Grid item key={location.address} style={{ width: '100%' }}>
                                                    <Location
                                                        setValidationStateChanged={setValidationStateChanged}
                                                        location={location}
                                                    />
                                                </Grid>,
                                            )
                                        }
                                    </div>
                                </Scrollbars>
                            </Grid>
                            <Grid container style={{ height: '10%' }}>
                                <Paper elevation={3} style={{ flexGrow: 1 }}>
                                    <Grid container style={{ height: '100%' }} alignItems="center" justifyContent="flex-end">
                                        <Button
                                            disabled={!isValid}
                                            style={{ marginRight: 20 }}
                                            onClick={handleClick}
                                            variant="contained"
                                            color="primary"
                                        >
                                            {isEditionMode ? 'Save changes' : 'Continue'}
                                        </Button>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </>
                    }
                </Paper>
                {isEditionMode &&
                    <LocationsConfirmDialog
                        dialogOpen={confirmDialogOpen}
                        setDialogOpen={setConfirmDialogOpen}
                        setAddLocationsDialogOpen={setAddLocationsDialogOpen}
                    />
                }
            </Grid >
        </Slide>
  );
};