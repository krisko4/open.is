import AddIcon from "@mui/icons-material/Add";
import CloudCircle from '@mui/icons-material/CloudCircle';
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { Tooltip, IconButton, Slide } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from "@mui/material/Grid";
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
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
                        <Tooltip title="Home">
                            <IconButton onClick={() => history.push('/')} color="inherit" size="large">
                                <HomeIcon />
                            </IconButton>

                        </Tooltip>
                        <Tooltip title="Dashboard">
                            <IconButton
                                onClick={() => history.push(`${match.url}/dashboard`)}
                                color="inherit"
                                size="large">
                                <DashboardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New place">
                            <IconButton
                                onClick={() => history.push(`${match.url}/new-place`)}
                                color="inherit"
                                size="large">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New business chain">
                            <IconButton
                                onClick={() => history.push(`${match.url}/new-business-chain`)}
                                color="inherit"
                                size="large">
                                <CloudCircle />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Toolbar>
            </AppBar>

        </Slide>
    );
}

export default Header