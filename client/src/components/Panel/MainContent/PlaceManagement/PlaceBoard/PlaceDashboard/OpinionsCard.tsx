import { Fade, Card, CardContent, Typography, Grid, Rating } from "@mui/material"
import { FC } from "react"
import { useAverageNoteSelector } from "redux-toolkit/slices/currentPlaceSlice"
import { useCurrentPlaceContext } from "../../../../../../contexts/PanelContexts/CurrentPlaceContext"
import { RatingChart } from "../../Charts/RatingChart"

export const OpinionsCard: FC = () => {

    const averageNote = useAverageNoteSelector()

    return (
        <Fade in={true} timeout={2000}>
            <Card sx={{ flexGrow: 1 }} elevation={3}>
                <CardContent>
                    <Typography variant="h5">
                        Rating
                    </Typography>
                    <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                        The following chart represents the rating of your place
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                        <Rating
                            size="large"
                            name="simple-controlled"
                            readOnly
                            value={averageNote?.average || 0}
                            style={{ marginTop: 10 }}
                        />
                        <RatingChart />
                    </Grid>
                </CardContent>
            </Card>
        </Fade>
    )
}