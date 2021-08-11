import React, {FC} from "react";
import {Grid, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {Field, Formik} from "formik";
import {Autocomplete} from "@material-ui/lab";
import {ContactDetailsForm} from "./ContactDetailsForm"
import { StepProps } from "../StepProps";

export const Step3: FC<StepProps> = ({ setActiveStep })  => {

    return (
        <Grid item lg={12} container justify="center">
            <Grid item lg={12} style={{textAlign: 'center'}}>
                <Typography variant="h3">Step 3</Typography>
            </Grid>
            <Grid item lg={12} style={{textAlign: 'center'}}>
                <Typography variant="subtitle1">Contact details</Typography>
            </Grid>
           <ContactDetailsForm setActiveStep={setActiveStep}/>
        </Grid>
    )
}