import { LoadingButton } from '@mui/lab';
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { deleteSelectedLocations, useBusinessChainSelector } from 'redux-toolkit/slices/businessChainSlice';
import { deletePlace, deleteSelectedLocationsFromSelectedPlace, usePlacesSelector } from 'redux-toolkit/slices/placesSlice';
import { deleteLocations } from '../../../../../requests/PlaceRequests';
import { setPlaces } from '../../../../../store/actions/setPlaces';
import { useCustomSnackbar } from '../../../../../utils/snackbars';
import DialogTransition from '../../../../reusable/DialogTransition';

interface Props {
    dialogOpen: boolean,
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedLocations: string[],
    setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>
}
export const DeleteConfirmationDialog: React.FC<Props> = ({ dialogOpen, setSelectedLocations, setDialogOpen, selectedLocations }) => {

    const [value, setValue] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const businessChain = useBusinessChainSelector()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const places = usePlacesSelector()

    const handleClick = async () => {
        setLoading(true)
        try {
            await deleteLocations(businessChain._id as string, selectedLocations)
            if (businessChain.locations.length === selectedLocations.length) {
                enqueueSuccessSnackbar('You have successfully deleted your business chain.')
                dispatch(deletePlace(businessChain._id as string))
                navigate('/panel/dashboard')
                return
            }
            enqueueSuccessSnackbar('You have successfully removed selected locations.')
            dispatch(deleteSelectedLocations(selectedLocations))
            dispatch(deleteSelectedLocationsFromSelectedPlace({
                placeId: businessChain._id as string,
                selectedLocations: selectedLocations
            }))
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setSelectedLocations([])
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
                    {businessChain.locations.length === selectedLocations.length &&
                        <Alert severity="warning" variant="filled">
                            You are trying to remove all locations of your business. As a result, your whole business chain will be deleted.
                        </Alert>
                    }
                    <Typography sx={{ mt: 1 }}>
                        You have selected <b>{selectedLocations.length}</b> locations to be removed.
                        Please insert <b>delete</b> in the field below to confirm your decision.
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