import { Collapse, Fade, Slide, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

interface StyleProps {
    gradient1: number,
    gradient2: number
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    bannerTitle: {
        color: 'white',
        fontFamily: 'Georgia',
    },
    button: {
        minWidth: 250,
        minHeight: 60,
        marginTop: 20,
    },
    // logo: {
    //     width: 600,
    //     height: 400,
    //     marginTop: 40,
    //     [theme.breakpoints.only('xs')]: {
    //         width: 300,
    //         height: 300,
    //         marginTop: 0
    //     },
    // },

    banner: {
        height: 1200,
        // position: 'relative',
        // overflow: 'hidden',
        // '&&::before': {
            backgroundPosition: 'center',
            backgroundImage: props => `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, ${props.gradient2})), url(https://images.unsplash.com/photo-1437196582938-795c4854b3da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
        //     // backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/images/background.jpg)`,
        //     backgroundPosition: 'center',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'cover',
        //     content: '""',
        //     height: '100%',
        //     left: 0,
        //     position: 'fixed',
        //     top: 0,
        //     width: '100%',
        //     willChange: 'transform',
        //     zIndex: -1,
        // }
    }
    // // https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80
    // //     https://i.pinimg.com/originals/45/4d/d3/454dd33dd8a85d430f1e50dcc82cee2d.jpg
    // //    https://i.imgur.com/kTc1tSm.jpeg
    // // https://images.wallpaperscraft.com/image/bridge_autumn_city_121892_1920x1080.jpg]
    // // https://images.wallpaperscraft.com/image/road_marking_bridge_123398_1920x1080.jpg
    // // https://images.wallpaperscraft.com/image/hong_kong_china_skyscrapers_night_city_city_lights_119347_1920x1080.jpg
    // //https://wallpaperscraft.com/download/city_aerial_view_road_156925/1920x1080
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1)), url(${process.env.REACT_APP_BASE_URL}/images/background.jpg)`

}))


export const Banner: FC = () => {

    const history = useHistory()
    const [gradient1, setGradient1] = useState(0.3)
    const [gradient2, setGradient2] = useState(0)
    const classes = useStyles({ gradient1: gradient1, gradient2: gradient2 })

    const handleScroll = () => {

        // setGradient1(window.scrollY * 0.001)
        setGradient2(window.scrollY * 0.002)

    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Fade in={true} timeout={1000}>
            <Grid container className={classes.banner} alignItems="center">
                <Grid item container lg={8} justify="center">
                    <Grid item lg={7} md={7} sm={7} style={{ textAlign: 'center', marginBottom: 200 }}>
                        <Collapse in={window.scrollY < 150} timeout={1500}>
                            <Typography variant="h3" style={{ color: 'white', fontWeight: 200 }}>
                                An easy way to track open destinations all over the world
                            </Typography>

                        </Collapse>
                        <Fade in={window.scrollY < 150} timeout={2000}>
                            <Button color="secondary" className={classes.button} onClick={() => history.push('/search')}
                                variant="contained">Get started</Button>
                        </Fade>
                    </Grid>
                </Grid>
            </Grid>
        </Fade>
 

    )
}

