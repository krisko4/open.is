
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";




const useStyles = makeStyles(() =>
    createStyles({
        text: {
            color: 'white',
            marginBottom: 10
        }
    })
)

const Footer : FC= () => {

    const classes = useStyles()
    return (
        <Grid container style={{backgroundColor: '#2196f3'}} justify="center">
            <Grid item xs={6} style={{marginTop: 10, textAlign: 'center', marginBottom: 10}}>
                <Button style={{color:'white'}}>Contact</Button>
                <Button style={{color:'white'}}>About us</Button>
            </Grid>
            <Grid item xs={12}  style={{marginBottom: 20, textAlign: 'center'}}>
                <Typography variant="body1" className={classes.text}>
                    This is a simple project created in educational purposes, designed with Material UI.
                </Typography>
                <Typography className={classes.text}>
                    {new Date().getFullYear()} - <strong>Krzysztof Wyszyński</strong>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer