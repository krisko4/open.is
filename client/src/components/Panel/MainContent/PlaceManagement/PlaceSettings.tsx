import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Dialog from "@mui/material/Dialog";
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { deletePlace } from "../../../../requests/PlaceRequests";
import { setPlaces } from "../../../../store/actions/setPlaces";
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import DialogTransition from "../../../reusable/DialogTransition";
import { LoadingButton } from "../../../reusable/LoadingButton";


interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const PlaceSettings: FC<Props> = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [initialPlaceData, setInitialPlaceData] = useState({ ...currentPlace })
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar, enqueueWarningSnackbar } = useCustomSnackbar()
    const [isDeleteOpen, setDeleteOpen] = useState(false)
    const [businessName, setBusinessName] = useState('')
    const [loading, setLoading] = useState(false)


    const closeSettings = () => {
        setCurrentPlace(initialPlaceData)
        enqueueWarningSnackbar('Your changes have not been saved')
        setOpen(false)
    }

    const deleteMyPlace = async () => {
        setLoading(true)
        try {
            await deletePlace(currentPlace._id as string)
            enqueueSuccessSnackbar('You have successfully deleted your place')
            setOpen(false)
            const croppedPlaces = places.filter(place => place._id !== currentPlace._id)
            // dispatch(croppedPlaces.length === 0 ? setSelectedOption(ChosenOptions.NEW_PLACE) : setSelectedOption(ChosenOptions.DASHBOARD))
            dispatch(setPlaces(croppedPlaces))

        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }


    }


    return <>
        <AppBar style={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => closeSettings()}
                    aria-label="close"
                    size="large">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Place settings
                </Typography>
                <Button startIcon={<DeleteIcon />} onClick={() => setDeleteOpen(true)} variant="contained" color="error">Delete</Button>
                <Dialog TransitionComponent={DialogTransition} open={isDeleteOpen}>
                    <DialogTitle>
                        Place removal
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ textAlign: 'center' }}>
                            Are you sure you would like to delete your place? Please provide your business name in the field below in order to confirm your decision.
                            <TextField
                                style={{ marginTop: 10 }}
                                label="Business name"
                                value={businessName}
                                variant="outlined"
                                onChange={(e) => setBusinessName(e.target.value)}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <LoadingButton loading={loading} disabled={businessName !== currentPlace.name || loading} color="primary" onClick={() => deleteMyPlace()}>Delete my place</LoadingButton>
                    </DialogActions>
                </Dialog>
            </Toolbar>
        </AppBar>
        {/* <StepContextProvider>
            <EditPlace setDialogOpen={setOpen} initialPlaceData={initialPlaceData} />
        </StepContextProvider> */}
    </>;
}