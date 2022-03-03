import { Button, Card, CardContent, Grid, Paper, Slide, SlideProps, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { LocationContextProvider } from "../../../../contexts/PanelContexts/LocationContext";
import { useStepContext } from "../../../../contexts/StepContext";
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";
import { NewPlaceStepper } from "../NewPlace/Steps/NewPlaceStepper";
import { Step1 } from "../NewPlace/Steps/Step1/Step1";
import { Step2 } from "../NewPlace/Steps/Step2/Step2";
import { Step5 } from '../NewPlace/Steps/Step5/Step5'
import Intro from "./Intro";
import { LocationDetails } from "./LocationDetails/LocationDetails";
import { LocationSelection } from './LocationDetails/LocationSelection';
import { Step5Container } from "./Step5Container";



function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <Step1 />
        case 1:
            return <Step2 />
        // case 2:
        //     return <LocationSelection setAddressSubmitted={setAddressSubmitted} />
        default:
            return 'Unknown step';
    }
}

interface Props {
    isEditionMode?: boolean,
}
export const NewBusinessChain: FC<Props> = ({ isEditionMode }) => {

    const [startClicked, setStartClicked] = useState(false)
    const { activeStep, setActiveStep } = useStepContext()
    const [addressSubmitted, setAddressSubmitted] = useState(false)

    return (
        <>
            {
                startClicked ?
                    <Grid container style={{ height: '100%' }} direction="column" >
                        {activeStep > 0 && activeStep !== 3 &&
                            <Paper sx={{ width: '100%' }}>
                                <Grid container sx={{ height: '120px' }} alignItems="center">
                                    <Button color="primary" sx={{ ml: '30px' }} variant="outlined" onClick={() => setActiveStep(step => step - 1)}>Back</Button>
                                    <NewPlaceStepper
                                    />
                                </Grid>
                            </Paper>
                        }
                        <CurrentPlaceContextProvider>
                            <LocationContextProvider>
                                <Grid container sx={{ flexGrow: 1 }} >
                                    <Scrollbars>
                                        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                                            {activeStep === 2 ?
                                                <Grid container sx={{ height: '100%' }}>
                                                    <Grid item container alignItems="center" lg={6}>
                                                        <LocationSelection setAddressSubmitted={setAddressSubmitted} />
                                                    </Grid>
                                                    <Grid item lg={6}>
                                                        <LocationDetails
                                                            addressSubmitted={addressSubmitted}
                                                            setActiveStep={setActiveStep}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                :
                                                <Grid container item lg={11} justifyContent="space-evenly">
                                                    {activeStep !== 3 &&
                                                        <Grid container item lg={activeStep === 3 || activeStep === 2 ? 6 : 5}>
                                                            {getStepContent(activeStep)}
                                                        </Grid>
                                                    }
                                                    {activeStep === 3 && <Grid container justifyContent="space-between" sx={{ pt: '20px', pb: '20px' }}>
                                                        <Grid item lg={5}>
                                                            <PlaceDetailsCard isEditable />
                                                        </Grid>
                                                        <Grid item lg={5}>
                                                            <Step5Container isEditionMode={isEditionMode} />
                                                        </Grid>
                                                    </Grid>
                                                    }
                                                    {activeStep === 1 ?
                                                        <Grid container item style={{ height: 600, marginTop: 20, overflow: 'hidden' }} lg={7} >
                                                            <TransformWrapper
                                                                limitToBounds={false}
                                                                doubleClick={{
                                                                    disabled: true
                                                                }}
                                                                initialPositionY={-415}
                                                                initialPositionX={80}
                                                                initialScale={0.9}
                                                                minScale={0.5}
                                                            >
                                                                <TransformComponent>
                                                                    <PlaceDetailsCard />
                                                                </TransformComponent>
                                                            </TransformWrapper>
                                                        </Grid>
                                                        : activeStep !== 2 && activeStep !== 3 &&
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
                                            }
                                        </Grid>
                                    </Scrollbars>
                                </Grid>

                            </LocationContextProvider>

                        </CurrentPlaceContextProvider>
                    </Grid>
                    :
                    <Intro setStartClicked={setStartClicked} />
            }
        </>
    );
}