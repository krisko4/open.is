import { LoadingButton } from '@mui/lab';
import { Alert, Fade, Grid, Typography } from '@mui/material';
import { AddressSearcher } from 'components/AddressSearcher';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { useNameSelector } from 'redux-toolkit/slices/businessChainSlice';
import { useLogoSelector, useTypeSelector } from 'redux-toolkit/slices/currentPlaceSlice';
import { addFormLocation, useFormLocationsSelector } from 'redux-toolkit/slices/formLocationsSlice';
import { useSelectedAddressSelector } from 'redux-toolkit/slices/selectedAddressSlice';
import { SelectedLocationProps, setSelectedLocations } from 'redux-toolkit/slices/selectedLocationsSlice';
import { getPlaceByLatLng } from '../../../../../../requests/PlaceRequests';
import { useCustomSnackbar } from '../../../../../../utils/snackbars';
import { MapBox } from '../../../../../Browser/Places/MapBox/MapBox';

interface Props {
  setActiveStep?: React.Dispatch<React.SetStateAction<number>>;
  isEditionMode?: boolean;
  isBusinessChain?: boolean;
}

export const AddressDetails: FC<Props> = ({ setActiveStep, isEditionMode, isBusinessChain }) => {
  const { enqueueErrorSnackbar, enqueueInfoSnackbar } = useCustomSnackbar();
  const dispatch = useAppDispatch();
  const selectedAddress = useSelectedAddressSelector();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const name = useNameSelector();
  const type = useTypeSelector();
  const logo = useLogoSelector();
  const isFirstRender = useRef(true);
  const formLocations = useFormLocationsSelector();

  const submitAddress = async () => {
    if (!selectedAddress.postcode) {
      setErrorMessage('This is not a valid address. Please provide a street number.');
      return;
    }
    if (!isBusinessChain) {
      if (setActiveStep) setActiveStep((currentStep) => currentStep + 1);
      return;
    }
    if (formLocations[selectedAddress.addressId]) {
      enqueueInfoSnackbar('You have already selected this location.');
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await getPlaceByLatLng(selectedAddress.lat, selectedAddress.lng);
      if (res.data && (!isEditionMode || (isEditionMode && selectedAddress.label !== res.data.locations[0].address))) {
        setErrorMessage(
          'Selected location is already occupied. If your place is located on this address, try to change the position of a marker.'
        );
        return;
      }
      const newLocation: SelectedLocationProps = {
        address: selectedAddress.label,
        addressId: selectedAddress.addressId,
        addressLanguage: selectedAddress.language,
        lat: selectedAddress.lat,
        lng: selectedAddress.lng,
        phone: '',
        email: '',
        website: '',
        instagram: '',
        facebook: '',
      };
      dispatch(addFormLocation(newLocation));
      if (setActiveStep) setActiveStep((currentStep) => currentStep + 1);
    } catch (err) {
      enqueueErrorSnackbar();
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatch(
      setSelectedLocations([
        {
          name: name,
          type: type as string,
          logo: logo as string,
          lat: selectedAddress.lat,
          lng: selectedAddress.lng,
        },
      ])
    );
  }, [selectedAddress]);

  return (
    <Fade timeout={1000} in={true}>
      <Grid container justifyContent="center">
        <Grid container justifyContent="center">
          {selectedAddress.postcode && (
            <Fade timeout={500} in={true}>
              <Alert style={{ marginBottom: 10, flexGrow: 1 }} variant="filled" severity="info">
                Current address: {selectedAddress.label}
              </Alert>
            </Fade>
          )}
        </Grid>
        <Grid item lg={12}>
          <AddressSearcher errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        </Grid>
        <Fade in={errorMessage !== ''}>
          <Grid item lg={12} style={{ textAlign: 'center' }}>
            <Typography style={{ color: 'red' }} variant="caption">
              {errorMessage}
            </Typography>
          </Grid>
        </Fade>
        <Grid style={{ height: 500, marginTop: 10 }} container>
          <MapBox isMarkerDraggable={true} />
        </Grid>
        <LoadingButton
          size="large"
          loading={submitLoading}
          disabled={!selectedAddress.postcode || submitLoading}
          variant="contained"
          onClick={() => submitAddress()}
          fullWidth={true}
          style={{ marginTop: 10 }}
          color="primary"
        >
          Submit
        </LoadingButton>
      </Grid>
    </Fade>
  );
};
