import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";


const Section3 = ({image}) => {
    return(
        <Grid
            container
            style={{marginTop: 100}}
            justify="center"
        >

            <Grid item lg={5}  align="center">
                <CardMedia
                    className={image}
                    image="https://aosmith.fr/app/uploads/2016/07/banner-quality.jpg"
                />
            </Grid>
            <Grid item lg={5} xs={10} align="center" style = {{marginTop: 100}}>
                <Typography variant="h5" color="primary">
                    Reliability
                </Typography>
                <Typography variant="body1" style={{ textTransform: 'uppercase', fontWeight: 'bold', marginTop: 5}}>
                    You can count on us
                </Typography>
                <Grid item lg={6} xs={10}>
                    <Typography variant="body1" style={{marginTop: 20}}>
                        Our data comes directly from our customers, which gives Open.is an advantage,
                        compared to platforms based on rigid opening hours. With high degree of certainty
                        you can assume that the opening state of the place you wish to visit is going to be correct.
                        We are in constant touch with our users in order to keep the data relevant.
                    </Typography>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default Section3