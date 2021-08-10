import Grid from "@material-ui/core/Grid";
import Banner from "./Banner";
import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import {AuthContextProvider} from "../../../contexts/AuthContext";

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
            <AuthContextProvider>
            <Header/>
            </AuthContextProvider>
            <Banner/>
            <Content/>
            <Footer/>
        </Grid>
    )
}

export default HomePage