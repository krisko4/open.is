import { KeyboardReturn } from "@mui/icons-material";
import { Button, Divider, Toolbar, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "../../../../contexts/LoginContext";
import { useMapContext } from "../../../../contexts/MapContext/MapContext";
import { CurrentPlaceProps } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { removeSubscription } from "../../../../requests/SubscriptionRequests";
import { addNewVisit } from "../../../../requests/VisitRequests";
import { useCustomSnackbar } from "../../../../utils/snackbars";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { News } from "../../../reusable/News";
import { OpeningHours } from "../../../reusable/OpeningHours/OpeningHours";
import { Opinions } from "../../../reusable/Opinions/Opinions";
import { ImagesCarousel } from './ImageCarousel/ImagesCarousel';
import MainContent from "./MainContent";
import { SubscribeDialog } from './SubscribeDialog';

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
        const response = await addNewVisit(place._id as string)
        return response.data
    } catch (err) {
        console.log(err)
    }

}

interface Props {
    currentPlace: CurrentPlaceProps,
    popupIndex: number

}



export const PlaceDetails: FC<Props> = ({ currentPlace, popupIndex }) => {

    const { setPopupOpen, setPlaceCoords, setCurrentPlace, setPlaceCardClicked, setPopupIndex } = useMapContext()
    const { userData } = useLoginContext()
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false)
    const { enqueueInfoSnackbar, enqueueSuccessSnackbar, enqueueErrorSnackbar } = useCustomSnackbar()


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
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const MyTab = (props: any) => {
        const { label, ...rest } = props
        return <Tab {...rest} label={label} disableRipple className={classes.root} />
    }
    const tabContents = [
        <News currentPlace={currentPlace} setCurrentPlace={setCurrentPlace} classes={newsClasses} />,
        <OpeningHours classes={openingHoursClasses} setCurrentPlace={setCurrentPlace} currentPlace={currentPlace} />,
        <Opinions
            currentPlace={currentPlace}
            setCurrentPlace={setCurrentPlace}
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


    const unsubscribe = async () => {
        setLoading(true)
        try {
            const res = await removeSubscription(currentPlace._id as string)
            enqueueInfoSnackbar('You have cancelled your subscription')
            const newCurrentPlace = { ...currentPlace }
            newCurrentPlace.isUserSubscriber = false
            setCurrentPlace(newCurrentPlace)
            console.log(res.data)
        } catch (err) {
            enqueueErrorSnackbar()
        } finally {
            setLoading(false)
        }

    }


    return (
        <Grid container>
            <SubscribeDialog currentPlace={currentPlace} isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} />
            <Grid container item style={{ background: '#2C2C2C' }}>
                <Toolbar style={{ flexGrow: 1 }} disableGutters>
                    <IconButton onClick={() => closePlaceDetails()} color="error" size="large">
                        <KeyboardReturn />
                    </IconButton>
                    <Grid container justifyContent="flex-end" style={{ paddingRight: 20 }} item>
                        {currentPlace.isUserSubscriber ?
                            <Tooltip title={'Unsubscribe'} arrow >
                                <span>
                                    <LoadingButton
                                        loading={loading}
                                        color="primary"
                                        onClick={() => unsubscribe()}
                                    >
                                        Subscribed
                                    </LoadingButton>
                                </span>
                            </Tooltip>
                            :
                            <Tooltip title={!userData.isLoggedIn ? 'Sign in to subscribe' : currentPlace.isUserOwner ? 'You cannot subscribe to your own place' : 'Subscribe'}>
                                <span>
                                    <Button
                                        className={classes.subscribeButton}
                                        disabled={!userData.isLoggedIn || currentPlace.isUserOwner}
                                        variant="contained"
                                        color="error"
                                        onClick={() => setDialogOpen(true)}
                                    >
                                        Subscribe
                                    </Button>
                                </span>
                            </Tooltip>
                        }
                    </Grid>
                </Toolbar>
            </Grid>
            <Grid container>
                <ImagesCarousel address={currentPlace.address} />
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
    );
}
