import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import  { useContext, useEffect, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { useHistory } from 'react-router-dom';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSnackbar } from "notistack";
import { authAxios } from "../../../axios/axios";
import { useDispatch, } from "react-redux";
import { logout } from "../../../store/actions/logout";
import { login } from "../../../store/actions/login";
import { setEmail } from "../../../store/actions/setEmail";
import { PageContext } from "../../../contexts/PageContext";
import { UseAuthSelector } from "../../../store/selectors/AuthSelector"
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
            backgroundColor: 'white',
            transition: 'all .5s ease 0s',
        }
    }),
);

interface AppBarStateTypes {
    elevation: number,
    buttonColor: any
}

const Header = () => {

    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()


    const [appBarState, setAppBarState] = useState<AppBarStateTypes>({
        elevation: 0,
        buttonColor: 'secondary'
    })

    const { setLoginOpen } = useAuthContext()
    const { setPanelOpen } = useContext(PageContext)
    const isUserLoggedIn = UseAuthSelector()
    const dispatch = useDispatch()

    const appBarRef = useRef<'transparentAppBar' | 'solidAppBar' | 'elevatedAppBar'>('transparentAppBar')

    const signOut = async () => {
        await authAxios.get('/logout', { withCredentials: true })
        dispatch(logout())
        dispatch(setEmail(''))
        enqueueSnackbar('You have signed out.', {
            variant: 'success'
        })
    }


    useEffect(() => {
        const authenticate = async () => {
            try {
                await authAxios.get('/auth', { withCredentials: true })
                dispatch(login())
            } catch (err) {
                await authAxios.get('/logout', { withCredentials: true })
                dispatch(logout())
                dispatch(setEmail(''))
            }
        }
        authenticate()
    }, [])

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
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                        </Typography>
                        <Button onClick={() => history.push('/about')} variant="outlined"
                            style={{ marginRight: 10 }}>About us</Button>
                        <Button variant="text" style={{ marginRight: 10 }}>Contact</Button>
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
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header