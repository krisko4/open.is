import { CardMedia, Divider, ListItemIcon, ListSubheader, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { FC } from "react";
import { ChosenOptions, usePanelContext } from "../../contexts/PanelContext";
const useStyles = makeStyles(() =>
({
    navigation: {
        background: 'white',
        paddingLeft: 15
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
        <Grid item className={classes.navigation} lg={2} style={{background: '#F5F5F5'}}>
            {/* <CardMedia
                image={`${process.env.REACT_APP_BASE_URL}/images/Openis-logos_black.png`}
                style={{height: 200}}
                 /> */}
            <List>
                {/* <ListItem>
                    <ListItemAvatar>
                        <Avatar alt={`${localStorage.getItem('fullName')}`} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${localStorage.getItem('fullName')}`}
                        secondary="Standard user"
                    />
                </ListItem> */}
                {/* <Divider style={{ flexGrow: 1 }} /> */}
                <ListSubheader disableSticky>
                    My places
                </ListSubheader>
                {places.map((place: any, index: number) =>
                    <ListItem key={index} button onClick={() => choosePlace(place, index)}>
                        <ListItemAvatar>
                            <Avatar alt={place.name} src={`${place.img}`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={place.name}
                            secondary={place.subtitle}
                        />
                    </ListItem>
                )}
                <ListItem button onClick={() => setSelectedOption(ChosenOptions.NEW_PLACE)}>
                    <ListItemIcon>
                        <AddIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText secondary="New place" />
                </ListItem>
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
            </List>
        </Grid >
    )
}