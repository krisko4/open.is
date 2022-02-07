import React, {FC} from "react";
import {Grid, Typography} from "@material-ui/core";
import {ContactDetailsForm} from "./ContactDetailsForm"


export const Step3: FC = ()  => {

    return (
        <Grid item style={{marginTop: 20}} container justify="center">
            <Grid container direction="column" alignItems="center" style={{color: 'white'}}>
                <Typography variant="h3">Step 3</Typography>
                <Typography variant="subtitle1">Contact details</Typography>
            </Grid>
           <ContactDetailsForm />
        </Grid>
    )
}