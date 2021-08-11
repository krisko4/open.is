import React, { FC } from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Field, Formik } from "formik";
import { Autocomplete } from "@material-ui/lab";
import { PlaceDetailsForm } from "./PlaceDetailsForm";
import { StepProps } from "../StepProps"



export const Step2: FC<StepProps> = ({ setActiveStep }) => {



    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="h3">Step 2</Typography>
            </Grid>
            <Grid item lg={12} style={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">Place details</Typography>
            </Grid>
            <PlaceDetailsForm setActiveStep={setActiveStep} />
        </Grid>
    )
}