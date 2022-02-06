import { Grid, Step, StepLabel } from "@material-ui/core";
import Stepper from '@material-ui/core/Stepper';
import React, { FC } from 'react';
import { useStepContext } from "../../../../../contexts/StepContext";
import { Step1 } from "./Step1/Step1";
import { Step2 } from "./Step2/Step2";
import { Step3 } from "./Step3/Step3";
import { Step4 } from "./Step4/Step4";
import { Step5 } from './Step5/Step5';



function getSteps() {
    return ['Name your place', 'Place details', 'Contact details', 'Address details', 'Representative image'];
}

function getStepContent(step: number, isEditionMode: boolean) {
    switch (step) {
        case 0:
            return <Step1 />
        case 1:
            return <Step2 />
        case 2:
            return <Step3 />
        case 3:
            return <Step4 isEditionMode={isEditionMode}/>
        case 4:
            return <Step5 />
        default:
            return 'Unknown step';
    }
}

interface Props{
    isEditionMode: boolean
}

export const NewPlaceStepper: FC<Props> = ({isEditionMode}) => {

    const steps = getSteps();
    const { activeStep} = useStepContext()


    return (
        <Grid container>
            <Grid item lg={12}>
                <Stepper activeStep={activeStep} style={{background: '#18202b'}} alternativeLabel>
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
                {getStepContent(activeStep, isEditionMode)}
            </Grid>
        </Grid>
    );
}
