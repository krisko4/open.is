import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";

const Section4 = () => {
    return (
        <Grid
            container
            style={{marginTop: 100, background: '#002244'}}
            justify="center"
        >
            <Grid item lg={5}  style = {{marginTop: 100, color: 'white'}}>
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                    Our goal is your <br/> <span style={{color: '#2196f3', textDecoration: 'underline'}}>satisfaction.</span>
                </Typography>
                <Grid item lg={7} xs={10} style={{marginTop: 20}}>
                    <Typography variant="h6" style={{color: 'lightgrey'}}>
                        We are proud of having such ability to assume that our clients are satisfied with our services.
                        Open.is has received several prestigious awards for providing a technology which makes everyday life easier.
                    </Typography>
                </Grid>

            </Grid>
            <Grid item lg={5} xs={5} style={{marginTop:50, marginBottom: 50}} align="center">
                <CardMedia
                    style={{width: 400, height: 400}}
                    image="https://paryskie-perfumy.pl/wp-content/uploads/2020/01/satisfaction.png"
                />
            </Grid>
        </Grid>
    )
}

export default Section4