import { LoadingButton } from '@mui/lab';
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeletePlaceMutation, useDeleteSelectedLocationsMutation } from 'redux-toolkit/api/placesApi';
import { useAppDispatch } from 'redux-toolkit/hooks';
import { deleteSelectedLocations, useBusinessChainSelector } from 'redux-toolkit/slices/businessChainSlice';
import { deletePlace, deleteSelectedLocationsFromSelectedPlace, usePlacesSelector } from 'redux-toolkit/slices/placesSlice';
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
    const [deleteSelectedLocations, { isLoading }] = useDeleteSelectedLocationsMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const places = usePlacesSelector()

    const handleClick = async () => {
        try {
            await deleteSelectedLocations({
                locationIds: selectedLocations,
                placeId: businessChain._id as string
            }).unwrap()
            if (businessChain.locations.length === selectedLocations.length) {
                enqueueSuccessSnackbar('You have successfully deleted your business chain.')
                navigate('/panel/dashboard')
                return
            }
            enqueueSuccessSnackbar('You have successfully removed selected locations.')
        } catch (err) {
            console.log(err)
            enqueueErrorSnackbar()
        } finally {
            setSelectedLocations([])
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
                        loading={isLoading}
                        disabled={isLoading || value !== 'delete'}
                        onClick={handleClick}
                    >
                        Delete
                    </LoadingButton>
                </Grid>
            </DialogActions>

        </Dialog>
    );
}; 