import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Button from "@material-ui/core/Button";

const FirstHeader = () => {
    return (
        <AppBar style={{
          //  background: 'indigo',
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
                        <h2>OPEN.IS</h2>
                    </Grid>
                    <Grid item lg={6} align="end">
                        <Button color="secondary" size="large" variant="contained">
                            Sign in
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default FirstHeader