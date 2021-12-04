import { Button, Card, CardContent, CardMedia, Fade, Grid, makeStyles, Typography } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';
import SettingsIcon from "@material-ui/icons/Settings";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Rating } from "@material-ui/lab";
import Alert from '@material-ui/lab/Alert';
import { isToday, isYesterday } from "date-fns";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../../../axios/axios";
import { Status, usePanelContext } from "../../../../contexts/PanelContexts/PanelContext";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";
import { PlaceSettings } from "./PlaceSettings";
import {ActivityChart} from './Charts/ActivityChart'
import {RatingChart} from './Charts/RatingChart'
import {TotalOpinionsChart} from './Charts/TotalOpinionsChart'
import {TotalVisitsChart} from './Charts/TotalVisitsChart'
import { useCurrentPlaceContext } from "../../../../contexts/PanelContexts/CurrentPlaceContext";


interface Props {
    index: number,
}

const useStyles = makeStyles({
    shadowCard: {
        // boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
        //    boxShadow:  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        borderRadius: 15,
        flexGrow: 1
    }
})

export const PlaceData: FC<Props> = ({ index }) => {

    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const {currentPlace, setCurrentPlace, visits, opinions} = useCurrentPlaceContext()
    const {placeIndex, places} = usePanelContext()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [totalVisits, setTotalVisits] = useState(0)
    const [visitsToday, setVisitsToday] = useState(0)
    const [visitsYesterday, setVisitsYesterday] = useState(0)
    const [opinionsDiff, setOpinionsDiff] = useState(0)
    const [visitsDiff, setVisitsDiff] = useState(0)



    useEffect(() => {
        const totalVisits = visits.reduce((a, b) => a + b.visitCount, 0)
        setTotalVisits(totalVisits)
        const visitsToday = visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
        setVisitsToday(visitsToday)
        setVisitsYesterday(visits.filter(visit => isYesterday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0))
        if (visitsToday === totalVisits) {
            setVisitsDiff(visitsToday * 100)
            return
        }
        setVisitsDiff(Math.round(((totalVisits / (totalVisits - visitsToday)) * 100 - 100) * 10) / 10)
    }, [visits])

    useEffect(() => {
        const opinionsToday = opinions.filter(opinion => isToday(new Date(opinion.date))).length
        if (opinionsToday === opinions.length) {
            setOpinionsDiff(opinions.length * 100)
            return
        }
        opinions.length > 0 && setOpinionsDiff(Math.round(((opinions.length / (opinions.length - opinionsToday)) * 100 - 100) * 10) / 10)
    }, [opinions])

    const setPlaceStatus = async (status: Status) => {
        setLoading(true)
        try {
            await myAxios.patch(`places/${currentPlace._id}/status`, {
                status: status
            })
            if (currentPlace) {
                const updatedPlace = { ...currentPlace }
                updatedPlace.status = status
                places[places.indexOf(currentPlace)] = updatedPlace
                setCurrentPlace(updatedPlace)
            }
            if (status === Status.OPEN) {
                enqueueSnackbar('Your place is now open', {
                    variant: 'success'
                })
                return
            }
            enqueueSnackbar('Your place is now closed', {
                variant: 'success'
            })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            {index === placeIndex &&
                <Grid container style={{ height: '100%', paddingTop: 40, paddingLeft: 40, paddingRight: 40 }} justify="center">
                    <Grid container justify="space-around" spacing={2}>
                        <Grid item lg={4}>
                            <Fade in={true} timeout={2000}>
                                <Card className={classes.shadowCard}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                        <Grid container style={{ marginTop: 5 }}>
                                            <Grid item lg={6} container justify="center" direction="column">
                                                <Grid container alignItems="center">
                                                    {
                                                        visitsDiff === 0 || totalVisits === 0 ?
                                                            <>
                                                                <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                                <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                                            </> :
                                                            <>
                                                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                                <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {visitsDiff}%</span>
                                                            </>
                                                    }
                                                </Grid>
                                                <Typography variant="h3">
                                                    {totalVisits}
                                                </Typography>
                                            </Grid>
                                            <Grid item lg={6} container justify="center">
                                                <TotalVisitsChart visits={visits} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                        <Grid item lg={4}>
                            <Fade in={true} timeout={2000}>
                                <Card className={classes.shadowCard}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Visits today</Typography>
                                        <Grid container style={{ marginTop: 5 }}>
                                            <Grid item lg={6} container justify="center" direction="column">
                                                <Grid container alignItems="center">
                                                    {
                                                        visitsToday === visitsYesterday || totalVisits === 0 ? <>
                                                            <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                            <span style={{ marginLeft: 5, color: '#ffbf00' }}>0</span>
                                                        </> :
                                                            visitsToday - visitsYesterday > 0 ? <>
                                                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                                <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {visitsToday - visitsYesterday}</span>
                                                            </> : <>
                                                                <TrendingDownIcon style={{ color: 'red' }} />
                                                                <span style={{ marginLeft: 5, color: 'red' }}> {visitsToday - visitsYesterday}</span>
                                                            </>
                                                    }
                                                </Grid>
                                                <Typography variant="h3">
                                                    {visitsToday}
                                                </Typography>
                                            </Grid>
                                            <Grid item lg={6} container justify="center">
                                                <CardMedia style={{ height: 100, width: 120 }} image="https://s38357.pcdn.co/wp-content/uploads/2020/04/Site-visit-Icon.png" />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                        <Grid item lg={4}>
                            <Fade in={true} timeout={2000}>
                                <Card className={classes.shadowCard}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                                        <Grid container style={{ marginTop: 5 }}>
                                            <Grid container item alignItems="center" justify="space-between">
                                                <Grid item style={{ flexGrow: 1 }}>
                                                    <Grid container item alignItems="center">
                                                        {opinionsDiff === 0 || opinions.length === 0 ? <>
                                                            <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                            <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                                        </> : <>
                                                            <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                            <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {opinionsDiff}%</span>
                                                        </>
                                                        }
                                                    </Grid>
                                                    <Typography variant="h3">{opinions.length}</Typography>
                                                </Grid>
                                                <TotalOpinionsChart />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                        <Grid item lg={12}>
                            {currentPlace.status === Status.CLOSED && <Alert variant="filled" severity="error">Your place is now closed.</Alert>}
                            {!currentPlace.openingHours ?
                                <Alert severity="warning" variant="filled" style={{ marginTop: 10 }}>Your place is not visible in the browser. Please set opening hours of your business first.</Alert>
                                :
                                <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>Your place is visible in the browser.</Alert>
                            }
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 20 }}>
                        <Grid item container direction="column" lg={5} style={{ paddingRight: 10 }}>
                            <Grid container spacing={2}>
                                <Grid item lg={6}>
                                    <Card className={classes.shadowCard} style={{ background: '#2196f3' }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" style={{ color: 'white' }}>
                                                Press the button below to <span>{currentPlace.status === Status.OPEN ? 'close' : 'open'}</span> your business
                                            </Typography>
                                            <Grid container style={{ marginTop: 20 }} justify="space-between" alignItems="center">
                                                {currentPlace.status === Status.OPEN ? <>
                                                    <LoadingButton disabled={loading} loading={loading} variant="outlined" onClick={() => setPlaceStatus(Status.CLOSED)} style={{ color: 'white', borderColor: 'white' }}>Close</LoadingButton>
                                                    <NoMeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                                                </>
                                                    : <>
                                                        <LoadingButton disabled={loading} loading={loading} variant="outlined" onClick={() => setPlaceStatus(Status.OPEN)} style={{ color: 'white', borderColor: 'white' }}>Open</LoadingButton>
                                                        <MeetingRoomIcon style={{ color: 'white', width: 60, height: 60 }} />
                                                    </>
                                                }
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item lg={6}>
                                    <Card className={classes.shadowCard} style={{ background: '#2196f3' }}>
                                        <CardContent>
                                            <Typography variant="subtitle2" style={{ color: 'white' }}>
                                                Press the button below to manage your business
                                            </Typography>
                                            <Grid container style={{ marginTop: 20 }} justify="space-between" alignItems="center">
                                                <Button onClick={() => setSettingsOpen(true)} variant="outlined" style={{ color: 'white', borderColor: 'white' }}>Settings</Button>
                                                <SettingsIcon style={{ color: 'white', width: 60, height: 60 }} />
                                            </Grid>
                                            <PlaceSettings open={settingsOpen} setOpen={setSettingsOpen} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item container>
                                    <Card className={classes.shadowCard} elevation={3}>
                                        <CardContent>
                                            <Typography variant="h5">
                                                Rating
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                                The following chart represents the rating of your place
                                            </Typography>
                                            <Grid container justify="center" alignItems="center">
                                                <Rating
                                                    size="large"
                                                    name="simple-controlled"
                                                    readOnly
                                                    value={currentPlace.averageNote.average}
                                                    style={{ marginTop: 10 }}
                                                />
                                                <RatingChart />
                                            </Grid>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item container>
                                    <Card className={classes.shadowCard} elevation={3}>
                                        <CardContent>
                                            <Typography variant="h5">
                                                Activity
                                            </Typography>
                                            <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                                The following chart represents historical data of user activity in your place
                                            </Typography>
                                            <ActivityChart visits={visits} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid style={{ marginBottom: 20 }} item lg={7}>
                            <PlaceDetailsCard />
                        </Grid>
                    </Grid>

                </Grid>
            }
        </>
    )
}