import { Button, CardMedia, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { FC } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import {Parallax} from "react-parallax"


const useStyles = makeStyles({
    background: {
        height: 1000,
        position: 'relative',
        overflow: 'hidden',
        '&&::before': {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1)), url(${process.env.REACT_APP_BASE_URL}/images/background.jpg)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            content: '""',
            height: '100%',
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100%',
            willChange: 'transform',
            zIndex: -1
        }
    }
})


const Section2: FC = () => {

    const classes = useStyles()

    const { setLoginOpen } = useAuthContext()
    return (
        <Grid item xs={12} >
            {/* <CardMedia style={{ width: '100%', height: '100%' }} image={`${process.env.REACT_APP_BASE_URL}/images/img.jpg`}> */}
                <Parallax

                    bgImage={`${process.env.REACT_APP_BASE_URL}/images/img.jpg`}
                  
                     strength={-400}
                   // strength={-400}
                    renderLayer={() => (
                        <div
                            style={{
                                position: 'absolute',
                                background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3))`,
                                width: '100%',
                                height: '100%'

                            }}
                        />
                    )}
                >
                <Grid container style={{ height: 800 }} alignItems="center" direction="column" justify="center">
                    <Typography variant="h2" style={{ color: 'white' }}>Spread your wings.</Typography>
                    <Typography variant="h6" style={{ color: 'white' }}>Let us take care of your development</Typography>
                    <Button variant="outlined" size="large" onClick={() => setLoginOpen(true)} style={{ color: 'white', borderColor: 'white', marginTop: 10 }}>Join us</Button>
                </Grid>
            </Parallax>
        </Grid>
    )
}

export default Section2
