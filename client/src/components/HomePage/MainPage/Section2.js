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
            <Grid item lg={5} xs={12} style = {{ color: 'white'}}>
                <Typography variant="h3" style={{fontWeight: 'bold'}}>
                    Convenience & <span style={{color: '#2196f3', textDecoration: 'underline'}}>benefits.</span>
                </Typography>
                {/*<Typography variant="body1" style={{ textTransform: 'uppercase',  fontWeight: 'bold', marginTop: 5}}>*/}
                {/*    A deep functionality behind a simple idea*/}
                {/*</Typography>*/}
                <Grid item lg={7} xs={11} style={{marginTop: 20}}>
                    <Typography variant="h6" style={{color: 'lightgrey'}}>
                        Using Open.is, place owners are able to provide some additional useful information to their pages,
                        depending on the type of institution they own, including important news, bargains,
                        special offers etc. For instance, having found the desired restaurant, you can directly switch to UberEats
                        in order to have some food.
                    </Typography>
                </Grid>

            </Grid>
            <Grid item lg={5} xs={10} style={{marginTop:50, marginBottom: 50}} align="center">
                <img alt="img" src="https://images.unsplash.com/photo-1605369817409-504bfc7a165d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=902&q=80" className={classes.parallax}/>
            </Grid>
        </Grid>
    )
}

export default Section2
