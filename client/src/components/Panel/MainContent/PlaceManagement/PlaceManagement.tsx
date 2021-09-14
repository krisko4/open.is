import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../../../axios/axios";
import { Status, usePanelContext } from "../../../../contexts/PanelContext";
import { LoadingButton } from "../../../reusable/LoadingButton";
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";


const defaultNews = [
    {
        title: 'This will be my first news!',
        date: new Date().toString(),
        content: 'This is just an example of what your news will look like. It will disappear after your first news is created.'
    },
    {
        title: 'This will be my second news!',
        date: new Date().toString(),
        content: 'It is going to be fun!'

    }

]

export const PlaceManagement: FC = () => {

    const { currentPlace, places, setCurrentPlace, setNews, setOpinions, setOpinionCount } = usePanelContext()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        console.log(currentPlace!._id)
        myAxios.get('/news', {
            params: {
                placeId: currentPlace!._id
            }
        }).then(res => {
            console.log(res)
            // res.data.length > 0 ? setNews(res.data) : setNews(defaultNews)
            setNews(res.data)
        }).catch(err => console.log(err))
        myAxios.get('/opinions', {
            params: {
                placeId: currentPlace!._id
            }
        }).then(res => {
            setOpinions(res.data)
            setOpinionCount(res.data.length)
        }).catch(err => console.log(err))
    }, [currentPlace])

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
        <Grid container style={{ height: '100%' }} justify="center">
            <Grid container style={{ marginTop: 40, marginBottom: 40 }} spacing={2} item lg={11} justify="space-around">
                <Grid item lg={12}>
                    {currentPlace.status === Status.CLOSED && <Alert severity="error">Your place is now closed.</Alert>}
                    {!currentPlace.openingHours ?
                        <Alert severity="warning" style={{ marginTop: 10 }}>Your place is not visible in the browser. Please set opening hours of your business first.</Alert>
                        :
                        <Alert severity="success" style={{ marginTop: 10 }}>Your place is visible in the browser.</Alert>
                    }
                </Grid>
                <Grid item lg={4}>
                    <Card elevation={3} style={{ borderRadius: 15 }}>
                        <CardContent>
                            <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                            <Grid container style={{ marginTop: 5 }}>
                                <Grid container item lg={10} alignItems="center">
                                    <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                    <span style={{ marginLeft: 5 }}>+10.5%</span>
                                </Grid>
                                <Grid item lg={2} >
                                    <EqualizerIcon fontSize="large" color="primary" />
                                </Grid>
                            </Grid>
                            <Typography variant="h3">
                                18 000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4}>
                    <Card elevation={3} style={{ borderRadius: 15 }}>
                        <CardContent>
                            <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                            <Grid container style={{ marginTop: 5 }}>
                                <Grid container item lg={10} alignItems="center">
                                    <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                    <span style={{ marginLeft: 5 }}>+10.5%</span>
                                </Grid>
                                <Grid item lg={2} >
                                    <EqualizerIcon fontSize="large" color="primary" />
                                </Grid>
                            </Grid>
                            <Typography variant="h3">
                                18 000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={4}>
                    <Card elevation={3} style={{ borderRadius: 15 }}>
                        <CardContent>
                            <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                            <Grid container style={{ marginTop: 5 }}>
                                <Grid container item lg={10} alignItems="center">
                                    <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                    <span style={{ marginLeft: 5 }}>+10.5%</span>
                                </Grid>
                                <Grid item lg={2} >
                                    <StarIcon fontSize="large" style={{ color: '#ffb400' }} />
                                </Grid>
                            </Grid>
                            <Typography variant="h3">
                                18 000
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item container style={{ marginTop: 20 }} lg={12}>
                    <Grid item container direction="column" lg={5} style={{ paddingRight: 10 }}>
                        <Card elevation={3} style={{ borderRadius: 15 }}>
                            <CardContent>
                                <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                <Grid container style={{ marginTop: 5 }}>
                                    <Grid container item lg={10} alignItems="center">
                                        <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                        <span style={{ marginLeft: 5 }}>+10.5%</span>
                                    </Grid>
                                    <Grid item lg={2} >
                                        <EqualizerIcon fontSize="large" color="primary" />
                                    </Grid>
                                </Grid>
                                <Typography variant="h3">
                                    18 000
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card elevation={3} style={{ borderRadius: 15, marginTop: 10 }}>
                            <CardContent>
                                <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                <Grid container style={{ marginTop: 5 }}>
                                    <Grid container item lg={10} alignItems="center">
                                        <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                        <span style={{ marginLeft: 5 }}>+10.5%</span>
                                    </Grid>
                                    <Grid item lg={2} >
                                        <EqualizerIcon fontSize="large" color="primary" />
                                    </Grid>
                                </Grid>
                                <Typography variant="h3">
                                    18 000
                                </Typography>
                            </CardContent>
                        </Card>
                        <Grid container style={{ marginTop: 10 }} spacing={2}>

                            <Grid item lg={6}>
                                <Card style={{ flexGrow: 1, borderRadius: 15 }} elevation={3}>
                                    <CardContent>
                                        <Typography variant="overline" style={{ fontWeight: 'bold' }}>Set place status</Typography>
                                        <Grid container justify="center">

                                            {currentPlace.status === Status.CLOSED &&
                                                <LoadingButton loading={loading} disabled={loading} color="primary" onClick={() => setPlaceStatus(Status.OPEN)} size="large" startIcon={<MeetingRoomIcon style={{ color: 'green' }} />}>Open</LoadingButton>
                                            }
                                            {currentPlace.status === Status.OPEN &&
                                                <LoadingButton color="primary" loading={loading} disabled={loading} onClick={() => setPlaceStatus(Status.CLOSED)} size="large" startIcon={<MeetingRoomIcon style={{ color: 'red' }} />}>Close</LoadingButton>
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={7}>
                        <PlaceDetailsCard
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}