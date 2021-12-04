import { Button, Card, CardContent, Dialog, Fade, Grid, Slide, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { CurrentPlaceContextProvider } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { BusinessChainDialog } from './BusinessChainDialog'

export const NewBusinessChain: FC = () => {

    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <Grid container lg={10} spacing={2} item style={{ marginBottom: 40, paddingLeft: 10 }} justify="space-evenly">
            <Grid item lg={8}>
                <Slide in={true}>
                    <Card style={{ boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px', borderRadius: 15 }}>
                        <CardContent>
                            <Typography variant="h5" >
                                Business chain management
                            </Typography>
                            <Typography variant="subtitle2">
                                Add chain of places to your place assembly
                            </Typography>
                            <Fade in={true} timeout={1000}><>
                                <Typography style={{ textAlign: 'center', marginTop: 20 }} variant="subtitle1">Are you an owner of a business chain? Add all your locations quickly and conveniently.</Typography>
                                <Grid container justify="center">
                                    <Grid item justify="center" container lg={8}>
                                        <img src={`${process.env.REACT_APP_BASE_URL}/images/chain.gif`} />
                                        <Button style={{ marginBottom: 20 }} fullWidth size="large" variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Let's start</Button>
                                    </Grid>
                                </Grid>
                            </>
                            </Fade>
                        </CardContent>
                    </Card>
                </Slide>
            </Grid>
            <BusinessChainDialog open={dialogOpen} setOpen={setDialogOpen} />
        </Grid>
    )
}