import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    CardContent,
    Grid,
    Grow,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import React, { FC } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { PanelCard } from "../../../reusable/PanelCard";
import { NewPlaceStepper } from "../NewPlace/Steps/NewPlaceStepper";



export const NoPlaces: FC = () => {

    const { setSelectedOption } = usePanelContext()
    const history = useHistory()
    const match = useRouteMatch()

    return (
        <Grow in={true} timeout={1000}>
            <Grid container sx={{ height: '100%' }} alignItems="center">
                <Grid container>
                    <Grid item lg={7}>
                        <Stack spacing={2} justifyContent="space-evenly" sx={{ marginRight: 10, height: '100%' }} alignItems="center">
                            <Typography variant="h2">Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
                            <img src={`https://c.tenor.com/jCmPqgkv0vQAAAAC/hello.gif`} />
                            <Grid item lg={8}>
                                <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center' }}>
                                    It seems you have not registered any places yet.
                                    Please press the button below to add your business
                                    and take advantage of functionality provided by our panel.
                                </Typography>
                            </Grid>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(`${match.url}/new-place`)} size="large" color="primary">Add new place</Button>
                        </Stack>
                    </Grid>
                    <Grid item container lg={4} alignItems="center">
                        <PanelCard>
                            <CardContent>
                                <Typography variant="h2" style={{ color: 'white' }}>How does it work?</Typography>
                                <Grid style={{ marginTop: 10 }} container lg={10}>
                                    <Typography variant="body1">
                                        In order to register your business, you will have to complete some simple steps:
                                    </Typography>
                                    <NewPlaceStepper orientation="vertical" />
                                </Grid>
                            </CardContent>
                        </PanelCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>

    )
}