import { LoadingButton } from "@mui/lab"
import { Slide, Card, CardContent, Typography, Grid, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip, SlideProps } from "@mui/material"
import React from "react"
import { FC, useState } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { useLocationContext } from "../../../../../../contexts/PanelContexts/LocationContext"
import { useStepContext } from "../../../../../../contexts/StepContext"
import { registerNewPlace } from "../../../../../../requests/PlaceRequests"
import { setPlaces } from "../../../../../../store/actions/setPlaces"
import { usePlacesSelector } from "../../../../../../store/selectors/PlacesSelector"
import { useCustomSnackbar } from "../../../../../../utils/snackbars"
import DialogTransition from "../../../../../reusable/DialogTransition"
import { NewPlaceStepper } from "../NewPlaceStepper"

interface Props {
    formData: FormData
}

export const Step5: FC<Props> = ({ formData }) => {
    const [isOpen, setOpen] = useState(false)
    const { activeStep, setActiveStep, currentStep, steps } = useStepContext()
    const { currentPlace } = useCurrentPlaceContext()
    const [isLoading, setLoading] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const places = usePlacesSelector()
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const handleClose = () => {
        setTooltipOpen(false)
    }

    const handleClick = () => {
        setLoading(true)
        registerNewPlace(formData).then(res => {
            console.log(res.data)
            const newPlace = res.data.place
            newPlace.logo = res.data.place.logo
            newPlace.visits = []
            newPlace.opinions = []
            newPlace.news = []
            places.push(newPlace)
            dispatch(setPlaces(places))
            enqueueSuccessSnackbar('You have successfully registered new place')
            history.push(`dashboard`)
        }).catch(err => {
            console.log(err)
            enqueueErrorSnackbar()
        }).finally(() => {
            setLoading(false)
            setOpen(false)
        })

    }

    const handleOpen = () => {
        if (!currentPlace.logo) {
            setTooltipOpen(true)
        }
    }

    return (
        <Slide in={true} direction="left" timeout={1000}>
            <Card>
                <CardContent>
                    <Typography variant="h2">
                        Step {activeStep + 1} - Final
                    </Typography>
                    <Grid container sx={{ mt: '10px', mb: '10px' }} lg={11}>
                        <Typography variant="body1" sx={{ mb: '10px' }}>
                            This is the final step of the registration process. On the left side, you can see an example place card of one of your localizations.
                            You have filled it with your data - now you can make it beautiful by uploading images presenting your business.
                        </Typography>
                        <Typography variant="caption">
                            <span style={{ color: 'red' }}>*</span> Uploading a logo picture is required.<br />
                            <span style={{ color: 'red' }}>*</span> You can upload up to 5 pictures.<br />
                        </Typography>
                        <Divider sx={{ width: '100%', mt: 1, mb: 1 }} />
                        <NewPlaceStepper
                            orientation="vertical"
                        />
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                        <Dialog
                            open={isOpen}
                            TransitionComponent={DialogTransition}
                        >
                            <DialogTitle>Summary</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you would like to finish registration and save your place?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} disabled={isLoading} color="primary">
                                    Cancel
                                </Button>
                                <LoadingButton color="primary" loading={isLoading} disabled={isLoading} onClick={handleClick}>Yes, I am sure</LoadingButton>
                            </DialogActions>
                        </Dialog>

                        <Tooltip open={tooltipOpen} onClose={handleClose} onOpen={handleOpen} title="Please upload a logo picture">
                            <Button
                                fullWidth
                                variant="contained"
                                disabled={!currentPlace.logo}
                                size="large"
                                onClick={() => setOpen(true)}

                            > Finish registration
                            </Button>
                        </Tooltip>
                    </Grid>
                </CardContent>
            </Card>
        </Slide >



    )
}