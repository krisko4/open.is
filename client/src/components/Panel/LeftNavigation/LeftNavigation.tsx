import { CardMedia, ListItemIcon, ListSubheader } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from '@material-ui/icons/Add';
import CloudCircle from '@material-ui/icons/CloudCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { FC } from "react";
import Scrollbars from "react-custom-scrollbars";
import { ChosenOptions, usePanelContext } from "../../../contexts/PanelContexts/PanelContext";
import { MyPlaces } from './MyPlaces';
import { usePlacesSelector } from '../../../store/selectors/PlacesSelector'
import { useDispatch } from 'react-redux'
import { setSelectedOption } from '../../../store/actions/setSelectedOption'
import { PlaceProps } from "../../../contexts/PanelContexts/CurrentPlaceContext";

// interface Props {
//     setChosenPlace: React.Dispatch<React.SetStateAction<PlaceProps | null>>
// }

export const LeftNavigation: FC = () => {

    const places = usePlacesSelector()
    const dispatch = useDispatch()


    return (
        <Grid item lg={2} style={{ height: '100%' }}>
            <Scrollbars autoHide>
                <Grid container justify="center">
                    <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/logo.png`}
                        style={{ height: 190, width: 180 }}
                    />
                </Grid>
                <ListItem style={{ marginBottom: 20, }}>
                    <ListItemAvatar>
                        <Avatar alt={`${localStorage.getItem('fullName')}`} src={`${localStorage.getItem('img')}`} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${localStorage.getItem('fullName')}`}
                        secondary="Standard user"
                    />
                </ListItem>
                <List>
                    <ListSubheader disableSticky>Settings</ListSubheader>
                    <ListItem button onClick={() => dispatch(places.length === 0 ? setSelectedOption(ChosenOptions.NO_PLACES) : setSelectedOption(ChosenOptions.DASHBOARD))}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={() => dispatch(setSelectedOption(ChosenOptions.MY_ACCOUNT))}>
                        <ListItemIcon>
                            <SettingsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="My account" />
                    </ListItem>
                    <ListItem button onClick={() => dispatch(setSelectedOption(ChosenOptions.NEW_PLACE))}>
                        <ListItemIcon>
                            <AddIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="New place" />
                    </ListItem>
                    <ListItem button onClick={() => dispatch(setSelectedOption(ChosenOptions.NEW_BUSINESS_CHAIN))}>
                        <ListItemIcon>
                            <CloudCircle color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="New business chain" />
                    </ListItem>
                    <MyPlaces  />
                </List>
            </Scrollbars>
        </Grid >
    )
}