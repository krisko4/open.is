import { Button, Grid, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from 'react';
import { useStepContext } from "../../../../../contexts/StepContext";


interface Step {
    title: string,
    content: string
}

interface Props {
    orientation?: any,
}


export const NewPlaceStepper: FC<Props> = (props) => {

    const { activeStep, setActiveStep, steps } = useStepContext()
    const { children, orientation, ...rest } = props
    const [step, setStep] = useState(activeStep)

    const handleChange = (index: number) => {
        if (orientation !== 'vertical') {
            if (index < step) {
                setActiveStep(index)
                // setStep(index)
            }
            return
        }
        setStep(index)
    }

    useEffect(() => {
        // if(activeStep === 3){
        //     setStep(activeStep - 1)
        //     return
        // }
        setStep(activeStep)
    }, [activeStep])

    


    return (
        <Stepper
            orientation={orientation}
            alternativeLabel={orientation !== 'vertical'}
            {...rest}
            sx={{
                flexGrow: orientation === 'vertical' ? 0 : 1,
            }}
            activeStep={step}
        >
            {steps.map((step, index) => {
                return (
                    <Step key={index} >
                        <StepLabel onMouseEnter={() => activeStep === 0 || activeStep === 3 && handleChange(index)} onClick={() => handleChange(index)}>{step.title}</StepLabel>
                        {orientation === 'vertical' &&
                            <StepContent>
                                <Typography>
                                    {step.content}
                                </Typography>
                                {
                                    index < activeStep &&
                                    <Button variant="contained" onClick={() => setActiveStep(index)} sx={{ mt: 1 }}>Jump to step</Button>
                                }
                            </StepContent>
                        }
                    </Step>
                );
            })}
        </Stepper>
    );
}
