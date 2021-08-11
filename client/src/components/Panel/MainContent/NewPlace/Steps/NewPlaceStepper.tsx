import React, {FC, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import {Step1} from "./Step1/Step1";
 import {Grid, Step, StepLabel} from "@material-ui/core";
import {Step2} from "./Step2/Step2";
import {Step3} from "./Step3/Step3"
import {NewPlaceProps} from "../NewPlaceProps";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },

    }),
);

function getSteps() {
    return ['Name your place', 'Place details', 'Contact details', 'Address details'];
}

function getStepContent(step: number, setActiveStep:  React.Dispatch<React.SetStateAction<number>>) {
    switch (step) {
        case 0:
            return <Step1 setActiveStep={setActiveStep}/>
        case 1:
            return <Step2 setActiveStep={setActiveStep}/>
        case 2:
            return <Step3 setActiveStep={setActiveStep}/>
        default:
            return 'Unknown step';
    }
}



export const NewPlaceStepper : FC<NewPlaceProps> = ({activeStep, setActiveStep}) => {

    const classes = useStyles();

   // const [skipped, setSkipped] = useState(new Set<number>());
    const steps = getSteps();

    // const isStepOptional = (step: number) => {
    //     return step === 1;
    // };

    // const isStepSkipped = (step: number) => {
    //     return skipped.has(step);
    // };

    // const handleNext = () => {
    //     let newSkipped = skipped;
    //     if (isStepSkipped(activeStep)) {
    //         newSkipped = new Set(newSkipped.values());
    //         newSkipped.delete(activeStep);
    //     }
    //
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped(newSkipped);
    // };
    //
    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
    //
    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {
    //         // You probably want to guard against something like this,
    //         // it should never occur unless someone's actively trying to break something.
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }
    //
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };


    return (
        <Grid container>
            <Grid item lg={12}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: { optional?: React.ReactNode } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item container justify="center" lg={12}>
                {getStepContent(activeStep, setActiveStep)}
            </Grid>

                    {/*<div>*/}
                    {/*    <Typography >{getStepContent(activeStep)}</Typography>*/}
                    {/*    <div>*/}
                    {/*        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>*/}
                    {/*            Back*/}
                    {/*        </Button>*/}
                    {/*        {isStepOptional(activeStep) && (*/}
                    {/*            <Button*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*                onClick={handleSkip}*/}
                    {/*                className={classes.button}*/}
                    {/*            >*/}
                    {/*                Skip*/}
                    {/*            </Button>*/}
                    {/*        )}*/}
                    {/*        <Button*/}
                    {/*            variant="contained"*/}
                    {/*            color="primary"*/}
                    {/*            onClick={handleNext}*/}
                    {/*            className={classes.button}*/}
                    {/*        >*/}
                    {/*            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
        </Grid>
    );
}
