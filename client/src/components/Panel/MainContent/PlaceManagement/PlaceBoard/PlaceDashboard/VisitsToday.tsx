import { Card, CardContent, Typography, Grid, CardMedia, Fade, CircularProgress } from "@mui/material"
import { FC, useEffect, useState } from "react"
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { isToday, isYesterday } from "date-fns";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";
import { useIdSelector, useVisitsSelector } from "redux-toolkit/slices/currentPlaceSlice";
import { useGetVisitsForSelectedLocationQuery } from "redux-toolkit/api/placesApi";
import { useParams } from "react-router-dom";

export const VisitsToday: FC<any> = ({ shadowCard, totalVisits }) => {

    const [visitsToday, setVisitsToday] = useState(0)
    const [visitsYesterday, setVisitsYesterday] = useState(0)
    // const visits = useVisitsSelector()

    const { locationId } = useParams()
    const { data: visits, isFetching } = useGetVisitsForSelectedLocationQuery(locationId as string)

    useEffect(() => {
        if (visits) {
            const visitsToday = visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
            setVisitsYesterday(visits.filter(visit => isYesterday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0))
            setVisitsToday(visitsToday)
        }

    }, [visits])

    return (
        <Fade in={true} timeout={2200}>
            <Card sx={{height: '170px'}}>
                <CardContent>
                    <>
                        <Typography style={{ fontWeight: 'bold' }} variant="overline">Visits today</Typography>
                        <Grid container style={{ marginTop: 5 }}>
                            <Grid item lg={6} container justifyContent="center" direction="column">
                                <Fade in={true} timeout={500}>
                                    <div>
                                        {isFetching ? <CircularProgress /> :
                                            <>
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
                                            </>
                                        }
                                    </div>
                                </Fade>
                            </Grid>
                            {/* <Grid item lg={6} container justifyContent="center">
                            <CardMedia style={{ height: 100, width: 120 }} />
                        </Grid> */}
                        </Grid>
                    </>
                </CardContent>
            </Card>
        </Fade>
    );
}