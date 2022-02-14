import { Button, Card, CardContent, Dialog, Fade, Grid, Grow, Slide, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { match } from "react-router-dom";
import { CurrentPlaceContextProvider } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { NewPlaceStepper } from "../NewPlace/Steps/NewPlaceStepper";
import { BusinessChainDialog } from './BusinessChainDialog'

export const NewBusinessChain: FC = () => {

    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <Grid container sx={{ height: '100%', overflow: 'hidden' }} alignItems="center">
            <Grid container justifyContent="space-evenly">
                <Grow in={true} timeout={1200}>
                    <Grid item container direction="column" alignItems="center" justifyContent="space-evenly" lg={6}>
                        <Typography variant="h2">New business chain</Typography>
                        <img src={`https://i.imgur.com/4NkElpt.gif`} />
                        <Button fullWidth variant="contained" size="large" color="primary">Let's start</Button>
                    </Grid>
                </Grow >
                <Grid item container lg={5} justifyContent="center" alignItems="center">
                    <Slide in={true} timeout={1000} direction="left">
                        <Card>
                            <CardContent>
                                <Typography variant="h2">What is a business chain?</Typography>
                                <Grid style={{ marginTop: 10 }} container lg={10}>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        If you're an owner of a business with multiple locations, business chain is a great option for you.
                                        Follow some simple steps to add your locations quickly and conveniently.
                                    </Typography>
                                    <NewPlaceStepper orientation="vertical" />
                                </Grid>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
            </Grid >
        </Grid >
        // <Grid container lg={10} spacing={2} item style={{ marginBottom: 40, paddingLeft: 10 }} justifyContent="space-evenly">
        //     <Grid item lg={8}>
        //         <Slide in={true} timeout={1000}>
        //             <Card >
        //                 <CardContent>
        //                     <Typography variant="h5" >
        //                         Business chain management
        //                     </Typography>
        //                     <Typography variant="subtitle2">
        //                         Add chain of places to your place assembly
        //                     </Typography>
        //                     <Typography style={{ textAlign: 'center', marginTop: 20 }} variant="subtitle1">Are you an owner of a business chain? Add all your locations quickly and conveniently.</Typography>
        //                     <Grid container justifyContent="center">
        //                         <Grid item justifyContent="center" container lg={8}>
        //                             <img src={`${process.env.REACT_APP_BASE_URL}/images/chain.gif`} />
        //                             <Button style={{ marginBottom: 20 }} fullWidth size="large" variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Let's start</Button>
        //                         </Grid>
        //                     </Grid>
        //                 </CardContent>
        //             </Card>
        //         </Slide>
        //     </Grid>
        //     <BusinessChainDialog open={dialogOpen} setOpen={setDialogOpen} />
        // </Grid>
    );
}