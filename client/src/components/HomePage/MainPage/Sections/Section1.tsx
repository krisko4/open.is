import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { Fade, Grow } from "@material-ui/core";

interface Props {
    isVisible1: boolean
}

const Section1: FC<Props> = ({ isVisible1 }) => {

    return (
        <div style={{height: 900, background: '#050505' }}>
            <Grid container style={{marginTop: 80, marginBottom: 80}} justify="center">
                <Grid item lg={6} style={{ textAlign: 'center' }}>
                    <Fade in={isVisible1} timeout={1000}>
                            <Typography variant="h5" style={{ color: 'white' }}>Find open places in your neighbourhoodl using our software</Typography>
                    </Fade>
                    <Grow in={isVisible1} timeout={1000}>
                        <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
                            Open.is is a platform designed to provide reliable data about the opening state of local businesses.
                            What differs us from other services such as Google Maps, we rely on direct relations with our users.
                            Our mission is to encourage business owners to manage their places using our software and benefit
                            from all the features provided by our platform in order to develop and expand their customer basis.
                        </Typography>
                    </Grow>
                    <Grow timeout={3000} in={isVisible1}>

                        <CardMedia
                            image={`https://cdn.pixabay.com/photo/2014/05/28/00/05/earth-356059_960_720.jpg`}
                            style={{ height: 600}}
                        >
                        </CardMedia>
                    </Grow>
                </Grid>
            </Grid>
        </div>
    )
}

export default Section1
