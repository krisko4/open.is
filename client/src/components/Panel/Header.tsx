import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Slide } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from "@mui/material/Grid";
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { usePlacesSelector } from '../../store/selectors/PlacesSelector';
import { ColorModeSwitch } from "../reusable/ColorModeSwitch";


const Header: FC = () => {

    // const { setPanelOpen } = usePageContext()
    // const { places, setSelectedOption} = usePanelContext()

    let match = useRouteMatch();
    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const history = useHistory()



    return (
        <Slide in={true} timeout={500}>
            <AppBar position="static" sx={{ pt: 1, pb: 1, pr: '40px' }}>
                <Toolbar>
                    <Grid item container justifyContent="flex-end" alignItems="center">
                        <ColorModeSwitch />

                        <IconButton onClick={() => history.push('/')} color="inherit" size="large">
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => history.push(`${match.url}/dashboard`)}
                            color="inherit"
                            size="large">
                            <DashboardIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => history.push(`${match.url}/new-place`)}
                            color="inherit"
                            size="large">
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>

        </Slide>
    );
}

export default Header