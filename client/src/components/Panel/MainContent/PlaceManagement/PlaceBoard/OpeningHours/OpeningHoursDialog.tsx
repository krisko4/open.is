import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Alert, AppBar, Dialog, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useChangeOpeningHoursForSelectedLocationsMutation } from 'redux-toolkit/api/placesApi';
import { useBusinessChainIdSelector } from 'redux-toolkit/slices/businessChainSlice';
import { useCustomSnackbar } from '../../../../../../utils/snackbars';
import DialogTransition from '../../../../../reusable/DialogTransition';
import { OpeningHoursCard } from './OpeningHoursCard';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openingHours: any;
  selectedLocations?: string[];
  locationId?: string;
  placeId?: string;
}

export const OpeningHoursDialog: FC<Props> = ({
  dialogOpen,
  locationId,
  placeId,
  selectedLocations,
  setDialogOpen,
  openingHours,
}) => {
  const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar();
  const businessChainId = useBusinessChainIdSelector();

  const [changeOpeningHoursForSelectedLocations, { isLoading }] = useChangeOpeningHoursForSelectedLocationsMutation();

  const saveChanges = async () => {
    Object.keys(openingHours).forEach((day) => {
      delete openingHours[day].valid;
      openingHours[day].start = new Date(openingHours[day].start);
      openingHours[day].end = new Date(openingHours[day].end);
    });
    try {
      // this means that openingHoursDialog is open in business chain management
      if (selectedLocations) {
        await changeOpeningHoursForSelectedLocations({
          placeId: businessChainId as string,
          openingHours: openingHours,
          locationIds: selectedLocations,
        }).unwrap();
      } else {
        await changeOpeningHoursForSelectedLocations({
          placeId: placeId as string,
          openingHours: openingHours,
          locationIds: [locationId as string],
        }).unwrap();
      }
      enqueueSuccessSnackbar('You have successfully updated your opening hours');
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
      enqueueErrorSnackbar();
    }
  };

  return (
    <Dialog
      data-testid="opening-hours-dialog"
      fullScreen
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      TransitionComponent={DialogTransition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDialogOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Summary
          </Typography>
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            color="primary"
            variant="contained"
            size="large"
            onClick={saveChanges}
          >
            Save changes
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
        <Grid item xs={10} lg={5}>
          <Alert severity="info" sx={{ mb: 1 }}>
            This is the summary board of your opening hours. Press the button in the top-right corner to save your
            changes.
          </Alert>
          <OpeningHoursCard openingHours={openingHours} />
        </Grid>
      </Grid>
    </Dialog>
  );
};
