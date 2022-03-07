import TrendingFlatIcon from "@mui/icons-material/TrendingFlat"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import { Card, CardContent, Fade, Grid, Typography } from "@mui/material"
import { isToday } from "date-fns"
import React, { FC, useEffect, useState } from "react"
import { useVisitsSelector } from "redux-toolkit/slices/currentPlaceSlice"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"

export const TotalVisits: FC<any> = ({ shadowCard, totalVisits, setTotalVisits }) => {

    const [visitsDiff, setVisitsDiff] = useState(0)
    const visits = useVisitsSelector()

    useEffect(() => {
        if (visits) {
            const totalVisits = visits.reduce((a, b) => a + b.visitCount, 0)
            setTotalVisits(totalVisits)
            const visitsToday = visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
            if (visitsToday === totalVisits) {
                setVisitsDiff(visitsToday * 100)
                return
            }
            setVisitsDiff(Math.round(((totalVisits / (totalVisits - visitsToday)) * 100 - 100) * 10) / 10)

        }
    }, [visits])

    return (
        <Fade in={true} timeout={2000}>
            <Card>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid item lg={6} container justifyContent="center" direction="column">
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
                        {/* <Grid item lg={6} container justifyContent="center">
                            <TotalVisitsChart visits={currentPlace.visits} />
                        </Grid> */}
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    );
}