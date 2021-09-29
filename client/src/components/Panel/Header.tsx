import { Avatar, Button, CardMedia, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { FC } from 'react';
import { usePageContext } from "../../contexts/PageContext";
import HomeIcon from "@material-ui/icons/Home"
import SettingsIcon from "@material-ui/icons/Settings"
import DashboardIcon from "@material-ui/icons/Dashboard"
import AddIcon from "@material-ui/icons/Add"
import { AccountCircle } from '@material-ui/icons';
import { ChosenOptions, usePanelContext } from '../../contexts/PanelContext';

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
    const { places, setSelectedOption, setPlaceIndex, setCurrentPlace } = usePanelContext()


    return (
        
         <AppBar position="static" elevation={0} style={{backgroundColor: 'transparent', paddingTop: 20, paddingRight: 40, paddingBottom: 20}}>
            <Toolbar>
                <Grid item container justify="flex-end"  alignItems="center">
                        <IconButton onClick={() => setPanelOpen(false)} color="inherit">
                            <HomeIcon />
                        </IconButton>
                        <IconButton onClick={() => places.length === 0 ? setSelectedOption(ChosenOptions.NO_PLACES) : setSelectedOption(ChosenOptions.DASHBOARD)} color="inherit">
                            <DashboardIcon/>
                        </IconButton>
                        <IconButton onClick={() => setSelectedOption(ChosenOptions.NEW_PLACE)} color="inherit">
                            <AddIcon />
                        </IconButton>
                </Grid>
            </Toolbar>
        </AppBar> 

    );
}

export default Header