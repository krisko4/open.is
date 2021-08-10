import Grid from "@material-ui/core/Grid";
import React, {FC} from "react";
import {Divider, ListSubheader, makeStyles} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";



const useStyles = makeStyles(() =>
    ({
        navigation: {
            background: 'white',
            borderRightStyle: 'solid',
            borderWidth: 1,
            borderColor: 'lightgrey'
        }
    })
)


export const LeftNavigation: FC = () => {

    const classes = useStyles()

    return (
        <Grid item className={classes.navigation} lg={2}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Roman Pietrkowski"
                        secondary="fajny ziomal"
                    />
                </ListItem>
                <Divider style={{width: '100%'}}/>
                <ListSubheader>
                    My places
                </ListSubheader>
                <ListItem button>
                    Item 1
                </ListItem>
                <ListItem>
                    Item 2
                </ListItem>
            </List>
        </Grid>
    )
}