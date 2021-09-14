import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { Fade, Grow } from "@material-ui/core";

interface Props{
    isVisible1: boolean
}

const Section1 : FC<Props> = ({isVisible1}) => {

    return (
        <>
            <Grid item style={{ textAlign: 'center', marginTop: 40 }} xs={12}>
                <Fade in={isVisible1} timeout={1000}>
                    <Typography variant="h5" style={{ color: 'white' }}>Find open places in your neighbourhood easily using our software</Typography>
                </Fade>
            </Grid>
            <Grid item style={{ textAlign: 'center', marginTop: 20 }} xs={6}>
                <Grow in={window.scrollY > 500} timeout={1000}>
                    <Typography variant="subtitle1" style={{ color: 'lightgrey' }}>
                        Open.is is a platform designed to provide reliable data about the opening state of local businesses.
                        What differs us from other services such as Google Maps, we rely on direct relations with our users.
                        Our mission is to encourage business owners to manage their places using our software and benefit
                        from all the features provided by our platform in order to develop and expand their customer basis.
                    </Typography>
                </Grow>
                <Grow in={isVisible1}>

                    <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/growth.jpg`}
                        style={{ height: 600, marginTop: 40 }}
                    >
                    </CardMedia>
                </Grow>
            </Grid>
        </>
    )
}

export default Section1
