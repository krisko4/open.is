import { Grid } from '@mui/material';
import { FullHeightDialog } from 'components/dialogs';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { useLogoSelector } from 'redux-toolkit/slices/businessChainSlice';
import { resetFormLocations } from 'redux-toolkit/slices/formLocationsSlice';
import { resetMap } from 'redux-toolkit/slices/mapSlice';
import { resetSelectedAddress } from 'redux-toolkit/slices/selectedAddressSlice';
import { resetSelectedLocations } from 'redux-toolkit/slices/selectedLocationsSlice';
import { LocationSelection } from 'views/panel/newBusinessChain/components/LocationSelection';
import { LocationDetails } from '../../newBusinessChain/components/LocationDetails';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddLocationsDialog: FC<Props> = ({ dialogOpen, setDialogOpen }) => {
  const logo = useLogoSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetSelectedAddress());
    dispatch(resetFormLocations());
    dispatch(resetMap());
    dispatch(resetSelectedLocations());
    return () => {
      dispatch(resetSelectedAddress());
      dispatch(resetFormLocations());
      dispatch(resetMap());
      dispatch(resetSelectedLocations());
    };
  }, [dialogOpen]);

  return (
    <FullHeightDialog title="Add new locations" dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center" justifyContent="space-evenly">
        <Grid item container sx={{ height: '100%' }} alignItems="center" lg={6}>
          <LocationSelection />
        </Grid>
        <Grid item lg={6} sx={{ height: '100%' }}>
          <LocationDetails img={logo} isEditionMode={true} setAddLocationsDialogOpen={setDialogOpen} />
        </Grid>
      </Grid>
    </FullHeightDialog>
  );
};
