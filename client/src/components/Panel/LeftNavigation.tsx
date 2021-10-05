import { CardMedia, Divider, ListItemIcon, ListSubheader, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Drawer } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../contexts/PanelContext";
import Scrollbars from "react-custom-scrollbars";
const useStyles = makeStyles(() =>
({
    navigation: {
        background: 'white',

        // borderWidth: 1,


    }
})
)


export const LeftNavigation: FC = () => {

    const classes = useStyles()
    const { places, setSelectedOption, setPlaceIndex, setCurrentPlace } = usePanelContext()


    const choosePlace = (place: any, index: number) => {
        setPlaceIndex(index)
        setCurrentPlace(place)
        setSelectedOption(ChosenOptions.PLACE_MANAGEMENT)
    }

    return (
        <Grid item lg={2} style={{ height: '100%' }}>
            <Scrollbars autoHide>
                {/* <div style={{
                    background: 'linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(24,131,217,1) 47%)'
                }}> */}
                <Grid container justify="center">
                    <CardMedia
                        image={`${process.env.REACT_APP_BASE_URL}/images/logo.png`}
                        style={{ height: 190, width: 180 }}
                    />
                </Grid>
                <ListItem style={{ marginBottom: 20, }}>
                    <ListItemAvatar>
                        <Avatar alt={`${localStorage.getItem('fullName')}`} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        // primaryTypographyProps={{
                        //     style: {
                        //         color: 'white',

                        //     }
                        // }}
                        // secondaryTypographyProps={{
                        //     style: {
                        //         color: 'white'
                        //     }

                        // }}
                        primary={`${localStorage.getItem('fullName')}`}
                        secondary="Standard user"
                    />
                </ListItem>
                <List>
                    <ListSubheader disableSticky>Settings</ListSubheader>
                    <ListItem button onClick={() => places.length === 0 ? setSelectedOption(ChosenOptions.NO_PLACES) : setSelectedOption(ChosenOptions.DASHBOARD)}>
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="My account" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption(ChosenOptions.NEW_PLACE)}>
                        <ListItemIcon>
                            <AddIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText secondary="New place" />
                    </ListItem>

                    {places.length > 0 && <ListSubheader disableSticky>
                        My places
                    </ListSubheader>}
                    {places.map((place: any, index: number) =>
                        <ListItem key={index} button onClick={() => choosePlace(place, index)}>
                            <ListItemAvatar>
                                <Avatar alt={place.name} src={place.img} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={place.name}
                                secondary={place.subtitle}
                            />
                        </ListItem>
                    )}
                </List>
            </Scrollbars>
        </Grid >
    )
}