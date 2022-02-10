import { Card, CardContent, Typography, Grid, CardMedia, Fade } from "@mui/material"
import { FC, useEffect, useState } from "react"
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { isToday, isYesterday } from "date-fns";
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext";

export const VisitsToday: FC<any> = ({ shadowCard, totalVisits }) => {

    const { currentPlace } = useCurrentPlaceContext()
    const [visitsToday, setVisitsToday] = useState(0)
    const [visitsYesterday, setVisitsYesterday] = useState(0)

    useEffect(() => {
        const { visits } = currentPlace
        if (visits) {
            const visitsToday = visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
            setVisitsYesterday(visits.filter(visit => isYesterday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0))
            setVisitsToday(visitsToday)
        }

    }, [currentPlace.visits])

    return (
        <Fade in={true} timeout={2200}>
            <Card>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Visits today</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid item lg={6} container justifyContent="center" direction="column">
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
                        {/* <Grid item lg={6} container justifyContent="center">
                            <CardMedia style={{ height: 100, width: 120 }} />
                        </Grid> */}
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    );
}