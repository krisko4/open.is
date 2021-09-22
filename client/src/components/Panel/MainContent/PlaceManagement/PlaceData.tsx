import { Button, Card, CardContent, Fade, Grid, makeStyles, Paper, Slide, Typography } from "@material-ui/core";
import { PlaceSettings } from "./PlaceSettings"
import EqualizerIcon from "@material-ui/icons/Equalizer";
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import SettingsIcon from "@material-ui/icons/Settings"
import { Rating } from "@material-ui/lab";
import Alert from '@material-ui/lab/Alert';
import { format, isSameDay } from "date-fns";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import myAxios from "../../../../axios/axios";
import { PlaceProps, Status, usePanelContext } from "../../../../contexts/PanelContext";
import { StatisticChart } from "../Dashboard/StatisticChart";
import { PlaceDetailsCard } from "../NewPlace/PlaceDetailsCard";
import { LoadingButton } from "../../../reusable/LoadingButton";
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';

interface VisitProps {
    date: string,
    placeId: string,
    visitCount: number

}
interface Props {
    index: number,
    visits: VisitProps[]
}

const useStyles = makeStyles({
    shadowCard: {
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        //    boxShadow:  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        borderRadius: 15,
        flexGrow: 1
    }
})

export const PlaceData: FC<Props> = ({ index, visits }) => {

    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const { currentPlace, placeIndex, setCurrentPlace, places, opinions } = usePanelContext()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const { ones, twos, threes, fours, fives } = currentPlace.averageNote



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
    const totalVisitsSeries = [

        {
            name: 'visits',
            data: visits.map(visit => visit.visitCount)
        },
    ]

    const totalOpinionsSeries = [
        {
            data: [ones, twos, threes, fours, fives]
        }
    ]


    const [totalOpinionsOptions, setTotalOpinionsOptions] = useState({
        chart: {
            type: 'bar',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            sparkline: {
                enabled: true
            }
        },

        xaxis: {
            //    categories: ['One', 'Two', 'Three', 'Four', 'Five'],
            crosshairs: {
                width: 1
            }
        },
        tooltip: {

            y: {
                title: {
                    formatter: function (seriesName: string) {
                        return ''
                    }
                }
            },

        },

        dataLabels: {
            enabled: false
        }
    })


    const [totalVisitsOptions, setTotalVisitsOptions] = useState({
        chart: {
            type: 'area',
            sparkline: {
                enabled: true
            },
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            dataLabels: {
                show: false
            }
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.3,
        },
        yaxis: {
            min: 0
        },
    });

    // const [ratingOptions, setRatingOptions] = useState({
    //     plotOptions: {
    //         // bar: {
    //         //     borderRadius: 1,
    //         //     // horizontal: true
    //         // },
    //         // dataLabels: {
    //         //     enabled: false
    //         // },
    //         xaxis: {
    //             categories: [1, 2, 3, 4, 5]
    //         }
    //     }
    // })

    const [ratingOptions, setRatingOptions] = useState({
        chart: {
            width: 380,
            type: 'donut',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        labels: ['One', 'Two', 'Three', 'Four', 'Five'],
        fill: {
            type: 'gradient',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    })

    const ratingSeries = [ones, twos, threes, fours, fives]

    // const ratingSeries = [{
    //     name: 'quantity',
    //     data: [ones, twos, threes, fours, fives]
    // }]

    const [options, setOptions] = useState({
        chart: {
            id: 'area-datetime',
            type: 'area',
            zoom: {
                autoScaleYaxis: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        }
    })
    const series = [{
        name: 'visits',
        data: visits.map(visit => [visit.date, visit.visitCount])
    }]

    return (
        <>
            {index === placeIndex &&
                <Grid container style={{ height: '100%', marginTop: -130 }} justify="center">
                    <Grid container style={{ marginTop: 40, marginBottom: 40, marginRight: 40 }} spacing={2} item justify="space-around">
                        <Grid container justify="space-around" spacing={2}>
                            <Grid item lg={4}>
                                <Card className={classes.shadowCard}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                        <Grid container style={{ marginTop: 5 }}>
                                            <Grid container item alignItems="center" justify="space-between">
                                                <Grid item style={{ flexGrow: 1 }}>
                                                    <Grid container item alignItems="center">
                                                        <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                                        <span style={{ marginLeft: 5 }}>+10.5%</span>
                                                    </Grid>
                                                    <Typography variant="h3">{visits.reduce((a, b) => a + b.visitCount, 0)}</Typography>
                                                </Grid>
                                                <StatisticChart height={100} width={150} type="area" options={totalVisitsOptions} setOptions={setTotalVisitsOptions} series={totalVisitsSeries} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={4}>
                                <Card elevation={3} className={classes.shadowCard}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Visits today</Typography>
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
                                            {visits.find(visit => isSameDay(new Date(visit.date), new Date()))?.visitCount || 0}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={4}>
                                <Card elevation={3} className={classes.shadowCard}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                                        <Grid container style={{ marginTop: 5 }}>
                                            <Grid container item alignItems="center" justify="space-between">
                                                <Grid item style={{ flexGrow: 1 }}>
                                                    <Grid container item alignItems="center">
                                                        <TrendingUpIcon style={{ color: 'lightgreen' }} />
                                                        <span style={{ marginLeft: 5 }}>+10.5%</span>
                                                    </Grid>
                                                    <Typography variant="h3">{opinions.length}</Typography>
                                                </Grid>
                                                <StatisticChart height={100} width={150} type="bar" options={totalOpinionsOptions} setOptions={setTotalOpinionsOptions} series={totalOpinionsSeries} />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
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
                                                    <StatisticChart type="donut" width={380} options={ratingOptions} setOptions={setRatingOptions} series={ratingSeries} />
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
                                                <StatisticChart type="area" height={500} options={options} setOptions={setOptions} series={series} />
                                            </CardContent>

                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item lg={7}>
                                <PlaceDetailsCard />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            }
        </>
    )
}