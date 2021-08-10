import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import {CardContent} from "@material-ui/core";
import Card from "@material-ui/core/Card";


export const BasicInformation = () => {
    return (
        <Grid container direction="row" justify="center">
            <Grid item xs={6} style={{marginTop: 20}}>
                <Card>
                    <CardContent>
                        <h3>Address: Fiołkowa 7</h3>
                        <h3>Phone number: 111111111</h3>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
};