import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";


const Section1 = ({image}) => {
    return (
        <Grid container justify="center" style={{marginTop: 100}}>
            <Grid item xs={8} lg={5} align="center">
                <CardMedia
                    className={image}
                    image="https://www.bamboohr.com/blog/wp-content/uploads/Employee_Development_Plans_4_Winning_Steps_to_Engage_Employees700x525.png"
                />
            </Grid>
                <Grid item xs={10} lg={5} align="center" >
                <Typography variant="h5" color="primary">
                We are growing
                </Typography>
                <Typography variant="body1" style={{textTransform: 'uppercase', fontWeight: 'bold', marginTop: 5}}>
                Widespread, dynamically growing base of places
                </Typography>
                <Grid item lg={6} xs={10}>
                <Typography variant="body1" style={{marginTop: 20, color: 'grey'}}>
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
