import { Grow } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { authAxios } from "../../../axios/axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { usePageContext } from "../../../contexts/PageContext";
import { login } from "../../../store/actions/login";
import { logout } from "../../../store/actions/logout";
import { setEmail } from "../../../store/actions/setEmail";
import { useAuthSelector } from "../../../store/selectors/AuthSelector";
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
            backgroundColor: 'transparent',
            '& .aboutButton': {
                marginRight: 10,
                color: 'white',
                borderColor: 'white'
            },
            '& .contactButton': {
                marginRight: 10,
                color: 'white'
            }
        },
        transparentAppBar: {
            transition: 'all .5s ease 0s',
            backgroundColor: 'transparent',
            paddingTop: 20,
            '& .aboutButton': {
                marginRight: 10,
                color: 'white',
                borderColor: 'white'
            },
            '& .contactButton': {
                marginRight: 10,
                color: 'white'
            }
        },
        solidAppBar: {
            backgroundColor: 'white',
            transition: 'all .5s ease 0s',
            '& .aboutButton': {
                color: '#2196f3',
                marginRight: 10,
                borderColor: '#2196f3'
            },
            '& .contactButton': {
                marginRight: 10,
                color: '#2196f3'
            }
        }
    }),
);

interface AppBarStateTypes {
    elevation: number,
    buttonColor: any
}

const Header : FC = () => {

    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()


    const [appBarState, setAppBarState] = useState<AppBarStateTypes>({
        elevation: 0,
        buttonColor: 'secondary'
    })

    const { setLoginOpen } = useAuthContext()
    const { setPanelOpen } = usePageContext()
    const isUserLoggedIn = useAuthSelector()
    const dispatch = useDispatch()

    const appBarRef = useRef<'transparentAppBar' | 'solidAppBar' | 'elevatedAppBar'>('transparentAppBar')

    const signOut = async () => {
        await authAxios.get('/logout', { withCredentials: true })
        dispatch(logout())
        dispatch(setEmail(''))
        localStorage.removeItem('uid')
        enqueueSnackbar('You have signed out.', {
            variant: 'success'
        })
    }


    // useEffect(() => {
    //     const authenticate = async () => {
    //         try {
    //             await authAxios.get('/auth', { withCredentials: true })
    //             dispatch(login())
    //         } catch (err) {
    //             await authAxios.get('/logout', { withCredentials: true })
    //             dispatch(logout())
    //             dispatch(setEmail(''))
    //         }
    //     }
    //     authenticate()
    // }, [])

    const handleScroll = () => {
        const isSolid = window.scrollY > 800
        const isElevated = window.scrollY > 300
        if (isSolid) {
            appBarRef.current = 'solidAppBar'
            setAppBarState({ elevation: 10, buttonColor: 'primary' })
            return
        }
        if (isElevated) {
            appBarRef.current = 'elevatedAppBar'
            setAppBarState({ elevation: 10, buttonColor: 'secondary' })
            return
        }
        appBarRef.current = 'transparentAppBar'
        setAppBarState({ elevation: 0, buttonColor: 'secondary' })
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const classes = useStyles();
    return (

        <AppBar elevation={appBarState.elevation} className={classes[appBarRef.current]}>
            <Grid container justify="center">
                <Grid item xs={12} lg={6}>
                    <Grow in={true} timeout={2000} >
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                            </Typography>
                            <Button onClick={() => history.push('/about')} variant="outlined"
                                className="aboutButton">About us</Button>
                            <Button variant="text" className="contactButton">Contact</Button>
                            {isUserLoggedIn ? <div>
                                <Button variant="contained" onClick={() => setPanelOpen(true)}
                                    color={appBarState.buttonColor} style={{ marginRight: 10 }}>My panel</Button>
                            <Button variant="contained" onClick={() => signOut()} color={appBarState.buttonColor}>Sign
                                out</Button>
                            </div> :
                                <Button variant="contained" onClick={() => setLoginOpen(true)}
                                    color={appBarState.buttonColor}>Sign
                                    in</Button>

                            }
                        </Toolbar>

                    </Grow>
                </Grid>
            </Grid>
        </AppBar>

    )
}

export default Header