import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";

export const Section2: FC<any> = ({classes}) => {
    return (
        <Grid container alignItems="center" className={classes.background}>
            <Grid container>
                <Grid item container justify="center" lg={5} style={{ textAlign: 'center', marginLeft: 150, marginBottom: 150 }}>
                    <Typography style={{ color: 'white' }} variant="h2">What is our mission?</Typography>
                    <Grid item lg={10} style={{ marginTop: 20 }}>
                        <Typography style={{ color: 'white' }} variant="h6">
                            We strongly believe that by encouraging our users to actively interact and take care of social aspects of their businesses,
                             we can create a leading global platform for finding and managing places. 

                            </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}