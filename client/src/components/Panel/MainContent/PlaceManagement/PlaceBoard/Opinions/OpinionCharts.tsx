import { Grid, Typography } from "@mui/material"
import { FC } from "react"
import { OpinionsCard } from "../PlaceDashboard/OpinionsCard"
import { TotalOpinions } from "../PlaceDashboard/TotalOpinions"

export const OpinionCharts: FC = () => {
    return (
        <Grid container sx={{height: '100%'}} justifyContent="center" alignItems="center">
            <Grid item lg={6}>
                <OpinionsCard />
            </Grid>
        </Grid>
    )
}