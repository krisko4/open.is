import { Grid, Typography } from "@material-ui/core"
import React, { FC, useEffect } from "react"



export const Section1: FC<any> = ({classes, setCurrentSection}) => {

    useEffect(() => {
        setCurrentSection(0)
    }, [])
    return (
        <Grid container alignItems="center" className={classes.background}>
            <Grid container justify="flex-end">
                <Grid item container justify="center" lg={5} style={{ textAlign: 'center', marginRight: 200, marginBottom: 300 }}>
                    <Typography style={{ color: 'white' }} variant="h2">Hello, good to see you!</Typography>
                    <Grid item lg={10} style={{ marginTop: 20 }}>
                        <Typography style={{ color: 'white' }} variant="h6">My name is Krzysztof Wyszyński.
                            <br />Let me introduce you to our company and my colleagues.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}