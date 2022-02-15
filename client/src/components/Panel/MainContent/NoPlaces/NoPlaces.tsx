import AddIcon from '@mui/icons-material/Add';
import {
    Button, Card,
    CardContent,
    Grid,
    Grow, Slide, Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { FC, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { NewPlaceStepper } from "../NewPlace/Steps/NewPlaceStepper";


const steps = [
    {
        title: 'Name your place',
        content: 'Provide the name of your business. Your visitors will use it to find your place in the browser',
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
        title: 'Image upload',
        content: 'Represent your business with images',
    },
]

export const NoPlaces: FC = () => {

    const { setSelectedOption } = usePanelContext()
    const [activeStep, setActiveStep] = useState(0)
    const history = useHistory()
    const match = useRouteMatch()

    return (
        <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center">
            <Grid container>
                <Grow in={true} timeout={1200}>
                    <Grid item lg={7}>
                        <Stack spacing={2} justifyContent="space-evenly" sx={{ marginRight: 10, height: '100%' }} alignItems="center">
                            <Typography variant="h2">Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
                            <img src={`https://c.tenor.com/jCmPqgkv0vQAAAAC/hello.gif`} />
                            <Grid item lg={8}>
                                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                                    It seems you have not registered any places yet.
                                    Please press the button below to add your business
                                    and take advantage of functionality provided by our panel.
                                </Typography>
                            </Grid>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(`${match.url}/new-place`)} size="large" color="primary">Add new place</Button>
                        </Stack>
                    </Grid>
                </Grow >
                <Grid item container lg={4} alignItems="center">
                    <Slide in={true} timeout={1000} direction="left">
                        <Card>
                            <CardContent>
                                <Typography variant="h2">How does it work?</Typography>
                                <Grid style={{ marginTop: 10 }} container lg={10}>
                                    <Typography variant="body1">
                                        In order to register your business, you will have to complete some simple steps:
                                    </Typography>
                                    <NewPlaceStepper
                                        orientation="vertical"
                                    />
                                </Grid>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
            </Grid>
        </Grid>

    )
}