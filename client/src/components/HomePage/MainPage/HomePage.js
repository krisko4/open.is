import Grid from "@material-ui/core/Grid";
import Banner from "./Banner";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

const HomePage = () => {



    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
            <Header/>
            <Banner/>
            <Content/>
            <Footer/>
        </Grid>
    )
}

export default HomePage