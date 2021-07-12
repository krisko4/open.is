import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) =>
    createStyles({

        bannerTitle: {
            color: 'white',
            fontFamily: 'Georgia',
        },
        button: {
            minWidth: 250,
            minHeight: 70,
        },
        logo: {
            width: 600,
            height: 400,
            marginTop: 80,
            [theme.breakpoints.only('xs')]: {
                width: 300,
                height: 300,
                marginTop: 0
            },
        },

        banner: {
            height: 1100,
            flexGrow: 1,
            backgroundSize: 'cover',
       //     https://i.pinimg.com/originals/45/4d/d3/454dd33dd8a85d430f1e50dcc82cee2d.jpg
        //    https://i.imgur.com/kTc1tSm.jpeg
            // https://images.wallpaperscraft.com/image/bridge_autumn_city_121892_1920x1080.jpg]
           // https://images.wallpaperscraft.com/image/road_marking_bridge_123398_1920x1080.jpg
            // https://images.wallpaperscraft.com/image/hong_kong_china_skyscrapers_night_city_city_lights_119347_1920x1080.jpg
            //https://wallpaperscraft.com/download/city_aerial_view_road_156925/1920x1080
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)`
        }


    }),
);


const Banner = () => {

    const history = useHistory()
    const [transform, setTransform] = useState(0)


    const handleScroll = () => {
        setTransform(window.pageYOffset)
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const classes = useStyles()
    return (
        <Grid container>
            <div className={classes.banner} style={{transform: `translateY(${transform * 0.5}px)`,}}>
                <Grid item xs={12} align="center">
                    <CardMedia image="http://localhost:8080/images/Openis-logos_white.png"
                               className={classes.logo}>
                    </CardMedia>
                    <Typography variant="h2"
                                style={{color: 'white', fontWeight: 'bold'}}>
                        Open to your convenience
                    </Typography>
                    <Typography variant="h5" style={{color: 'white', fontWeight: '50', marginTop: 10}}>
                        Easily find destinations in your neighbourhood
                    </Typography>
                    <Grid item lg={6} style={{marginTop: 50}}>
                        <Button className={classes.button} color="secondary"  onClick={() => history.push('/search')} variant="contained">Get started</Button>
                    </Grid>
                </Grid>
            </div>
        </Grid>

    )
}


export default Banner