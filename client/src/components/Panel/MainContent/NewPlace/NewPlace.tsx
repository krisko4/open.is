import React, {FC, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {NewPlaceStepper} from "./Steps/NewPlaceStepper";
import {PlaceDetailsCard} from "./PlaceDetailsCard";






export const NewPlace : FC = () => {

    const [activeStep, setActiveStep] = useState(0);

    return (
        <Grid item container style={{marginTop: 40}} justify="space-evenly">
        <Grid item lg={5}>
            <Card>
                <CardContent>
                    <Typography variant="h5" >
                        Business management
                    </Typography>
                    <Typography variant="subtitle2">
                        Add new place to your place assembly
                    </Typography>
                        <NewPlaceStepper activeStep={activeStep} setActiveStep={setActiveStep}/>
                </CardContent>
            </Card>
        </Grid>
            {activeStep > 0 &&
            <Grid item lg={5}>
                <PlaceDetailsCard/>
            </Grid>
            }

        </Grid>
    )
}