import Grid from "@material-ui/core/Grid";
import { Banner } from "./Banner";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { AuthContextProvider } from "../../../contexts/AuthContext";
import { FC } from "react";
import { Auth } from "../../Auth/Auth";
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles({
    footer: {
        background: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(24,131,217,1) 47%);'
    },
    text: {
        color: 'white',
        marginBottom: 10,
        fontStyle: 'italic'
    }, })
const HomePage: FC = () => {

    const classes = useStyles()

    return (
        <Grid container>
            <AuthContextProvider>
                <Header />
                <Auth />
                <Banner />
                <Content />
                <Footer classes={classes} />
            </AuthContextProvider>
        </Grid>
    )
}

export default HomePage