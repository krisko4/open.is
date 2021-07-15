import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import React, {useEffect, useState} from "react";
import Searcher from "./Searcher";




const SecondHeader = () => {


    return (
        <AppBar
            style={{
                background: '#2C2C2C',
                position: 'static'
            }}>
            <Toolbar>
                <Grid container justify="center" style={{marginTop: 10, marginBottom: 10}}>
                    <Grid item xs={12} lg={5}>
                        <Searcher />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default SecondHeader