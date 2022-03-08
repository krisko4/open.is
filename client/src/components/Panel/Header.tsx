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
import { usePlacesSelector } from "redux-toolkit/slices/placesSlice";
import { ColorModeSwitch } from "../reusable/ColorModeSwitch";
import { useNavigate } from 'react-router-dom'


const Header: FC = () => {

    // const { setPanelOpen } = usePageContext()
    // const { places, setSelectedOption} = usePanelContext()

    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const navigate = useNavigate()



    return (
        <Slide in={true} timeout={500}>
            <AppBar position="static" sx={{ pt: 1, pb: 1, pr: '40px' }}>
                <Toolbar>
                    <Grid item container justifyContent="flex-end" alignItems="center">
                        <ColorModeSwitch />
                        <Tooltip title="Home">
                            <IconButton onClick={() => navigate('/')} color="inherit" size="large">
                                <HomeIcon />
                            </IconButton>

                        </Tooltip>
                        <Tooltip title="Dashboard">
                            <IconButton
                                onClick={() => navigate(``)}
                                color="inherit"
                                size="large">
                                <DashboardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New place">
                            <IconButton
                                onClick={() => navigate(`new-place`)}
                                color="inherit"
                                size="large">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New business chain">
                            <IconButton
                                onClick={() => navigate(`new-business-chain`)}
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