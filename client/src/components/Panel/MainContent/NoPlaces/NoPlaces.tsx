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
import { NewPlaceStepper } from "../NewPlace/Steps/NewPlaceStepper";
import { AddNewBusiness } from './AddNewBusiness';
import { NewPlaceChooser } from './NewPlaceChooser';


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

    const history = useHistory()
    const match = useRouteMatch()
    const [buttonClicked, setButtonClicked] = useState(false)

    return (
        <Grid container sx={{ height: '100%', overflow: 'hidden' }} justifyContent="center" alignItems="center">
            {buttonClicked ?
                <NewPlaceChooser />
                :
                <AddNewBusiness setButtonClicked={setButtonClicked} />
            }

            {/* <Grid item container lg={4} alignItems="center">
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
                </Grid> */}
        </Grid>

    )
}