import { Button, Card, CardContent, Grid, Paper, Slide, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { clearPlace, CurrentPlaceContextProvider, useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { CurrentPlaceProps } from "../../../../contexts/PlaceProps";
import { useStepContext } from "../../../../contexts/StepContext";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import { NewPlaceStepper } from "./Steps/NewPlaceStepper";
import { Step1 } from "./Steps/Step1/Step1";
import { Step2 } from "./Steps/Step2/Step2";
import { Step3 } from "./Steps/Step3/Step3";
import { Step4 } from "./Steps/Step4/Step4";
import { Step5Container } from "./Steps/Step5Container";
import { useAppDispatch } from "redux-toolkit/hooks";
import { setCurrentPlace } from "redux-toolkit/slices/currentPlaceSlice";




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

interface Props {
    isEditionMode?: boolean,
    initialPlaceData?: CurrentPlaceProps
}

export const NewPlace: FC<Props> = ({ isEditionMode, initialPlaceData }) => {

    const { activeStep, setActiveStep } = useStepContext()
    const { enqueueInfoSnackbar } = useCustomSnackbar()
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        isEditionMode && enqueueInfoSnackbar('In edition mode you can switch freely between steps. Click on the step label to check it out.')
        if (initialPlaceData) {
            dispatch(setCurrentPlace(initialPlaceData))
            return
        }
        dispatch(setCurrentPlace(clearPlace))
    }, [])

    return (
        <Grid container style={{ height: '100%' }} direction="column">
            {activeStep > 0 && activeStep !== 3 &&
                <Paper sx={{ width: '100%' }}>
                    <Grid container sx={{ height: '120px' }} alignItems="center">
                        <Button color="primary" sx={{ ml: '30px' }} variant="outlined" onClick={() => setActiveStep(step => step - 1)}>Back</Button>
                        <NewPlaceStepper isEditionMode={isEditionMode} />
                    </Grid>
                </Paper>
            }
            <Grid container sx={{ flexGrow: 1 }}>
                <Scrollbars>
                    <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
                        <Grid container item lg={11} justifyContent="space-evenly">
                            {activeStep !== 4 &&
                                <Grid container item lg={activeStep === 3 ? 6 : 5}>
                                    {getStepContent(activeStep, isEditionMode || false)}
                                </Grid>
                            }
                            {activeStep === 4 &&
                                <Grid container justifyContent="space-between" sx={{ pt: '20px', pb: '20px' }}>
                                    <Grid item lg={5}>
                                        <PlaceDetailsCard logoFile={logoFile} setLogoFile={setLogoFile} isEditable />
                                    </Grid>
                                    <Grid item lg={5}>
                                        <Step5Container logoFile={logoFile}  isEditionMode={isEditionMode} />
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
                                                    <Grid container item style={{ marginTop: 10 }} lg={10}>
                                                        <Typography variant="body1">
                                                            {activeStep === 0 ?
                                                                'The name of your business will be used in our search engines. Each user will be able to find your place in the browser by entering the name of your business in the search bar.' :
                                                                'Please enter the location of your business inside the search bar. Make sure to provide valid address, including city and street number.'
                                                            }
                                                        </Typography>
                                                        <NewPlaceStepper
                                                            orientation="vertical"
                                                            isEditionMode={isEditionMode}
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
                </Scrollbars>
            </Grid >
        </Grid >
    );
}