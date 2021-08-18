import { Button, CardMedia, Grid, Typography } from "@material-ui/core"
import React, { FC } from "react"
import { StepProps } from "../StepProps"

export const Step5 : FC<StepProps> = ({setActiveStep}) => {
    const submitPlace = () => {
        setActiveStep(currentStep => currentStep + 1)
    }
    return (
        <Grid item lg={12} container >
            <Grid item lg={12} style={{textAlign: 'center'}}>
                <Typography variant="h3">Step 5</Typography>
            </Grid>
            <Grid item lg={12} style={{textAlign: 'center'}}>
                <Typography variant="subtitle1">Representative image</Typography>
            </Grid>
            <Grid item container  justify="center" style={{marginTop: 20}} lg={12}>
                <Grid item lg={5}>
                <CardMedia style={{height: 200}} image="https://twojspozywczy.pl/wp-content/uploads/2020/04/lidl-sklep.jpg" ></CardMedia>
                <Button variant="contained" fullWidth={true} style={{marginTop: 10}} color="primary">Submit</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}