import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import React, {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Auth} from "../Auth/Auth";
import {AuthContext} from "../../contexts/AuthContext";

const FirstHeader = () => {

    const {loginOpen, setLoginOpen} = useContext(AuthContext)

    return (
        <AppBar style={{
            background: '#2C2C2C',
            position: 'static',
            borderColor: '#383838',
            borderBottomStyle: 'solid',
            borderWidth: 2
        }}
        >
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item lg={6}>
                        <Link to="/">OPEN.IS</Link>
                    </Grid>
                    <Grid item lg={6} align="end">
                        <Button color="secondary" onClick={() =>setLoginOpen(true)} size="large" variant="contained">
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            <Auth/>
        </AppBar>
    )
}

export default FirstHeader