import { Card, CardContent, Typography, Grid, Fade } from "@material-ui/core"
import { isToday } from "date-fns"
import { FC, useEffect, useState } from "react"
import { TotalOpinionsChart } from "../Charts/TotalOpinionsChart"
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useCurrentPlaceContext } from "../../../../../contexts/PanelContexts/CurrentPlaceContext";

export const TotalOpinions: FC<any> = ({ shadowCard }) => {

    const [opinionsDiff, setOpinionsDiff] = useState(0)
    const { currentPlace } = useCurrentPlaceContext()

    useEffect(() => {
        const opinions = currentPlace.opinions
        if (opinions) {
            const opinionsToday = opinions.filter(opinion => isToday(new Date(opinion.date))).length
            if (opinionsToday === opinions.length) {
                setOpinionsDiff(opinions.length * 100)
                return
            }
            opinions.length > 0 && setOpinionsDiff(Math.round(((opinions.length / (opinions.length - opinionsToday)) * 100 - 100) * 10) / 10)
        }
    }, [currentPlace.opinions])


    return (
        <Fade in={true} timeout={2500}>
            <Card className={shadowCard}>
                <CardContent>
                    <Typography style={{ fontWeight: 'bold' }} variant="overline">Total opinions</Typography>
                    <Grid container style={{ marginTop: 5 }}>
                        <Grid container item alignItems="center" justify="space-between">
                            <Grid item style={{ flexGrow: 1 }}>
                                <Grid container item alignItems="center">
                                    {opinionsDiff === 0 || (currentPlace.opinions && currentPlace.opinions.length === 0) ? <>
                                        <TrendingFlatIcon style={{ color: '#ffbf00' }} />
                                        <span style={{ marginLeft: 5, color: '#ffbf00' }}>0%</span>
                                    </> : <>
                                        <TrendingUpIcon style={{ color: '#03C03C' }} />
                                        <span style={{ marginLeft: 5, color: '#03C03C' }}>+ {opinionsDiff}%</span>
                                    </>
                                    }
                                </Grid>
                                <Typography variant="h3">{currentPlace.opinions?.length}</Typography>
                            </Grid>
                            <TotalOpinionsChart />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fade>

    )
}