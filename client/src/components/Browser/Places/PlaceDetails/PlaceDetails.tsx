import { createStyles, Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { KeyboardReturn } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import MainContent from "./MainContent";
import { News } from "./News";
import OpeningHours from "./OpeningHours";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            // fontWeight: 'bold',
            color : '#fff'
        },

    }))

// const StyledTab = withStyles(() => ({
//     root: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// }))(props => <Tab disableRipple {...props} />);




interface Props{
    place: any,
    setPlaceCardClicked : React.Dispatch<React.SetStateAction<boolean>>
}

export const PlaceDetails : FC<Props> = ({place, setPlaceCardClicked}) => {

    const {setPopupOpen, setMapZoom} = useMapContext() 
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const handleChange = (event : React.ChangeEvent<{}>, newValue : number) => {
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
                        // className={classes.root}
                    >
                        {/* <StyledTab label="News"/> */}
                        {/* <StyledTab label="Opening hours"/> */}
                        {/* <StyledTab label="Opinions"/> */}
                        <Tab label="News" className={classes.root} disableRipple />
                        <Tab label="Opening hours" disableRipple className={classes.root} />
                        <Tab label="Opinions" disableRipple className={classes.root} />
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
