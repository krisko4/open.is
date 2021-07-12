import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";


const Section1 = ({image}) => {
    return (
        <Grid container justify="space-between" style={{marginTop: 100}}>
            <Grid item xs={8} lg={6} align="center">
                <CardMedia
                    className={image}
                    image="https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1191&q=80"
                />
            </Grid>
                <Grid style={{marginTop: 50}} item xs={10} lg={5} >
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                    We are <span style={{color: '#2196f3', textDecoration: 'underline'}}>growing.</span>
                </Typography>
                {/*<Typography variant="body1" style={{textTransform: 'uppercase', fontWeight: 'bold', marginTop: 5}}>*/}
                {/*Widespread, dynamically growing base of places*/}
                {/*</Typography>*/}
                <Grid item lg={7} xs={10}>
                <Typography variant="h6" style={{marginTop: 20}}>
                With more than 1000 new businesses registered every day,
                our platform expands quickly across the cities and countries.
                We aim to become a global leader in the industry in the near future.
                Our creative team regularly provides new interesting features to our services.
                </Typography>
                </Grid>
                </Grid>
        </Grid>


    )
}

export default Section1
