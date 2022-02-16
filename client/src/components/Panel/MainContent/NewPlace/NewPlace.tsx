import { LoadingButton } from "@mui/lab";
import { Paper, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Slide, SlideProps, Tooltip, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../contexts/StepContext";
import { registerNewPlace } from "../../../../requests/PlaceRequests";
import { setPlaces } from "../../../../store/actions/setPlaces";
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import { NewPlaceStepper } from "./Steps/NewPlaceStepper";
import { Step1 } from "./Steps/Step1/Step1";
import { Step2 } from "./Steps/Step2/Step2";
import { Step3 } from "./Steps/Step3/Step3";
import { Step4 } from "./Steps/Step4/Step4";


const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function getStepContent(step: number, isEditionMode: boolean) {
    switch (step) {
        case 0:
            return <Step1 />
        case 1:
            return <Step2 />
        case 2:
            return <Step3 />
        case 3:
            return <Step4 isEditionMode={isEditionMode} />
        default:
            return 'Unknown step';
    }
}

export const NewPlace: FC = () => {

    const { activeStep, setActiveStep, currentStep, steps } = useStepContext()
    const { imageFile, currentPlace } = useCurrentPlaceContext()
    const dispatch = useDispatch()
    const history = useHistory()
    const places = usePlacesSelector()
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    const handleClose = () => {
        setTooltipOpen(false)
    }

    const handleOpen = () => {
        if (!currentPlace.logo) {
            setTooltipOpen(true)
        }
    }

    const registerPlace = () => {
        setLoading(true)
        const images: any = currentPlace.images.filter(image => image.file !== null).map(image => image.file)
        const place = {
            logo: imageFile as File,
            name: currentPlace.name,
            subtitle: currentPlace.subtitle,
            description: currentPlace.description,
            type: currentPlace.type as string,
        }
        const locations = [
            {
                address: currentPlace.address,
                lat: currentPlace.lat,
                lng: currentPlace.lng,
                phone: currentPlace.phone,
                email: currentPlace.email,
                website: currentPlace.website,
                facebook: `https://facebook.com/${currentPlace.facebook}`,
                instagram: `https://instagram.com/${currentPlace.instagram}`,
            }
        ]
        const formData = new FormData()
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


    return (
        <Scrollbars>
            <Grid container style={{ height: '100%' }} direction="column">
                {activeStep > 0 && activeStep !== 3 &&
                    <Paper sx={{ width: '100%' }}>
                        <Grid container sx={{ height: '120px' }} alignItems="center">
                            <Button color="primary" sx={{ ml: '30px' }} variant="outlined" onClick={() => setActiveStep(step => step - 1)}>Back</Button>
                            <NewPlaceStepper />
                        </Grid>
                    </Paper>
                }
                <Grid container sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                        <Grid container item lg={11} justifyContent="space-evenly">
                            {activeStep !== 4 &&
                                <Grid container item lg={activeStep === 3 ? 6 : 5}>
                                    {getStepContent(activeStep, false)}
                                </Grid>
                            }
                            {activeStep === 4 && <Grid container justifyContent="space-between" sx={{ mt: '20px' }}>
                                <Grid container lg={5}>
                                    <PlaceDetailsCard isEditable />
                                </Grid>
                                <Grid container lg={5}>
                                    <Slide in={true} timeout={1000}>
                                        <div>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h2">
                                                        Step {activeStep + 1} - Final
                                                    </Typography>
                                                    <Grid container sx={{ mt: '10px', mb: '10px' }} lg={11}>
                                                        <Typography variant="body1" sx={{ mb: '10px' }}>
                                                            This is the final step of the registration process. On the left side, you can see your place card.
                                                            You have filled it with your data - now you can make it beautiful by uploading images presenting your place.
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
                                </Grid>
                            </Grid>

                            }
                            {activeStep === 1 || activeStep === 2 ?
                                <Grid container item style={{ height: 600, marginTop: 20, overflow: 'hidden' }} lg={7} >
                                    <TransformWrapper
                                        limitToBounds={false}
                                        doubleClick={{
                                            disabled: true
                                        }}
                                        initialPositionY={-370}
                                        initialPositionX={70}
                                        initialScale={0.93}
                                        minScale={0.5}
                                    >
                                        <TransformComponent>
                                            <PlaceDetailsCard />
                                        </TransformComponent>
                                    </TransformWrapper>
                                </Grid>
                                : activeStep !== 4 &&
                                <Grid container item lg={5}>
                                    <Slide in={true} timeout={1000}>
                                        <div>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h2">
                                                        Step {activeStep + 1}
                                                    </Typography>
                                                    <Grid container style={{ marginTop: 10 }} lg={10}>
                                                        <Typography variant="body1">
                                                            {activeStep === 0 ?
                                                                'The name of your business will be used in our search engines. Each user will be able to find your place in the browser by entering the name of your business in the search bar.' :
                                                                'Please enter the location of your business inside the search bar. Make sure to provide valid address, including city and street number.'
                                                            }
                                                        </Typography>
                                                        <NewPlaceStepper
                                                            orientation="vertical"
                                                        />
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </div>

                                    </Slide>
                                </Grid>

                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Scrollbars>
    );
}