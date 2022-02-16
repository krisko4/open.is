import { Paper, Avatar, CardMedia, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloudCircle from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { FC } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from "react-router-dom";
import { useLoginContext } from "../../../contexts/LoginContext";
import { RawPlaceDataProps } from "../../../contexts/PanelContexts/BusinessChainContext";
import { usePlacesSelector } from '../../../store/selectors/PlacesSelector';
import { MyBusinessChains } from './MyBusinessChains/MyBusinessChains';
import { MyPlaces } from './MyPlaces';


const generateNavigationButtons = (places: RawPlaceDataProps[]) => [
    {
        name: 'Dashboard',
        icon: <DashboardIcon color="primary" />,
        url: places.length > 0 ? `/dashboard` : ''
    },
    {
        name: 'My account',
        icon: <SettingsIcon color="primary" />,
        url: `/account`

    },
    {
        name: 'New place',
        icon: <AddIcon color="primary" />,
        url: `/new-place`
    },
    {
        name: 'New business chain',
        icon: <CloudCircle color="primary" />,
        url: `/new-business-chain`
    }
]

export const LeftNavigation: FC = () => {

    const places = usePlacesSelector()
    const dispatch = useDispatch()
    const history = useHistory()
    const match = useRouteMatch()
    const { userData } = useLoginContext()

    return (
        <Grid
            item
            lg={2}
        // sx={{
        //     backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
        // }}
        >
            <Paper sx={{height: '100%'}}>
                <Scrollbars autoHide>
                    <Grid container justifyContent="center">
                        <CardMedia
                            image={`${process.env.REACT_APP_BASE_URL}/images/logo.png`}
                            style={{ height: 190, width: 180 }}
                        />
                    </Grid>
                    <ListItem style={{ marginBottom: 20, }}>
                        <ListItemAvatar>
                            <Avatar alt={userData.fullName} src={userData.img as string} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={userData.fullName}
                            secondary="Standard user"
                        />
                    </ListItem>
                    <List>
                        <ListSubheader disableSticky>Settings</ListSubheader>
                        {
                            generateNavigationButtons(places).map((button, index) =>
                                <ListItem
                                    key={index}
                                    button
                                    onClick={() => history.push(`${match.url}${button.url}`)}
                                >
                                    <ListItemIcon>
                                        {button.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={button.name}>
                                    </ListItemText>

                                </ListItem>
                            )
                        }
                        <MyPlaces />
                        <MyBusinessChains />
                    </List>
                </Scrollbars>
            </Paper>
        </Grid >
    )
}