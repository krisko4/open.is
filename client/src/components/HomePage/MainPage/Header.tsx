import { Grow, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import HomeIcon from '@material-ui/icons/Home';
import { useHistory, useLocation } from 'react-router-dom';
import { authAxios } from "../../../axios/axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import { usePageContext } from "../../../contexts/PageContext";
import { logout } from "../../../store/actions/logout";
import { setEmail } from "../../../store/actions/setEmail";
import { useAuthSelector } from "../../../store/selectors/AuthSelector";
import { useLoginContext } from "../../../contexts/LoginContext";
import { SignOutButton } from "../../reusable/SignOutButton";
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            fontFamily: '-apple-system',
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
            backgroundColor: 'transparent',
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

const Header: FC = () => {

    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()
    const location = useLocation()


    const [appBarState, setAppBarState] = useState<AppBarStateTypes>({
        elevation: 0,
        buttonColor: 'secondary'
    })

    const { setLoginOpen } = useAuthContext()
    const {isUserLoggedIn, setUserLoggedIn, setEmail} = useLoginContext()
    const appBarRef = useRef<'transparentAppBar' | 'solidAppBar' | 'elevatedAppBar'>('transparentAppBar')


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
                <Grid item style={{flexGrow: 1}} />
                <Grid item lg={4}>
                    <Grow in={true} timeout={2000} >
                        <Toolbar>
                            {location.pathname === '/' ?
                                <Button onClick={() => history.push('/about')} variant="outlined"
                                    className="aboutButton">About us</Button> :
                                <Button startIcon={<HomeIcon />} onClick={() => history.push('/')} variant="outlined"
                                    className="aboutButton">Home</Button>

                            }
                            {location.pathname === '/contact' ?
                                <Button variant="text" className="contactButton" onClick={() => history.push('/about')}>About us</Button>
                                :
                                <Button variant="text" className="contactButton" onClick={() => history.push('/contact')}>Contact</Button>

                            }
                            {isUserLoggedIn ? <div>
                                {location.pathname === '/' &&
                                    <Button variant="contained" onClick={() => history.push('/panel')}
                                        color={appBarState.buttonColor} style={{ marginRight: 10 }}>My panel</Button>
                                }
                                <SignOutButton variant="contained" color={appBarState.buttonColor}>Sign out</SignOutButton>
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