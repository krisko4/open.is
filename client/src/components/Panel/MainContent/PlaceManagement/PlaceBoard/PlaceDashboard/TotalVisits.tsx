import TrendingFlatIcon from "@mui/icons-material/TrendingFlat"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import { CircularProgress, Card, CardContent, Fade, Grid, Typography } from "@mui/material"
import { isToday } from "date-fns"
import React, { FC, useEffect, useMemo, useState } from "react"
import { useGetVisitsForSelectedLocationQuery } from "redux-toolkit/api/placesApi"
import { useIdSelector, useVisitsSelector } from "redux-toolkit/slices/currentPlaceSlice"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { useParams } from "react-router-dom";

export const TotalVisits: FC = () => {

    const { locationId } = useParams()
    const { data: visits, isFetching } = useGetVisitsForSelectedLocationQuery(locationId as string)

    const totalVisits = useMemo(() => {
        if (visits) {
            return visits.reduce((a, b) => a + b.visitCount, 0)
        }
    }, [visits])

    const visitsDiff = useMemo(() => {
        if (totalVisits && visits) {
            const visitsToday = visits.filter(visit => isToday(new Date(visit.date))).reduce((a, b) => a + b.visitCount, 0)
            if (visitsToday === totalVisits) {
                return visitsToday * 100
            }
            return Math.round(((totalVisits / (totalVisits - visitsToday)) * 100 - 100) * 10) / 10
        }
    }, [totalVisits])

    return (
        <Fade in={true} timeout={2000}>
            <Card>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total visits</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid item lg={6} container justifyContent="center" direction="column">
                            <Fade in={true}>
                                <div>
                                    {isFetching ? <CircularProgress /> : <>
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
                                    </>}
                                </div>

                            </Fade>
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