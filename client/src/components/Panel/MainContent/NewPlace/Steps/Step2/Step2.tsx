import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";

import { PlaceDetailsForm } from "./PlaceDetailsForm";



export const Step2: FC = () => {


    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 2</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Place details</Typography>
            </Grid>
            <PlaceDetailsForm/>
        </Grid>
    )
}