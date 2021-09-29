import { createStyles, Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { KeyboardReturn } from "@material-ui/icons";
import React, { FC, useEffect, useState } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import myAxios from "../../../../axios/axios";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { useSelectedPlacesContext } from "../../../../contexts/SelectedPlacesContext";
import { News } from "../../../reusable/News";
import OpeningHours from "../../../reusable/OpeningHours";
import { Opinions } from "../../../reusable/Opinions";
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
        color: 'lightgrey'
    },
    date: {
        color: 'grey'
    },
    dialog: {
        background: '#2C2C2C',
        '& .dialogTitle': {
            color: '#2196f3'
        },
        '& .dialogContentText': {
            color: 'white'
        },
        '& .opinionArea': {
            background: '#404040',
            borderRadius: 5
        },
        '& .input': {
            color: 'white'
        }
    }

});

const useOpinionsStyles = makeStyles({
    opinionCard: {
        background: '#2C2C2C',
    },
    author: {
        color: '#2196f3'
    },
    date: {
        color: 'lightgrey'
    },
    content: {
        color: 'white'
    },
    dialog: {
        background: '#2C2C2C',
        '& .dialogTitle': {
            color: '#2196f3'
        },
        '& .dialogContentText': {
            color: 'white'
        },
        '& .opinionArea': {
            background: '#404040',
            borderRadius: 5
        },
        '& .input': {
            color: 'white'
        }
    }
})

const useOpeningHoursStyles = makeStyles({
    container: {
        background: '#2C2C2C',
        borderRadius: 10
    },
    content: {
        color: 'grey'
    },
    hourPicker: {
        color: 'white'
    },
    calendarIcon: {
        '& .MuiIconButton-root': {
            color: '#2196f3'
        }
    },
    inputLabel: {
        color: 'white'
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
        color: 'white',

    },
    hours: {
        color: 'white'
    },
    dialog: {
        background: '#2C2C2C',
        '& .dialogTitle': {
            color: '#2196f3'
        },
        '& .dialogContentText': {
            color: 'white'
        },
        '& .opinionArea': {
            background: '#404040',
            borderRadius: 5
        },
        '& .input': {
            color: 'white'
        }
    }


})

interface Props {
    currentPlace: any,
    setPlaceCardClicked: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentPlace: React.Dispatch<any>
}
interface NewsProps {
    title: string,
    date: string,
    content: string
}

interface OpinionProps {
    author: string,
    date: string,
    content: string,
    note: number,
    averageNote: number
}


export const PlaceDetails: FC<Props> = ({ currentPlace, setCurrentPlace, setPlaceCardClicked }) => {

    const { setPopupOpen, setPlaceCoords } = useMapContext()
    const [news, setNews] = useState<NewsProps[]>([])



    const [opinionCount, setOpinionCount] = useState(0)
    const [opinions, setOpinions] = useState<OpinionProps[]>([])

    useEffect(() => {
        console.log(currentPlace._id)
        myAxios.get('/news', {
            params: {
                placeId: currentPlace._id
            }
        }).then(res => {
            console.log(res)
            setNews(res.data)
        }).catch(err => console.log(err))
        myAxios.get('/opinions', {
            params: {
                placeId: currentPlace._id
            }
        }).then(res => {
            setOpinions(res.data)
            setOpinionCount(res.data.length)
        }).catch(err => console.log(err))

    }, [])


    const classes = useStyles()
    const newsClasses = useNewsStyles()
    const opinionsClasses = useOpinionsStyles()
    const openingHoursClasses = useOpeningHoursStyles()

    const [value, setValue] = useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const tabContents = [
        <News news={news} setNews={setNews} currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} />,
        <Opinions
            currentPlace={currentPlace}
            setCurrentPlace={setCurrentPlace}
            opinions={opinions}
            setOpinions={setOpinions}
            opinionCount={opinionCount}
            setOpinionCount={setOpinionCount}
            classes={opinionsClasses}
        />
    ]

    const closePlaceDetails = () => {
        setPlaceCardClicked(false)
        setPopupOpen(false)
        setPlaceCoords(currentCoords => {
            return { ...currentCoords, mapZoom: 10 }
        })
    }

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple className={classes.root} />
    }

    return (

        <Grid container>
            <IconButton onClick={() => closePlaceDetails()} color="secondary">
                <KeyboardReturn />
            </IconButton>
            <MainContent place={currentPlace} />
            <Grid container style={{ marginTop: 10 }}>
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
                    <Grid container style={{ height: 400 }}>
                        {tabContents[value]}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
