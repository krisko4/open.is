import { Avatar, Button, CardMedia, IconButton, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FC } from 'react';
import { usePageContext } from "../../contexts/PageContext";
import HomeIcon from "@material-ui/icons/Home"
const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    homeIcon: {
        flexGrow: 1,
        textAlign: 'center'
    },
    profileIcon: {
        flexGrow: 1,
        textAlign: 'end'
    },

}));

const Header: FC = () => {

    const classes = useStyles();
    const { setPanelOpen } = usePageContext()


    return (
        <Grid container style={{ background: 'linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(24,131,217,1) 47%)' }}>
            <Grid item lg={2} style={{ marginBottom: 0 }}>
                <CardMedia
                    image={`${process.env.REACT_APP_BASE_URL}/images/Openis-logos_white.png`}
                    style={{ height: 220 }}
                />
                <ListItem style={{marginBottom: 20,}}>
                    <ListItemAvatar>
                        <Avatar alt={`${localStorage.getItem('fullName')}`} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{
                            style: {
                                color: 'white',

                            }
                        }}
                        secondaryTypographyProps={{
                            style: {
                                color: 'white'
                            }

                        }}
                        primary={`${localStorage.getItem('fullName')}`}
                        secondary="Standard user"
                    />
                </ListItem>
            </Grid>
            <Grid item lg={8} container alignItems="center" justify="center">
                <Grid item>
                    {/* <Button variant="contained" color="secondary">Hello</Button> */}
                    <IconButton onClick={() => setPanelOpen(false)} >
                        <HomeIcon style={{color: 'white'}} />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
        /* <AppBar position="static">
            <Toolbar>
                <Grid container alignItems="center">

                    <Grid item className={classes.title}>
                        <Typography variant="h6">
                            My places
                        </Typography>
                    </Grid>
                    <Grid item className={classes.homeIcon}>
                        <IconButton onClick={() => setPanelOpen(false)} color="inherit">
                            <HomeIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className={classes.profileIcon}>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar> */
        //</div>
    );
}

export default Header