import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { AppBar, Dialog, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useBusinessChainContext } from '../../../../../../../contexts/PanelContexts/BusinessChainContext';
import { CurrentPlaceContextProvider } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { LocationContextProvider } from '../../../../../../../contexts/PanelContexts/LocationContext';
import DialogTransition from "../../../../../../reusable/DialogTransition";
import { FullHeightDialog } from '../../../../../../reusable/FullHeightDialog';
import { LocationDetails } from '../../../../NewBusinessChain/LocationDetails/LocationDetails';
import { LocationSelection } from '../../../../NewBusinessChain/LocationDetails/LocationSelection';

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
export const AddLocationsDialog: FC<Props> = ({ dialogOpen, setDialogOpen }) => {

    const { businessChain } = useBusinessChainContext()
    const [addressSubmitted, setAddressSubmitted] = useState(false)


    return (

        <FullHeightDialog
            title="Add new locations"
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
        >
            <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center" justifyContent="space-evenly">
                <CurrentPlaceContextProvider>
                    <LocationContextProvider>
                        <Grid item container sx={{ height: '100%' }} alignItems="center" lg={6}>
                            <LocationSelection setAddressSubmitted={setAddressSubmitted} />
                        </Grid>
                        <Grid item lg={6} sx={{ height: '100%' }}>
                            <LocationDetails
                                img={businessChain.logo}
                                addressSubmitted={addressSubmitted}
                                isEditionMode={true}
                                setAddLocationsDialogOpen={setDialogOpen}
                            />
                        </Grid>
                    </LocationContextProvider>
                </CurrentPlaceContextProvider>
            </Grid>

        </FullHeightDialog>

    )
}