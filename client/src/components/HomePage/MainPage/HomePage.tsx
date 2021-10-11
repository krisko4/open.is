import { CircularProgress, Fade, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect, useState } from "react";
import { AuthContextProvider } from "../../../contexts/AuthContext";
import { Auth } from "../../Auth/Auth";
import { Banner } from "./Banner";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";



const useStyles = makeStyles({
    footer: {
        //   background: 'linear-gradient(180deg, rgba(245,245,245,1) 0%, rgba(24,131,217,1) 47%);'
        background: 'linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3)), url(https://villamiproperties.com/wp-content/uploads/2017/10/footer-background-2.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'

    },
    text: {
        color: 'white',
        marginBottom: 10,
        fontStyle: 'italic'
    },
})
const HomePage: FC = () => {

    const classes = useStyles()
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setLoading(false)
    //     }, 3000)
    //     return () => clearTimeout(timeout)
    // }, [])

    return <>
                <Grid container>
                    <AuthContextProvider>
                        <Header />
                        <Auth />
                        <Banner />
                        <Content />
                        <Footer classes={classes} />
                    </AuthContextProvider>
                </Grid>
        {/* {
            loading ?
                <Fade in={loading} timeout={1000}>
                    <Grid container style={{ height: '100vh' }} justify="center" alignItems="center">
                        <CircularProgress />
                    </Grid>
                </Fade>
                :
                <Grid container>
                    <AuthContextProvider>
                        <Header />
                        <Auth />
                        <Banner />
                        <Content />
                        <Footer classes={classes} />
                    </AuthContextProvider>
                </Grid>
        } */}
    </>
}

export default HomePage