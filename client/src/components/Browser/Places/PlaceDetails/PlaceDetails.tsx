import { createStyles, Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { KeyboardReturn } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { News } from "../../../reusable/News";
import OpeningHours from "../../../reusable/OpeningHours";
import MainContent from "./MainContent";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            // fontWeight: 'bold',
            color: '#fff'
        },

    }))

const useNewsStyles = makeStyles({
    paper: {
        padding: '6px 16px',
        borderRadius: 10,
        background: '#2C2C2C',
    },
    title: {
        color: 'white'
    },
    content: {
        color: 'grey'
    },
    date: {
        color: 'grey'
    },
    dialog: {
        background: '#2C2C2C'
    }

});

const useOpeningHoursStyles = makeStyles({
    container: {
        background: '#2C2C2C',
        borderRadius: 10
    },
    title: {
        textAlign: 'center',
        color: 'white'
    },
    divider: {
        marginTop: 10,
        background: '#2196f3',
        marginBottom: 10
    },
    days: {
        color: 'white'
    },
    hours: {
        color: 'white'
    }


})

const news = [
    {
        title: 'newsTitle',
        date: 'date',
        content: 'contentcontentcontent contentcontentcontentcontentcontentcontentcontentcontentcontentcontent'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
    {
        title: 'newsTitle',
        date: 'date',
        content: 'content'
    },
]
interface Props {
    place: any,
    setPlaceCardClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const PlaceDetails: FC<Props> = ({ place, setPlaceCardClicked }) => {

    const { setPopupOpen, setMapZoom } = useMapContext()

    const classes = useStyles()
    const newsClasses = useNewsStyles()
    const openingHoursClasses = useOpeningHoursStyles()

    const [value, setValue] = useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const tabContents = [
        <News news={news} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} place={place} />
    ]

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple className={classes.root} />
    }

    return (
        <Scrollbars>
            <Grid container>
                <Grid item>
                    <IconButton onClick={() => { setPlaceCardClicked(false); setMapZoom(10); setPopupOpen(false) }} color="secondary">
                        <KeyboardReturn />
                    </IconButton>
                </Grid>
                <MainContent place={place} />
                <Grid container item lg={12} style={{ marginTop: 10 }}>
                    <Divider style={{ width: '100%', backgroundColor: 'red' }} />
                    <Paper square style={{ width: '100%', background: 'inherit' }}>
                        <Tabs
                            value={value}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            onChange={handleChange}
                        >
                            <MyTab label="News" />
                            <MyTab label="Opening hours" />
                            <MyTab label="Opinions" />
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
