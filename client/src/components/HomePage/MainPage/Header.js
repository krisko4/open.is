import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import GoogleLogin from "react-google-login";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            fontFamily: '-apple-system',
        },
        title: {
            flexGrow: 1,
            color: 'white'
        },
        transparentAppBar: {
            backgroundColor: 'transparent',
        },
        solidAppBar: {
            backgroundColor: 'primary',
        }
    }),
);


const Header = () => {

    const history = useHistory()

    const responseGoogle = (response) => {
        console.log(response);
    }

    const [appBar, setAppBar] = useState('transparentAppBar')
    const [elevation, setElevation] = useState(0)
    const appBarRef = useRef()
    appBarRef.current = appBar
    const handleScroll = () => {
        const isSolid = window.scrollY > 980
        const isElevated = window.scrollY > 200
        isElevated ? setElevation(10) : setElevation(0)
        isSolid ? setAppBar('solidAppBar') : setAppBar('transparentAppBar')
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const classes = useStyles();
    return (
        <AppBar elevation={elevation} className={classes[appBarRef.current]}>
            <Grid container justify="center">
                <Grid item xs={12} lg={6}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                        </Typography>
                        <Button size="large" onClick={() => history.push('/about')} variant="text" style={{marginRight: 10, color: 'white'}}>About us</Button>
                        <Button size="large" variant="text" style={{marginRight: 10, color: 'white'}}>Contact</Button>
                        <GoogleLogin
                            clientId="882076934469-3dhijrs8140lsll6eu7lh0tdhb9p1qju.apps.googleusercontent.com"
                            buttonText="Sign in"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />,
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header