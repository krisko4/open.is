import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import { AppBar, Dialog, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useBusinessChainContext } from '../../../../../../../contexts/PanelContexts/BusinessChainContext';
import { CurrentPlaceContextProvider } from "../../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { LocationContextProvider } from '../../../../../../../contexts/PanelContexts/LocationContext';
import DialogTransition from "../../../../../../reusable/DialogTransition";
import { LocationDetails } from '../../../../NewBusinessChain/LocationDetails/LocationDetails';
import { LocationSelection } from '../../../../NewBusinessChain/LocationDetails/LocationSelection';

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    // selectedLocations: number[],
    // setSelectedLocations: React.Dispatch<React.SetStateAction<number[]>>
}
export const AddLocationsDialog: FC<Props> = ({ dialogOpen, setDialogOpen }) => {

    const {businessChain} = useBusinessChainContext()
    const [addressSubmitted, setAddressSubmitted] = useState(false)
    

    return (
        <Dialog
            open={dialogOpen}
            fullScreen
            TransitionComponent={DialogTransition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setDialogOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Add new locations
                    </Typography>
                    {/* <LoadingButton
                        loading={loading}
                        disabled={loading}
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={saveChanges}>
                        Save changes
                    </LoadingButton> */}
                </Toolbar>
            </AppBar>
            <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center" justifyContent="space-evenly">
                <CurrentPlaceContextProvider>
                    <LocationContextProvider>
                        <Grid item container sx={{height: '100%'}} alignItems="center" lg={6}>
                            <LocationSelection setAddressSubmitted={setAddressSubmitted} />
                        </Grid>
                        <Grid item lg={6} sx={{height: '100%'}}>
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

        </Dialog>
    )
}