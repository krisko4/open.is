import {useEffect} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Divider} from "@material-ui/core";

const OpeningHours = ({place}) => {

    const openingHours = place.openingHours


    useEffect(() => {
        console.log(place)
    }, [place])

    return (
        <Grid container justify="center" style={{marginTop: 20, marginBottom: 20}}>
            <Grid item lg={5}>
                <Card style={{background: '#2C2C2C', borderRadius: 10}}>
                    <CardContent>
                        <Typography style={{textAlign: 'center', color: 'white'}}>Opening hours</Typography>
                        <Divider style={{marginTop: 10, background: '#2196f3', marginBottom: 10}}/>
                        <Grid container justify="center">
                            <Grid item lg={8}>
                                <div style={{color: 'grey'}}>
                                <Typography>Monday</Typography>
                                <Typography>Tuesday</Typography>
                                <Typography>Wednesday</Typography>
                                <Typography>Thursday</Typography>
                                <Typography>Friday</Typography>
                                <Typography>Saturday</Typography>
                                <Typography>Sunday</Typography>
                                </div>
                            </Grid>
                            <Grid item lg={3}>
                                <div style={{color: 'white'}}>
                                    <Typography>{openingHours.monday.startHour} - {openingHours.monday.endHour}</Typography>
                                    <Typography>{openingHours.tuesday.startHour} - {openingHours.tuesday.endHour}</Typography>
                                    <Typography>{openingHours.wednesday.startHour} - {openingHours.wednesday.endHour}</Typography>
                                    <Typography>{openingHours.thursday.startHour} - {openingHours.thursday.endHour}</Typography>
                                    <Typography>{openingHours.friday.startHour} - {openingHours.friday.endHour}</Typography>
                                    <Typography>{openingHours.saturday.startHour} - {openingHours.saturday.endHour}</Typography>
                                    <Typography>{openingHours.sunday.startHour} - {openingHours.sunday.endHour}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>

    );
};

export default OpeningHours;