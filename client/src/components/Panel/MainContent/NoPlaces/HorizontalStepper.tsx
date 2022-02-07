import { Stepper, Step, StepLabel, StepContent } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { FC, useState } from "react"
import { PanelStepper } from "../../../reusable/PanelStepper"


const steps = [
    {
        title: 'Name your place',
        content: 'Provide the name of your business, which users will use to find your place in the browser',
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
export const HorizontalStepper: FC<any> = () => {
    const [activeStep, setActiveStep] = useState(0)
    return (
        <PanelStepper style={{ background: '#18202b', flexGrow: 1 }} alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => <Step key={index}>
                <StepLabel onClick={() => setActiveStep(index)}>
                    {step.title}
                </StepLabel>
                <StepContent>
                    {step.content}
                </StepContent>
            </Step>)}
        </PanelStepper>

    )
}