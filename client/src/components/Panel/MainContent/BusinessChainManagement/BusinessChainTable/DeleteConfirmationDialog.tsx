import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, DialogActions } from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext';
import { RawPlaceDataProps } from '../../../../../contexts/PlaceProps';
import { deleteLocation } from '../../../../../requests/PlaceRequests';
import { setPlaces } from '../../../../../store/actions/setPlaces';
import { usePlacesSelector } from '../../../../../store/selectors/PlacesSelector';
import { useCustomSnackbar } from '../../../../../utils/snackbars';
import DialogTransition from '../../../../reusable/DialogTransition';
interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedLocationId: string,
    businessChainId: string
}
export const DeleteConfirmationDialog: React.FC<Props> = ({ dialogOpen, businessChainId, setDialogOpen, selectedLocationId }) => {
    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const {businessChain, setBusinessChain} = useBusinessChainContext()
    const places = usePlacesSelector()

    const handleClick = async () => {
        setLoading(true)
        try {
            await deleteLocation(businessChainId, selectedLocationId)
            enqueueSuccessSnackbar('You have successfully removed your location.')
            businessChain.locations = businessChain.locations.filter(loc => loc._id !== selectedLocationId)
            const business = places.find(place => place._id === businessChainId) as RawPlaceDataProps
            business.locations = business.locations.filter(loc => loc._id !== selectedLocationId)
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
            setDialogOpen(false)
        }


    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            TransitionComponent={DialogTransition}
        >
            <DialogTitle>
                Location removal confirmation
            </DialogTitle>
            <DialogContent>
                <Grid container >
                    <Typography>
                        Please insert <b>delete</b> in the field below to confirm location removal.
                    </Typography>
                </Grid>
                <Grid sx={{ mt: 2 }} container justifyContent="center">
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}

                        label="delete" />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container justifyContent="flex-end">
                    <LoadingButton
                        loading={loading}
                        disabled={loading || value !== 'delete'}
                        onClick={handleClick}
                    >
                        Delete
                    </LoadingButton>
                </Grid>
            </DialogActions>

        </Dialog>
    );
}; 