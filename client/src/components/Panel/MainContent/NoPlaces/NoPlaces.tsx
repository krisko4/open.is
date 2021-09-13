import { Button, Grid, Grow, Slide } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../../../contexts/PanelContext";
import AddIcon from '@material-ui/icons/Add';

export const NoPlaces: FC = () => {

    const { setSelectedOption } = usePanelContext()

    return (
        <Grow in={true} timeout={1000}>
            <Grid container style={{ height: '100%' }} alignItems="center">
                <Grid item container lg={12} direction="column" spacing={4} alignItems="center">
                    <Typography variant="h2">Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
                    <Grid item lg={6}>
                        <Typography variant="h6" style={{ textAlign: 'center' }}>
                            It seems you have not registered any places yet.
                            Please press the button below to add your first business
                            and take advantage of functionality provided by our panel.
                        </Typography>
                    </Grid>
                    <Button variant="contained" startIcon={<AddIcon/>} onClick={() => setSelectedOption(ChosenOptions.NEW_PLACE)} size="large" color="primary">Add new place</Button>
                </Grid>
            </Grid>
        </Grow>

    )
}