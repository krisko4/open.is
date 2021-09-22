
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";




interface Props{
    classes: any
}
const Footer : FC<Props>= ({classes}) => {

   
    return (
        <Grid container className={classes.footer} justify="center">
            <Grid item xs={6} style={{marginTop: 30, textAlign: 'center', marginBottom: 10}}>
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