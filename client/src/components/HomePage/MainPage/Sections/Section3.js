import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";


const Section3 = ({image}) => {
    return(
        <Grid
            container
            style={{marginTop: 100}}
            justify="space-between"
        >

            <Grid item lg={5}  align="center">
                <CardMedia
                    className={image}
                    image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                />
            </Grid>
            <Grid item style={{marginTop: 50}} lg={5} xs={10}>
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                    <span style={{color: '#2196f3', textDecoration: 'underline'}}>Reliability</span> is our domain.
                </Typography>
                {/*<Typography variant="body1" style={{ textTransform: 'uppercase', fontWeight: 'bold', marginTop: 5}}>*/}
                {/*    You can count on us*/}
                {/*</Typography>*/}
                <Grid item lg={7} xs={10}>
                    <Typography variant="h6" style={{marginTop: 20}}>
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