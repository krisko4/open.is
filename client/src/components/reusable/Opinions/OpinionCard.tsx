import { Card, CardContent, Grid, Avatar, Typography } from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import { FC, useState } from "react"

export const OpinionCard: FC<any> = ({classes, opinion}) => {
    const [elevation, setElevation] = useState(3)
    return (
        <Card onMouseEnter={() => setElevation(10)} onMouseLeave={() => setElevation(3)} elevation={elevation} style={{ borderRadius: 10 }} className={classes.opinionCard} >
            <CardContent>
                <Grid container justify="space-around">
                    <Avatar style={{ width: 80, height: 80 }} src={`${opinion.authorImg}`} alt={opinion.author} />
                    <Grid item xs={8}>
                        <Typography variant="h6" className={classes.author}>{opinion.author}</Typography>
                        <Typography variant="caption" className={classes.date}>{opinion.date}</Typography>
                        <Typography variant="subtitle1" className={classes.content}>{opinion.content}</Typography>
                    </Grid>
                    <Rating
                        readOnly={true}
                        value={opinion.note}
                    />
                </Grid>
            </CardContent>
        </Card>

    )
}