import { LoadingButton } from "@mui/lab"
import { Slide, Card, CardContent, Typography, Grid, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip, SlideProps } from "@mui/material"
import React from "react"
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { useLocationContext } from "../../../../../../contexts/PanelContexts/LocationContext"
import { useStepContext } from "../../../../../../contexts/StepContext"
import { registerNewPlace } from "../../../../../../requests/PlaceRequests"
import { setPlaces } from "../../../../../../store/actions/setPlaces"
import { usePlacesSelector } from "../../../../../../store/selectors/PlacesSelector"
import { useCustomSnackbar } from "../../../../../../utils/snackbars"
import { NewPlaceStepper } from "../NewPlaceStepper"

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const Step5: FC = () => {
    const [isOpen, setOpen] = useState(false)
    const { activeStep, setActiveStep, currentStep, steps } = useStepContext()
    const { imageFile, currentPlace } = useCurrentPlaceContext()
    const { selectedLocations } = useLocationContext()
    const [isLoading, setLoading] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const places = usePlacesSelector()
    const { enqueueErrorSnackbar, enqueueSuccessSnackbar } = useCustomSnackbar()
    const handleClose = () => {
        setTooltipOpen(false)
    }


    const registerPlace = () => {
        console.log(currentPlace)
        console.log(selectedLocations)
        setLoading(true)
        const formData = new FormData()
        const images: any = currentPlace.images.filter(image => image.file).map(image => image.file)
        const place = {
            logo: imageFile as File,
            name: currentPlace.name,
            subtitle: currentPlace.subtitle,
            description: currentPlace.description,
            type: currentPlace.type as string,
        }
        const locations = selectedLocations.map(location => {
            delete location['isValid']
            location.facebook = `https://facebook.com/` + location.facebook
            location.instagram = `https://instagram.com/` + location.instagram
            return location
        }
        )
        console.log(locations)

        let key: keyof typeof place
        for (key in place) formData.append(key, place[key])
        formData.append('locations', JSON.stringify(locations))
        for (const image of images) {
            formData.append('images', image)
        }
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
        }
        )

    }
    const handleOpen = () => {
        if (!currentPlace.logo) {
            setTooltipOpen(true)
        }
    }

    return (
        <Slide in={true} direction="left" timeout={1000}>
            <div>
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
                                TransitionComponent={Transition}
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
                                    <LoadingButton color="primary" loading={isLoading} disabled={isLoading} onClick={registerPlace}>Yes, I am sure</LoadingButton>
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
            </div>

        </Slide>

    )
}