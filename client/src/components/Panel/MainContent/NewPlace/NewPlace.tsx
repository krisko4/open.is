import React, { FC, useState } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { NewPlaceStepper } from "./Steps/NewPlaceStepper";
import { PlaceDetailsCard } from "./PlaceDetailsCard";
import { StepContextProvider } from "../../../../contexts/StepContext";






export const NewPlace: FC = () => {

    const [activeStep, setActiveStep] = useState(0);

    return (
        <StepContextProvider>
            <Grid item container style={{ marginTop: 40, marginBottom: 40 }} justify="space-evenly">
                <Grid item lg={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" >
                                Business management
                            </Typography>
                            <Typography variant="subtitle2">
                                Add new place to your place assembly
                            </Typography>
                            <NewPlaceStepper activeStep={activeStep} setActiveStep={setActiveStep} />
                        </CardContent>
                        {activeStep > 0 &&
                            <CardActions>
                                <Button variant="text" color="primary" onClick={() => setActiveStep((currentStep) => currentStep - 1)}>Return</Button>
                            </CardActions>
                        }
                    </Card>
                </Grid>
                {activeStep > 0 &&
                    <Grid item lg={5}>
                        <PlaceDetailsCard />
                    </Grid>
                }

            </Grid>
        </StepContextProvider>

    )
}