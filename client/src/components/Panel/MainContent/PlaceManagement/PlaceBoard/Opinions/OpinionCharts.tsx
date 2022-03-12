import { Grid, Typography } from "@mui/material"
import { FC } from "react"
import { RatingCard } from "../PlaceDashboard/RatingCard"
import { TotalOpinions } from "../PlaceDashboard/TotalOpinions"

export const OpinionCharts: FC = () => {
    return (
        <Grid container sx={{height: '100%'}} justifyContent="center" alignItems="center">
            <Grid item lg={6}>
                <RatingCard/>
            </Grid>
        </Grid>
    )
}