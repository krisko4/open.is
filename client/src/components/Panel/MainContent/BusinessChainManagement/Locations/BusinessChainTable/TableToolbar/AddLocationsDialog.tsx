import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import {  useLogoSelector } from 'redux-toolkit/slices/businessChainSlice';
import { LocationContextProvider } from '../../../../../../../contexts/PanelContexts/LocationContext';
import { FullHeightDialog } from '../../../../../../reusable/FullHeightDialog';
import { LocationDetails } from '../../../../NewBusinessChain/LocationDetails/LocationDetails';
import { LocationSelection } from '../../../../NewBusinessChain/LocationDetails/LocationSelection';

interface Props {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
export const AddLocationsDialog: FC<Props> = ({ dialogOpen, setDialogOpen }) => {

  const logo  = useLogoSelector();
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  // dispatch(setAddressData())


  return (

        <FullHeightDialog
            title="Add new locations"
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
        >
            <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center" justifyContent="space-evenly">
                    <LocationContextProvider>
                        <Grid item container sx={{ height: '100%' }} alignItems="center" lg={6}>
                            <LocationSelection setAddressSubmitted={setAddressSubmitted} />
                        </Grid>
                        <Grid item lg={6} sx={{ height: '100%' }}>
                            <LocationDetails
                                img={logo}
                                addressSubmitted={addressSubmitted}
                                isEditionMode={true}
                                setAddLocationsDialogOpen={setDialogOpen}
                            />
                        </Grid>
                    </LocationContextProvider>
            </Grid>

        </FullHeightDialog>

  );
};