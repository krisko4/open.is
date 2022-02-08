import { Collapse, Fade, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
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
    banner: {
        height: 1200,
            backgroundPosition: 'center',
            backgroundImage: props => `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, ${props.gradient2})), url(https://images.unsplash.com/photo-1437196582938-795c4854b3da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
    }
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
                <Grid item container lg={8} justifyContent="center">
                    <Grid item lg={7} md={7} sm={7} style={{ textAlign: 'center', marginBottom: 200 }}>
                        <Collapse in={window.scrollY < 150} timeout={1500}>
                            <Typography variant="h3" style={{ fontWeight: 200 }}>
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
    );
}

