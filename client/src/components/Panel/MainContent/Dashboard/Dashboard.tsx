import { Avatar, Button, Fade, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Rating } from '@mui/material';
import { isToday } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { RawPlaceDataProps } from "../../../../contexts/PanelContexts/BusinessChainContext";
import { CurrentPlaceProps } from "../../../../contexts/PanelContexts/CurrentPlaceContext";
import { ChosenOptions } from "../../../../contexts/PanelContexts/PanelContext";
import { setSelectedOption } from "../../../../store/actions/setSelectedOption";
import { usePlacesSelector } from "../../../../store/selectors/PlacesSelector";
import { ActivityChart } from './Charts/ActivityChart';


const useStyles = makeStyles({
    shadowCard: {
        // boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
        boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
        //    boxShadow:  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        borderRadius: 15
    }
})

export const Dashboard: FC = () => {

    const dispatch = useDispatch()
    const places = usePlacesSelector()
    const classes = useStyles()
    const [totalVisits, setTotalVisits] = useState(0)
    const [totalOpinions, setTotalOpinions] = useState(0)
    const [mostPopularPlace, setMostPopularPlace] = useState<RawPlaceDataProps | null>(null)
    const [totalVisitsDiff, setTotalVisitsDiff] = useState(0)
    const [totalOpinionsDiff, setTotalOpinionsDiff] = useState(0)
    const [activityChartSeries, setActivityChartSeries] = useState<any>()
    const history = useHistory()
    const match = useRouteMatch()

    // useEffect(() => {
    //     const mostPopularPlace = places.sort((a, b) => a.locations[0].visits.reduce((c, d) => c + d.visitCount, 0) - b.locations[0].visits.reduce((e, f) => e + f.visitCount, 0))[places.length - 1]
    //     setMostPopularPlace(mostPopularPlace)
    //     setActivityChartSeries(places.map(place => {
    //         return {
    //             name: place.name,
    //             data: place.locations[0].visits.map(visit => [new Date(visit.date), visit.visitCount])
    //         }
    //     }))
    //     console.log(mostPopularPlace)
    //     const opinionCount = places.reduce((a, b) => a + b.locations[0].opinions.length, 0)
    //     setTotalOpinions(opinionCount)
    //     const opinionsToday = places.reduce((a, b) => a + b.locations[0].opinions.filter(opinion => isToday(new Date(opinion.date))).length, 0)
    //     opinionCount === opinionsToday ? setTotalOpinionsDiff(opinionCount * 100) : setTotalOpinionsDiff(Math.round(((opinionCount / (opinionCount - opinionsToday)) * 100 - 100) * 10) / 10)
    //     const visitCount = places.reduce((a, b) => a + b.locations[0].visits.reduce((c, d) => c + d.visitCount, 0), 0)
    //     setTotalVisits(visitCount)
    //     const totalVisitsToday = places.reduce((a, b) => a + b.locations[0].visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0), 0)
    //     if (totalVisitsToday === visitCount) {
    //         setTotalVisitsDiff(visitCount * 100)
    //         return
    //     }
    //     setTotalVisitsDiff(Math.round(((visitCount / (visitCount - totalVisitsToday)) * 100 - 100) * 10) / 10)
    // }, [places])

    return (
        <Grid container justifyContent="center" sx={{ pb: '50px', pt: '50px' }}>
            <Grid item lg={11}>
                <Typography variant="h3" >
                    <Grid container>
                        <Grid item lg={10}>
                            Hello, {`${localStorage.getItem('fullName')?.split(' ')[0]}`}
                        </Grid>
                        <Grid item container justifyContent="flex-end" lg={2} >
                            <Grid item style={{ marginRight: 5 }}>
                                <Button onClick={() => history.push(`new-place`)} startIcon={<AddIcon />} variant="contained" color="error">
                                    New place
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography variant="body1" >welcome to your personal dashboard</Typography>
                <Grid container style={{ marginTop: 20 }} spacing={2} justifyContent="space-between">
                    <Grid item lg={6}>
                        <Fade in={true} timeout={2000}>
                            <Card elevation={3} >
                                <CardContent>
                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                    <Grid container style={{ marginTop: 5 }}>
                                        <Grid container item lg={10} alignItems="center">
                                            {totalVisitsDiff > 0 ? <>
                                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {totalVisitsDiff}%</span>
                                            </> :
                                                <>
                                                    <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                    <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                                </>}
                                        </Grid>
                                        <Grid item lg={2} >
                                            <EqualizerIcon fontSize="large" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h3">
                                        {totalVisits}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                    <Grid item lg={6}>
                        <Fade in={true} timeout={2000}>
                            <Card elevation={3} >
                                <CardContent>
                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                                    <Grid container style={{ marginTop: 5 }}>
                                        <Grid container item lg={10} alignItems="center">
                                            {totalOpinionsDiff > 0 ? <>
                                                <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {totalOpinionsDiff}%</span>
                                            </> :
                                                <>
                                                    <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                    <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                                </>}
                                        </Grid>
                                        <Grid item lg={2} >
                                            <EqualizerIcon fontSize="large" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h3">
                                        {totalOpinions}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>

                    <Grid item lg={6}>
                        <Fade in={true} timeout={1000}>
                            <Card sx={{ flexGrow: 1 }}>
                                <CardContent>
                                    <Typography variant="h5">
                                        Activity
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                        The following chart represents historical data of user activity in your places
                                    </Typography>
                                    {totalVisits && <ActivityChart series={activityChartSeries} />}
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                    <Grid item lg={6}>
                        <Fade in={true} timeout={2000}>
                            <Card style={{ flexGrow: 1 }} >
                                <CardContent>
                                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Most popular</Typography>
                                    <Grid container direction="column" alignItems="center">
                                        <Avatar
                                            // src="https://static.gazetka-24.pl/image/shop/auchan/logo_512.png"
                                            src={`${mostPopularPlace?.logo}`}
                                            alt={mostPopularPlace?.name}
                                            style={{ height: 100, width: 100 }}
                                        />
                                        <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                            {mostPopularPlace?.name}
                                        </Typography>
                                        <Typography variant="h6" style={{ textAlign: 'center' }} >
                                            {mostPopularPlace?.subtitle}
                                        </Typography>
                                        <Grid container style={{ marginTop: 20 }} justifyContent="space-evenly">
                                            <Grid item lg={4}>
                                                <Card style={{ flexGrow: 1, marginRight: 10 }}>
                                                    <CardContent>
                                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                                                        <Grid container direction="column" alignItems="center">
                                                            {/* <Typography variant="h4" style={{ borderBottom: '5px solid red', fontWeight: 'bold' }}>
                                                                {mostPopularPlace?.locations[0].visits.reduce((a, b) => a + b.visitCount, 0)}

                                                            </Typography> */}
                                                            {/* <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Visits today: {mostPopularPlace?.locations[0].visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)}</Typography> */}

                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item lg={4}>
                                                <Card style={{ flexGrow: 1, marginRight: 10 }}>
                                                    <CardContent>
                                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                                                        <Grid container alignItems="center" direction="column">
                                                            {/* <Typography variant="h4" style={{ borderBottom: '5px solid red', fontWeight: 'bold' }}>
                                                                {mostPopularPlace?.locations[0].opinions.length}
                                                            </Typography> */}
                                                            {/* <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Opinions today: {mostPopularPlace?.locations[0].opinions.filter(opinion => isToday(new Date(opinion.date))).length}</Typography> */}
                                                        </Grid>

                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item lg={4}>
                                                <Card style={{ flexGrow: 1 }}>
                                                    <CardContent>
                                                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Average note</Typography>
                                                        <Grid style={{ height: 80 }} container alignItems="center" justifyContent="center" direction="column">

                                                            {/* <Rating value={mostPopularPlace?.locations[0].averageNote.average || 0} readOnly /> */}

                                                            {/* <Typography style={{ marginTop: 10, fontStyle: 'italic' }}>Costam: 3</Typography> */}
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Fade>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}