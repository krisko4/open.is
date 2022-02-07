import React, {FC} from "react";
import {Grid, Typography} from "@mui/material";
import {ContactDetailsForm} from "./ContactDetailsForm"


export const Step3: FC = ()  => {

    return (
        <Grid item style={{marginTop: 20}} container justifyContent="center">
            <Grid container direction="column" alignItems="center" style={{color: 'white'}}>
                <Typography variant="h3">Step 3</Typography>
                <Typography variant="subtitle1">Contact details</Typography>
            </Grid>
           <ContactDetailsForm />
        </Grid>
    );
}