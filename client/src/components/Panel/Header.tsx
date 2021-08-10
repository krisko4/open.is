import React, {FC, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from "@material-ui/core/Grid";
import {PageContext} from "../../contexts/PageContext";

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
    }
}));

const Header:FC = () => {

    const classes = useStyles();
    const {setPanelOpen} = useContext(PageContext)

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item className={classes.title}>
                            <Typography variant="h6">
                                My places
                            </Typography>
                        </Grid>
                        <Grid item className={classes.homeIcon}>
                            <IconButton onClick={() => setPanelOpen(false)}  color="inherit">
                                <HomeIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item className={classes.profileIcon}>
                            <IconButton color="inherit">
                                <AccountCircle/>
                            </IconButton>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header