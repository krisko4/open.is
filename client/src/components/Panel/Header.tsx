import { Avatar, Button, CardMedia, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FC } from 'react';
import { usePageContext } from "../../contexts/PageContext";
import HomeIcon from "@material-ui/icons/Home"
import { AccountCircle } from '@material-ui/icons';

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
        
        textAlign: 'end'
    },

}));

const Header: FC = () => {

    const classes = useStyles();
    const { setPanelOpen } = usePageContext()


    return (
        
         <AppBar position="static" elevation={0} style={{backgroundColor: 'transparent', paddingTop: 20, paddingBottom: 20}}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item className={classes.homeIcon}>
                        <IconButton onClick={() => setPanelOpen(false)} color="inherit">
                            <HomeIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar> 

    );
}

export default Header