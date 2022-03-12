import {
    Card,
    CardContent, Fade, Grid, Typography
} from "@mui/material";
import Alert from '@mui/material/Alert';
import React, { FC } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useParams } from "react-router-dom";
import { useGetStatusForSelectedLocationQuery } from "redux-toolkit/api/placesApi";
import { Status } from "../../../../../../contexts/PlaceProps";
import { PlaceDetailsCard } from "../../../NewPlace/PlaceDetailsCard";
import { ActivityChart } from '../../Charts/ActivityChart';
import { PlaceStatus } from "./PlaceStatus";
import { RatingCard } from "./RatingCard";
import { TotalOpinions } from './TotalOpinions';
import { TotalVisits } from './TotalVisits';
import { VisitsToday } from './VisitsToday';





export const PlaceDashboard: FC = () => {


    const { locationId } = useParams()
    const { data: status, isFetching } = useGetStatusForSelectedLocationQuery(locationId as string)

    return <>
        <Scrollbars>
            <Grid container direction="column">
                <Grid container sx={{ pt: '30px', pb: '30px', pl: '30px', pr: '30px' }}>
                    <Grid container justifyContent="space-around" spacing={2}>
                        <Grid item lg={4}>
                            <TotalVisits />
                        </Grid>
                        <Grid item lg={4}>
                            <VisitsToday />
                        </Grid>
                        <Grid item lg={4}>
                            <TotalOpinions />
                        </Grid>
                        <Grid item lg={12} sx={{ mb: 2 }}>
                            {status === Status.CLOSED &&
                                <Fade in={status === Status.CLOSED} timeout={500}>
                                    <Alert variant="filled" severity="error">Your place is now closed.</Alert>
                                </Fade>
                            }
                            {/* {!place.openingHours ?
                                <Alert severity="warning" variant="filled" style={{ marginTop: 10 }}>Your place is not visible in the browser. Please set opening hours of your business first.</Alert>
                                :
                                <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>Your place is visible in the browser.</Alert>
                            } */}
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" lg={5} style={{ paddingRight: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item container>
                                <RatingCard />
                            </Grid>
                            <Grid item container>
                                <PlaceStatus />
                            </Grid>
                            <Grid item container>
                                <Card elevation={3} sx={{ flexGrow: 1 }}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Activity
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                                            The following chart represents historical data of user activity in your place
                                        </Typography>
                                        <ActivityChart />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={7}>
                        <PlaceDetailsCard isEditable={false} />
                    </Grid>
                </Grid>
            </Grid>
        </Scrollbars>
    </>;
}