import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from "@mui/material/Grid";
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ChosenOptions } from '../../contexts/PanelContexts/PanelContext';
import { setSelectedOption } from '../../store/actions/setSelectedOption';
import { usePlacesSelector } from '../../store/selectors/PlacesSelector';


const Header: FC = () => {

    // const { setPanelOpen } = usePageContext()
    // const { places, setSelectedOption} = usePanelContext()

    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const history = useHistory()



    return (
        <AppBar position="static" elevation={0} style={{ backgroundColor: '#18202b', paddingTop: 20, paddingRight: 40, paddingBottom: 20 }}>
            <Toolbar>
                <Grid item container justifyContent="flex-end" alignItems="center">
                    <IconButton onClick={() => history.push('/')} color="inherit" size="large">
                        <HomeIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => dispatch(places.length === 0 ? setSelectedOption(ChosenOptions.NO_PLACES) : setSelectedOption(ChosenOptions.DASHBOARD))}
                        color="inherit"
                        size="large">
                        <DashboardIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => dispatch(setSelectedOption(ChosenOptions.NEW_PLACE))}
                        color="inherit"
                        size="large">
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header