import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Switch } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from "@mui/material/Grid";
import Toolbar from '@mui/material/Toolbar';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useColorMode } from "../../contexts/ColorModeContext";
import { ChosenOptions } from '../../contexts/PanelContexts/PanelContext';
import { setSelectedOption } from '../../store/actions/setSelectedOption';
import { usePlacesSelector } from '../../store/selectors/PlacesSelector';


const Header: FC = () => {

    // const { setPanelOpen } = usePageContext()
    // const { places, setSelectedOption} = usePanelContext()

    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const history = useHistory()
    const { toggleColorMode } = useColorMode()
    const [checked, setChecked] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleColorMode()
        setChecked(event.target.checked)
    }



    return (
        <AppBar position="static" sx={{ pt: '20px', pr: '40px' }}>
            <Toolbar>
                <Grid item container justifyContent="flex-end" alignItems="center">
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                   
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