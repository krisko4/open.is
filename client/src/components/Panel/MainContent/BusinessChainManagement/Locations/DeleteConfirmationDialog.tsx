import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, DialogActions, Alert } from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useBusinessChainContext } from '../../../../../contexts/PanelContexts/BusinessChainContext';
import { RawPlaceDataProps } from '../../../../../contexts/PlaceProps';
import { deleteLocations } from '../../../../../requests/PlaceRequests';
import { setPlaces } from '../../../../../store/actions/setPlaces';
import { usePlacesSelector } from '../../../../../store/selectors/PlacesSelector';
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
    const { businessChain, setBusinessChain } = useBusinessChainContext()
    const history = useHistory()
    const dispatch = useDispatch()
    const places = usePlacesSelector()

    const handleClick = async () => {
        setLoading(true)
        try {
            if (businessChain.locations.length === selectedLocations.length) {
                await deleteLocations(businessChain._id as string, selectedLocations)
                enqueueSuccessSnackbar('You have successfully deleted your business chain.')
                const newPlaces = places.filter(place => place._id !== businessChain._id)
                dispatch(setPlaces(newPlaces))
                history.push('/panel/dashboard')
                return
            }
            await deleteLocations(businessChain._id as string, selectedLocations)
            enqueueSuccessSnackbar('You have successfully removed selected locations.')
            businessChain.locations = businessChain.locations.filter(loc => !selectedLocations.includes(loc._id as string))
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