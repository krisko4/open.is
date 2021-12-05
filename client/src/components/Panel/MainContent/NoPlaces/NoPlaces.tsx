import { Button, Grid, Grow, Slide } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import AddIcon from '@material-ui/icons/Add';
import { useRouteMatch, useHistory } from "react-router-dom";

export const NoPlaces: FC = () => {

    const { setSelectedOption } = usePanelContext()
    const history = useHistory()
    const match = useRouteMatch()

    return (
        <Grow in={true} timeout={1000}>
            <Grid container item lg={10} style={{ height: '100%', marginTop: -100 }} alignItems="center">
                <Grid item container direction="column" style={{ marginRight: 10 }} spacing={4} alignItems="center">
                    <Typography variant="h2">Hello, {localStorage.getItem('fullName')?.split(' ')[0]}</Typography>
                    <Grid item lg={6}>
                        <Typography variant="h6" style={{ textAlign: 'center' }}>
                            It seems you have not registered any places yet.
                            Please press the button below to add your first business
                            and take advantage of functionality provided by our panel.
                        </Typography>
                    </Grid>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(`${match.url}/new-place`)} size="large" color="primary">Add new place</Button>
                </Grid>
            </Grid>
        </Grow>

    )
}