import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { Fade, Grow, makeStyles } from "@material-ui/core";

interface Props {
    isVisible1: boolean
}

// const useStyles = makeStyles({
//     image: {
//         marginTop: 20,
//         height: 
//     }
// })

const Section1: FC<Props> = ({ isVisible1 }) => {

    return (
        <div style={{ height: 1200, background: 'black' }}>
            <Grid container direction="column" style={{ marginTop: 80, marginBottom: 80 }} alignItems="center" justify="center">
                <Grid item lg={6} md={9} sm={9} xs={10} style={{ textAlign: 'center' }}>
                    <Fade in={isVisible1} timeout={1000}>
                        <Typography variant="h5" style={{ color: 'white' }}>Find open places in your neighbourhood using our software</Typography>
                    </Fade>
                    <Grow in={isVisible1} timeout={1000}>
                        <Typography variant="subtitle1" style={{ color: 'lightgrey', marginTop: 20 }}>
                            Open.is is a platform designed to provide reliable data about the opening state of local businesses.
                            What differs us from other services such as Google Maps, we rely on direct relations with our users.
                            Our mission is to encourage business owners to manage their places using our software and benefit
                            from all the features provided by our platform in order to develop and expand their customer basis.
                        </Typography>
                    </Grow>
                </Grid>
                <Grow timeout={3000} in={isVisible1}>
                    <Grid item lg={8}>
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}/images/earth.jpg`}
                            style={{ width: '100%' }}
                        />
                    </Grid>
                </Grow>
            </Grid>
        </div>
    )
}

export default Section1
