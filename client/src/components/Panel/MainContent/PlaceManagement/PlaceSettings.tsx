import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, SlideProps, TextField, Typography } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Dialog from "@material-ui/core/Dialog";
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import myAxios from "../../../../axios/axios";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { ChosenOptions, usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { StepContextProvider } from "../../../../contexts/StepContext";
import { setPlaces } from "../../../../store/actions/setPlaces";
import { setSelectedOption } from "../../../../store/actions/setSelectedOption";
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { useSelectedOptionSelector } from "../../../../store/selectors/SelectedOptionSelector";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { EditPlace } from "./EditPlace";

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const PlaceSettings: FC<Props> = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const { currentPlace, setCurrentPlace } = useCurrentPlaceContext()
    const [initialPlaceData, setInitialPlaceData] = useState({ ...currentPlace })
    const { enqueueSnackbar } = useSnackbar()
    const [isDeleteOpen, setDeleteOpen] = useState(false)
    const [businessName, setBusinessName] = useState('')
    const [loading, setLoading] = useState(false)


    const closeSettings = () => {
        setCurrentPlace(initialPlaceData)
        enqueueSnackbar('Your changes have not been saved', {
            variant: 'warning'
        })
        setOpen(false)
    }

    const deletePlace = async () => {
        setLoading(true)
        try {
            await myAxios.delete(`/places/${currentPlace._id}`)
            enqueueSnackbar('You have successfully deleted your place', {
                variant: 'success'
            })
            setOpen(false)
            const croppedPlaces = places.filter(place => place._id !== currentPlace._id)
            dispatch(croppedPlaces.length === 0 ? setSelectedOption(ChosenOptions.NEW_PLACE) : setSelectedOption(ChosenOptions.DASHBOARD))
            dispatch(setPlaces(croppedPlaces))

        } catch (err) {
            enqueueSnackbar('Oops, something went wrong', {
                variant: 'error'
            })
        } finally {
            setLoading(false)
        }


    }


    return (
        <>
            <AppBar style={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => closeSettings()} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Place settings
                    </Typography>
                    <Button startIcon={<DeleteIcon />} onClick={() => setDeleteOpen(true)} variant="contained" color="secondary">Delete</Button>
                    <Dialog TransitionComponent={Transition} open={isDeleteOpen}>
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
                            <LoadingButton loading={loading} disabled={businessName !== currentPlace.name || loading} color="primary" onClick={() => deletePlace()}>Delete my place</LoadingButton>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
            <StepContextProvider>
                <EditPlace setDialogOpen={setOpen} initialPlaceData={initialPlaceData} />
            </StepContextProvider>
        </>
    )
}