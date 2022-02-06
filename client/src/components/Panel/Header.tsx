import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ChosenOptions } from '../../contexts/PanelContexts/PanelContext';
import { setSelectedOption } from '../../store/actions/setSelectedOption';
import { usePlacesSelector } from '../../store/selectors/PlacesSelector';

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
    // const { setPanelOpen } = usePageContext()
    // const { places, setSelectedOption} = usePanelContext()
    
    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const history = useHistory()



    return (
        
         <AppBar position="static" elevation={0} style={{backgroundColor: '#18202b', paddingTop: 20, paddingRight: 40, paddingBottom: 20}}>
            <Toolbar>
                <Grid item container justify="flex-end"  alignItems="center">
                        <IconButton onClick={() => history.push('/')} color="inherit">
                            <HomeIcon />
                        </IconButton>
                        <IconButton onClick={() => dispatch(places.length === 0 ? setSelectedOption(ChosenOptions.NO_PLACES) : setSelectedOption(ChosenOptions.DASHBOARD))} color="inherit">
                            <DashboardIcon/>
                        </IconButton>
                        <IconButton onClick={() => dispatch(setSelectedOption(ChosenOptions.NEW_PLACE))} color="inherit">
                            <AddIcon />
                        </IconButton>
                </Grid>
            </Toolbar>
        </AppBar> 

    );
}

export default Header