import { Card, CardContent, Typography, Divider, Grid } from "@material-ui/core"
import { format } from "date-fns"
import { FC, useEffect } from "react"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


export const OpeningHoursCard: FC<any> = ({ classes, openingHours }) => {

    useEffect(() => {
        console.log(openingHours)
    },[])

    return (
        <Card className={classes.container} style={{ flexGrow: 1 }} elevation={10}>
            <CardContent>
                <Typography variant="h5" className={classes.title}>Opening hours</Typography>
                <Divider className={classes.divider} />
                <Grid container justify="center">
                    <Grid item className={classes.days} lg={6}>
                        {days.map((day, index) => <Typography key={index} variant="h6">{day}</Typography>)}
                    </Grid>
                    <Grid item lg={5} style={{ textAlign: 'center' }} container direction="column" className={classes.hours}>
                        {Object.keys(openingHours).map((key, index) => <div key={key}>
                            {!openingHours[key].isOpen ?
                                <Typography variant="h6" style={{ color: 'red' }}>CLOSED</Typography>
                                :
                                <Typography variant="h6">{format(new Date(openingHours[key].startHour), 'HH:mm')} - {format(new Date(openingHours[key].endHour), 'HH:mm')}</Typography>
                            }
                        </div>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}