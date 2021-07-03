import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) =>
    createStyles({
        parallax : {
            height: 400,
            width: 600,
            objectFit: 'cover',
            [theme.breakpoints.only('xs')] : {
                height:200,
                width: 200
            }
        }
    })
)

const Section2 = () => {
    const classes = useStyles()
    return(
        <Grid
            container
            style={{ alignItems:'center', backgroundColor: 'black', background: 'radial-gradient(ellipse at center,#585858 0,#232323 100%)'}}
            justify="center"
        >
            <Grid item lg={5} xs={12} align="center" style = {{ color: 'white'}}>
                <Typography variant="h5" color="primary">
                    Convenience & benefits
                </Typography>
                <Typography variant="body1" style={{ textTransform: 'uppercase',  fontWeight: 'bold', marginTop: 5}}>
                    A deep functionality behind a simple idea
                </Typography>
                <Grid item lg={6} xs={11} style={{marginTop: 20}}>
                    <Typography variant="body1" style={{color: 'lightgrey'}}>
                        Using Open.is, place owners are able to provide some additional useful information to their pages,
                        depending on the type of institution they own, including important news, bargains,
                        special offers etc. For instance, having found the desired restaurant, you can directly switch to UberEats
                        in order to have some food.
                    </Typography>
                </Grid>

            </Grid>
            <Grid item lg={5} xs={10} style={{marginTop:50, marginBottom: 50}} align="center">
                <img alt="img" src="https://www.marketing91.com/wp-content/uploads/2020/05/Definition-of-a-convenience-store.jpg" className={classes.parallax}/>
            </Grid>
        </Grid>
    )
}

export default Section2
