import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Card, CardContent, CircularProgress, Fade, Grid, Typography } from "@mui/material";
import { isToday } from "date-fns";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetOpinionsForSelectedLocationQuery } from "redux-toolkit/api/placesApi";

export const TotalOpinions: FC<any> = () => {

    const { locationId } = useParams()
    const { data: opinions, isFetching } = useGetOpinionsForSelectedLocationQuery(locationId as string)

    const opinionsDiff = useMemo(() => {
        if (opinions) {
            const opinionsToday = opinions.filter(opinion => isToday(new Date(opinion.date))).length
            if (opinionsToday === opinions.length) {
                return opinions.length * 100
            }
            return opinions.length > 0 && Math.round(((opinions.length / (opinions.length - opinionsToday)) * 100 - 100) * 10) / 10
        }
    }, [opinions])

    return (
        <Fade in={true} timeout={2500}>
            <Card>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid container item alignItems="center" justifyContent="space-between">
                            <Grid item style={{ flexGrow: 1 }}>
                                <Fade in={true} timeout={500}>
                                    <div>
                                        {isFetching ? <CircularProgress /> : <>
                                            <Grid container item alignItems="center">
                                                {opinionsDiff === 0 || (opinions && opinions.length === 0) ? <>
                                                    <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                                    <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                                </> : <>
                                                    <TrendingUpIcon style={{ color: '#03C03C' }} />
                                                    <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {opinionsDiff}%</span>
                                                </>
                                                }
                                            </Grid>
                                            <Typography variant="h3">{opinions?.length}</Typography>
                                        </>}
                                    </div>
                                </Fade>
                            </Grid>
                            {/* <TotalOpinionsChart /> */}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    );
}