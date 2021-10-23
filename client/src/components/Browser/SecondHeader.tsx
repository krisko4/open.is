import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import React, { FC } from "react";
import Searcher from "./Searcher";




export const SecondHeader : FC = () => {


    return (
        <AppBar
            style={{
                background: '#2C2C2C',
                position: 'static'
            }}>
            <Toolbar>
                <Grid container justify="center" style={{marginTop: 10, marginBottom: 10}}>
                    <Grid item xs={10} sm={8} md={6} lg={5}>
                        <Searcher />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
