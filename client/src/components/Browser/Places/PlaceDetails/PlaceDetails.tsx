import { Button, createStyles, Dialog, Divider, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { KeyboardReturn } from "@material-ui/icons";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import myAxios from "../../../../axios/axios";
import { useLoginContext } from "../../../../contexts/LoginContext";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { News } from "../../../reusable/News";
import { OpeningHours } from "../../../reusable/OpeningHours/OpeningHours";
import { Opinions } from "../../../reusable/Opinions";
import { ImagesCarousel } from './ImagesCarousel';
import MainContent from "./MainContent";
import {SubscribeDialog} from './SubscribeDialog'


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            // fontWeight: 'bold',
            color: '#fff'
        },
        subscribeButton: {
            '&&.MuiButton-contained.Mui-disabled': {
                backgroundColor: 'lightgray'
            }
        }



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



const addVisit = async (place: CurrentPlaceProps) => {
    try {
        const response = await myAxios.post('/visits', {
            date: new Date(),
            placeId: place._id
        })
        return response.data
    } catch (err) {
        console.log(err)
    }

}

interface Props {
    currentPlace: any,
    popupIndex: number

}



export const PlaceDetails: FC<Props> = ({ currentPlace, popupIndex }) => {
    const { setPopupOpen, setPlaceCoords, setCurrentPlace, setPlaceCardClicked, setPopupIndex } = useMapContext()
    const [opinionCount, setOpinionCount] = useState(0)
    const { isUserLoggedIn } = useLoginContext()
    const [isDialogOpen, setDialogOpen] = useState(false)


    useEffect(() => {
        setPlaceCardClicked(true)
        addVisit(currentPlace)
        setPopupOpen(true)
        setPopupIndex(popupIndex)
        setPlaceCoords({
            lat: currentPlace.lat,
            lng: currentPlace.lng,
            mapZoom: 18
        })
    }, [])


    const classes = useStyles()
    const newsClasses = useNewsStyles()
    const opinionsClasses = useOpinionsStyles()
    const openingHoursClasses = useOpeningHoursStyles()

    const history = useHistory()
    const [value, setValue] = useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const tabContents = [
        <News currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} />,
        <Opinions
            currentPlace={currentPlace}
            setCurrentPlace={setCurrentPlace}
            opinionCount={opinionCount}
            setOpinionCount={setOpinionCount}
            classes={opinionsClasses}
        />
    ]

    const closePlaceDetails = () => {
        history.push(`/search`)
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
                <SubscribeDialog isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
            <Grid container item style={{ background: '#2C2C2C' }}>
                <Toolbar style={{ flexGrow: 1 }} disableGutters>
                    <IconButton onClick={() => closePlaceDetails()} color="secondary">
                        <KeyboardReturn />
                    </IconButton>
                    <Grid container justify="flex-end" style={{ paddingRight: 20 }} item>
                        <Tooltip title={!isUserLoggedIn ? 'Sign in to subscribe' : currentPlace.isUserOwner ? 'You cannot subscribe to your own place' : 'Subscribe'}>
                            <span>
                                <Button
                                    className={classes.subscribeButton}
                                    disabled={!isUserLoggedIn || currentPlace.isUserOwner}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setDialogOpen(true)}
                                >
                                    Subscribe
                                </Button>
                            </span>
                        </Tooltip>
                    </Grid>
                </Toolbar>
            </Grid>
            <Grid container>
                <ImagesCarousel address={currentPlace.address} img={currentPlace.img} />
            </Grid>
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
                    <Grid container style={{ height: 500 }}>
                        {tabContents[value]}
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}
