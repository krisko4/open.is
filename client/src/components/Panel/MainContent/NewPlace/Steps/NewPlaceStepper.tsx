import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import React, { FC, useEffect, useState } from 'react';
import { useStepContext } from "../../../../../contexts/StepContext";


const steps = [
    {
        title: 'Name your place',
        content: 'Provide the name of your business. Users will use it to find your place in the browser',
    },
    {
        title: 'Place details',
        content: 'Describe your business in few words',
    },
    {
        title: 'Contact details',
        content: 'Share some contact information with your clients',
    },
    {
        title: 'Address details',
        content: 'Provide the address of your business in order to appear in our search engines',
    },
    {
        title: 'Representative image',
        content: 'Your visual business card',
    },
]




export const NewPlaceStepper: FC<any> = (props) => {

    const { setActiveStep, activeStep } = useStepContext()
    const [step, setStep] = useState(activeStep)
    const handleChange = (index: number) => {
        console.log(index)
        console.log(step)
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
        setStep(activeStep)
    }, [activeStep])

    const { children, orientation, ...rest } = props


    return (
        <Stepper
            orientation={orientation}
            alternativeLabel={orientation !== 'vertical'}
            {...rest}
            sx={{
                flexGrow: orientation === 'vertical' ? 0 : 1,
                '& .MuiStepContent-root': {
                    color: 'lightgrey',
                },
                '& .MuiStepLabel-label, .MuiStepLabel-label.Mui-active': {
                    color: 'white'
                },
            }}
            activeStep={step}
        >
            {steps.map((step, index) => {
                return (
                    <Step key={index} >
                        <StepLabel onMouseEnter={() => activeStep === 0 && handleChange(index)} onClick={() => handleChange(index)}>{step.title}</StepLabel>
                        {orientation === 'vertical' &&
                            <StepContent>
                                {step.content}
                            </StepContent>}
                    </Step>
                );
            })}
        </Stepper>
    );
}
