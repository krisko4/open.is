import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, DialogActions, Alert } from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
}
export const DeleteConfirmationDialog: React.FC<Props> = ({ dialogOpen, setDialogOpen, selectedLocationId }) => {
    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const { businessChain, setBusinessChain } = useBusinessChainContext()
    const history = useHistory()
    const dispatch = useDispatch()
    const places = usePlacesSelector()

    const handleClick = async () => {
        setLoading(true)
        try {
            if (businessChain.locations.length === 1) {
                await deleteLocation(businessChain._id as string, selectedLocationId)
                enqueueSuccessSnackbar('You have successfully deleted your business chain.')
                const newPlaces = places.filter(place => place._id !== businessChain._id)
                dispatch(setPlaces(newPlaces))
                history.push('/panel/dashboard')
                return
            }
            await deleteLocation(businessChain._id as string, selectedLocationId)
            enqueueSuccessSnackbar('You have successfully removed your location.')
            businessChain.locations = businessChain.locations.filter(loc => loc._id !== selectedLocationId)
            const business = places.find(place => place._id === businessChain._id) as RawPlaceDataProps
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
                <Grid container justifyContent="center" >
                    {businessChain.locations.length === 1 &&
                        <Alert severity="warning" variant="filled">
                            You are trying to remove the last location of your business. As a result, your whole business will be deleted.
                        </Alert>
                    }
                    <Typography sx={{ mt: 1 }}>
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