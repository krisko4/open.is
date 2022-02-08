import { Box, CardContent, Grid, Slide, SlideProps, Typography } from "@mui/material";
import React, { FC, Fragment, useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useStepContext } from "../../../../contexts/StepContext";
import { registerNewPlace } from "../../../../requests/PlaceRequests";
import { setPlaces } from "../../../../store/actions/setPlaces";
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import { PanelCard } from "../../../reusable/PanelCard";
import { NewPlaceStepper } from "./Steps/NewPlaceStepper";
import { Step1 } from "./Steps/Step1/Step1";
import { Step2 } from "./Steps/Step2/Step2";
import { Step3 } from "./Steps/Step3/Step3";
import { Step4 } from "./Steps/Step4/Step4";
import { Step5 } from "./Steps/Step5/Step5";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import Scrollbars from "react-custom-scrollbars";

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
        case 4:
            return <Step5 />
        default:
            return 'Unknown step';
    }
}

export const NewPlace: FC = () => {

    const { activeStep, imageFile, setActiveStep, currentStep } = useStepContext()
    const { currentPlace } = useCurrentPlaceContext()
    const dispatch = useDispatch()
    const history = useHistory()
    const places = usePlacesSelector()
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const { enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()

    const registerPlace = () => {
        setLoading(true)
        const place = {
            img: imageFile as File,
            name: currentPlace.name,
            subtitle: currentPlace.subtitle,
            description: currentPlace.description,
            type: currentPlace.type,
        }
        const locations = [
            {
                address: currentPlace.address,
                lat: currentPlace.lat,
                lng: currentPlace.lng,
                phone: currentPlace.phone,
                email: currentPlace.email,
                website: currentPlace.website,
                facebook: currentPlace.facebook,
                instagram: currentPlace.instagram
            }
        ]
        const formData = new FormData()
        let key: keyof typeof place
        for (key in place) formData.append(key, place[key])
        formData.append('locations', JSON.stringify(locations))
        registerNewPlace(formData).then(res => {
            console.log(res.data)
            const newPlace = res.data.place
            newPlace.img = res.data.place.img
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


    useEffect(() => {
        console.log(currentPlace)
        setActiveStep(0)
    }, [])

    return (
        <Scrollbars>
            <Grid container style={{ height: '100%' }} alignItems="center" justifyContent="space-evenly">
                <Grid container lg={11} style={{paddingTop: 30, paddingBottom: 30}} justifyContent="space-evenly">
                    {activeStep > 0 && activeStep !== 3 &&
                        <Grid container sx={{ height: 120, backgroundColor: 'panelCard.main' }} alignItems="center">
                            <NewPlaceStepper />
                        </Grid>
                    }
                    <Grid container item lg={activeStep === 3 ? 6 : 5}>
                        {getStepContent(activeStep, false)}
                    </Grid>
                    {/* <Grid item container lg={5}>
                <Slide in={true} timeout={1000}>
                    <div>
                        <PanelCard>
                            <CardContent>
                                <Typography variant="h5" >
                                    Business management
                                </Typography>
                                <Typography variant="subtitle2">
                                    Add new place to your place assembly
                                </Typography>
                                <NewPlaceStepper isEditionMode={false} />
                            </CardContent>
                            {activeStep > 0 &&
                                <CardActions>
                                    <Grid container justify="space-between">
                                        <Button variant="text" color="primary" onClick={() => setActiveStep((currentStep) => currentStep - 1)}>Return</Button>
                                        {activeStep === 4 &&
                                            <div>
                                                <Button variant="text" disabled={!currentPlace.img} color="primary" onClick={() => setOpen(true)}>Finish registration</Button>
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

                                            </div>
                                        }

                                    </Grid>
                                </CardActions>
                            }

                        </PanelCard>
                    </div>
                </Slide>
            </Grid> */}
                    {activeStep > 0 && activeStep !== 3 ?
                        <Grid container item justifyContent="center" style={{ height: 600, marginTop: 20, overflow: 'hidden' }} lg={7} >
                            <TransformWrapper limitToBounds={false} initialScale={0.9} minScale={0.5}>
                                <TransformComponent>
                                    <PlaceDetailsCard />
                                </TransformComponent>
                            </TransformWrapper>
                        </Grid>
                        :
                        <Grid container item lg={5}>
                            <Slide in={true} timeout={1000}>
                                <div>
                                    <PanelCard>
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
                                                <NewPlaceStepper orientation="vertical" />
                                            </Grid>
                                        </CardContent>
                                    </PanelCard>
                                </div>

                            </Slide>
                        </Grid>

                    }
                </Grid>
            </Grid >
        </Scrollbars>
    );
}