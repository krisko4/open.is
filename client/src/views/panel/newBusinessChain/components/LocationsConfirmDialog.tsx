import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FC } from 'react';
import { useAddLocationsMutation } from 'store/api';
import { useBusinessChainIdSelector } from 'store/slices/businessChainSlice';
import { FormLocationProps, useFormLocationsSelector } from 'store/slices/formLocationsSlice';
import { useCustomSnackbar } from 'utils/snackbars';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddLocationsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LocationsConfirmDialog: FC<Props> = ({ dialogOpen, setDialogOpen, setAddLocationsDialogOpen }) => {
  const formLocations = useFormLocationsSelector();
  const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar();
  const businessChainId = useBusinessChainIdSelector();
  const [addLocations, { isLoading }] = useAddLocationsMutation();

  const handleClick = async () => {
    try {
      const locations: FormLocationProps[] = Object.values(formLocations).map((location) => {
        const newLocation = { ...location };
        newLocation.facebook = 'https://facebook.com/' + newLocation.facebook;
        newLocation.instagram = 'https://instagram.com/' + newLocation.instagram;
        return newLocation;
      });
      console.log(locations);
      await addLocations({
        placeId: businessChainId as string,
        locations: locations,
      }).unwrap();
      enqueueSuccessSnackbar('You have successfully added new locations');
      if (setAddLocationsDialogOpen) setAddLocationsDialogOpen(false);
    } catch (err) {
      console.log(err);
      enqueueErrorSnackbar();
    }
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Confirm new locations</DialogTitle>
      <DialogContent>
        You have decided to add <b>{Object.values(formLocations).length}</b> new{' '}
        {Object.values(formLocations).length === 1 ? 'location' : 'locations'} to your business chain. Are you sure you
        would like to save your changes?
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Button disabled={isLoading} onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} disabled={isLoading} onClick={handleClick}>
            Yes, I am sure
          </LoadingButton>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
