import Grid from "@material-ui/core/Grid";
import {createStyles, Divider, makeStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import React, {useContext, useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {KeyboardReturn} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import OpeningHours from "./OpeningHours";
import MainContent from "./MainContent";
import {Scrollbars} from 'react-custom-scrollbars';
import {News} from "./News";
import {MapContext} from "../../../../contexts/MapContext";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            fontWeight: 'bold'
        },

    }))

const StyledTab = withStyles(() => ({
    root: {
        color: '#fff',
        fontWeight: 'bold',
    },
}))((props) => <Tab disableRipple {...props} />);



const PlaceDetails = ({place, setPlaceCardClicked}) => {

    const {setPopupOpen, setMapZoom} = useContext(MapContext)
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabContents = [
        <News/>,
        <OpeningHours place={place}/>
    ]



    return (
        <Scrollbars>
        <Grid container>
            <Grid item>
                <IconButton  onClick={() => {setPlaceCardClicked(false); setMapZoom(10); setPopupOpen(false)}} color="secondary">
                    <KeyboardReturn/>
                </IconButton>
            </Grid>
           <MainContent place={place}/>
            <Grid container item lg={12} style={{marginTop: 10}}>
                <Divider style={{width: '100%', backgroundColor: 'red'}}/>
                <Paper square style={{width: '100%', background: 'inherit'}}>
                    <Tabs
                        value={value}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleChange}
                        className={classes.root}
                    >
                        <StyledTab label="News"/>
                        <StyledTab label="Opening hours"/>
                        <StyledTab label="Opinions"/>
                    </Tabs>
                </Paper>
                <Grid container item>
                    {tabContents[value]}
                </Grid>
            </Grid>
        </Grid>
        </Scrollbars>
    )
}

export default PlaceDetails