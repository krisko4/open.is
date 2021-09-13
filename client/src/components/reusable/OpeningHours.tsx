import { FC, useEffect } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import { ClassNameMap } from '@material-ui/styles';

interface Props {
    place?: any,
    classes: ClassNameMap<"title" | "container" | "divider" | "days" | "hours">
}

const OpeningHours: FC<Props> = ({ place, classes }) => {

    const openingHours = place && place.openingHours

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const hours = ['10 - 17', '8 - 18', '10 - 17', '10 - 17', '7 - 18', '10 - 17', '10 - 17']
   

    useEffect(() => {
        console.log(place)
    }, [place])

    return (
        <Grid container justify="center" alignItems="center" style={{ marginTop: 20, marginBottom: 20, height: 500 }}>
            <Grid item lg={5}>
                <Card className={classes.container} elevation={10}>
                    <CardContent>
                        <Typography variant="h5" className={classes.title}>Opening hours</Typography>
                        <Divider className={classes.divider} />
                        <Grid container justify="center">
                            <Grid item className={classes.days} lg={8}>
                                {days.map((day, index) => <Typography key={index} variant="h6">{day}</Typography>)}
                            </Grid>
                            <Grid item lg={3} className={classes.hours}>
                                {openingHours ? Object.keys(openingHours).map((key, index) => <Typography key={index} variant="h6">{openingHours[key].startHour} - {openingHours[key].endHour}</Typography>)
                                    
                            :  hours.map((hour, index) => <Typography key={index} variant="h6">{hour}</Typography>)
                                }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {!openingHours && !place.isUserOwner && 
                <Grid container style={{ marginTop: 10, textAlign: 'center' }}>
                    <Typography variant="caption" style={{ fontStyle: 'italic' }}><span style={{ color: 'red' }}>*</span> After your place is accepted, you will be able to specify its' opening hours. This is just an example.</Typography>
                </Grid>
            }
        </Grid>
        </Grid >

    );
};

export default OpeningHours;