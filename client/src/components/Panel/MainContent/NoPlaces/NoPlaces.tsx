import { Button, CardContent, Grid, Grow, makeStyles, StepButton, Step, StepContent, StepLabel, Stepper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import React, { FC, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { PanelCard } from "../../../reusable/PanelCard";

const useStyles = makeStyles({
    stepper: {
        background: 'inherit',
        '& .MuiStepContent-root': {
            color: 'white',

        }

    }
})

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

export const NoPlaces: FC = () => {

    const classes = useStyles()
    const { setSelectedOption } = usePanelContext()
    const history = useHistory()
    const match = useRouteMatch()
    const [activeStep, setActiveStep] = useState(0)

    return (
        <Grow in={true} timeout={1000}>
            <Grid container item style={{ height: '100%', marginTop: -100 }} alignItems="center">
                <Grid item container lg={7} direction="column" style={{ marginRight: 10 }} spacing={4} alignItems="center">
                    <Typography variant="h2" style={{ color: 'white' }}>Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
                    <Grid item lg={8}>
                        <Typography variant="subtitle1" style={{ color: 'white', textAlign: 'center' }}>
                            It seems you have not registered any places yet.
                            Please press the button below to add your first business
                            and take advantage of functionality provided by our panel.
                        </Typography>
                    </Grid>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(`${match.url}/new-place`)} size="large" color="primary">Add new place</Button>
                </Grid>
                <Grid item container lg={4} alignItems="center">
                    <PanelCard>
                        <CardContent>
                            <Typography variant="h2" style={{ color: 'white' }}>How does it work?</Typography>
                            <Grid style={{ marginTop: 10 }} container lg={10}>
                                <Typography variant="body1">
                                    In order to register your business, you will have to complete some simple steps:
                                </Typography>
                                <Stepper className={classes.stepper} activeStep={activeStep} orientation="vertical">
                                    {steps.map((step, index) => <Step key={index}>
                                            <StepLabel onClick={() => setActiveStep(index)}>
                                                {step.title}
                                            </StepLabel>
                                        <StepContent>
                                            {step.content}
                                        </StepContent>
                                    </Step>)}
                                </Stepper>
                            </Grid>
                        </CardContent>
                    </PanelCard>
                </Grid>
            </Grid>
        </Grow>

    )
}