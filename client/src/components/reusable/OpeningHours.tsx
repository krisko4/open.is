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


    useEffect(() => {
        console.log(place)
    }, [place])

    return (
        <Grid container justify="center" style={{ marginTop: 20, marginBottom: 20 }}>
            <Grid item lg={5}>
                <Card className={classes.container} elevation={10}>
                    <CardContent>
                        <Typography className={classes.title}>Opening hours</Typography>
                        <Divider className={classes.divider} />
                        <Grid container justify="center">
                            <Grid item className={classes.days} lg={8}>
                                <Typography>Monday</Typography>
                                <Typography>Tuesday</Typography>
                                <Typography>Wednesday</Typography>
                                <Typography>Thursday</Typography>
                                <Typography>Friday</Typography>
                                <Typography>Saturday</Typography>
                                <Typography>Sunday</Typography>
                            </Grid>
                            <Grid item lg={3} className={classes.hours}>
                                {openingHours ?
                                    <div>
                                        <Typography>{openingHours.monday.startHour} - {openingHours.monday.endHour}</Typography>
                                        <Typography>{openingHours.tuesday.startHour} - {openingHours.tuesday.endHour}</Typography>
                                        <Typography>{openingHours.wednesday.startHour} - {openingHours.wednesday.endHour}</Typography>
                                        <Typography>{openingHours.thursday.startHour} - {openingHours.thursday.endHour}</Typography>
                                        <Typography>{openingHours.friday.startHour} - {openingHours.friday.endHour}</Typography>
                                        <Typography>{openingHours.saturday.startHour} - {openingHours.saturday.endHour}</Typography>
                                        <Typography>{openingHours.sunday.startHour} - {openingHours.sunday.endHour}</Typography>
                                    </div>
                                    : <div>
                                        <Typography>10 - 16</Typography>
                                        <Typography>10 - 16</Typography>
                                        <Typography>10 - 16</Typography>
                                        <Typography>10 - 16</Typography>
                                        <Typography>10 - 16</Typography>
                                        <Typography>10 - 16</Typography>
                                        <Typography>10 - 16</Typography>
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {!openingHours &&
                <Grid item lg={10} style={{marginTop: 10}}>
                    <Typography variant="caption" style={{fontStyle: 'italic'}}><span style={{color: 'red'}}>*</span> After your place is accepted, you will be able to specify its' opening hours. This is just an example.</Typography>
                </Grid>
            }
        </Grid>

    );
};

export default OpeningHours;