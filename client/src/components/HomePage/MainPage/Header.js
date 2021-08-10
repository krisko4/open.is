import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useContext, useEffect, useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import {Auth} from "../../Auth/Auth";
import {AuthContext} from "../../../contexts/AuthContext";
import {useSnackbar} from "notistack";
import {authAxios} from "../../../axios/axios";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/actions/logout";
import {login} from "../../../store/actions/login";
import {setEmail} from "../../../store/actions/setEmail";
import {PageContext} from "../../../contexts/PageContext";

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
        elevatedAppBar: {
            transition: 'all .5s ease 0s',
            backgroundColor: 'transparent'
        },
        transparentAppBar: {
            transition: 'all .5s ease 0s',
            backgroundColor: 'transparent',
            paddingTop: 20
        },
        solidAppBar: {
            backgroundColor: 'primary',
            // transition: 'all .5s ease 0s',
        }
    }),
);


const Header = () => {

    const {enqueueSnackbar} = useSnackbar()
    const history = useHistory()

    const [appBar, setAppBar] = useState('transparentAppBar')
    const [elevation, setElevation] = useState(0)
    const [buttonColor, setButtonColor] = useState('secondary')

    const {setLoginOpen} = useContext(AuthContext)
    const {setPanelOpen} = useContext(PageContext)

    let isUserLoggedIn = useSelector(state => state['isUserLoggedIn'])
    const dispatch = useDispatch()

    const appBarRef = useRef()
    appBarRef.current = appBar

    const signOut = async () => {
        await authAxios.get('/logout', {withCredentials: true})
        dispatch(logout())
        dispatch(setEmail(''))
        enqueueSnackbar('You have signed out.', {
            variant: 'success'
        })
    }


    useEffect(() => {
        authAxios.get('/auth', {withCredentials: true})
            .then(() => dispatch(login()))
            .catch(() => dispatch(logout()))
    }, [])

    const handleScroll = () => {
        const isSolid = window.scrollY > 800
        const isElevated = window.scrollY > 300
        setButtonColor('secondary')
        if (isSolid) {
            setAppBar('solidAppBar')
            setButtonColor('primary')
            return
        }
        if (isElevated) {
            setElevation(10)
            setAppBar('elevatedAppBar')
            return
        }
        setElevation(0)
        setAppBar('transparentAppBar')
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
                        <Button size="large" onClick={() => history.push('/about')} variant="text"
                                style={{marginRight: 10, color: 'white'}}>About us</Button>
                        <Button size="large" variant="text" style={{marginRight: 10, color: 'white'}}>Contact</Button>
                        {isUserLoggedIn ? <div>
                            <Button size="large" variant="contained" onClick={() => setPanelOpen(true)}
                                    color={buttonColor} style={{marginRight: 10}}>My panel</Button>
                            <Button variant="contained" size="large" onClick={() => signOut()} color={buttonColor}>Sign
                                out</Button>
                        </div> : <div>
                            <Button variant="contained" size="large" onClick={() => setLoginOpen(true)}
                                    color={buttonColor}>Sign
                                in</Button>
                            <Auth/>
                        </div>
                        }
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header