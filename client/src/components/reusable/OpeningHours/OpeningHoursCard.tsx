import { Card, CardContent, Typography, Divider, Grid } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


export const OpeningHoursCard: FC<any> = ({ openingHours }) => {

  return (
        <Card style={{ flexGrow: 1 }} elevation={10}>
            <CardContent>
                <Typography variant="h5">Opening hours</Typography>
                <Divider  />
                <Grid container justifyContent="center">
                    <Grid item lg={6}>
                        {days.map((day, index) => <Typography key={index} variant="h6">{day}</Typography>)}
                    </Grid>
                    <Grid item lg={5} style={{ textAlign: 'center' }} container direction="column" >
                        {openingHours && Object.keys(openingHours).map((key) => <div key={key}>
                            {!openingHours[key].isOpen ?
                                <Typography variant="h6" style={{ color: 'red' }}>CLOSED</Typography>
                              :
                                <Typography variant="h6">{format(new Date(openingHours[key].startHour), 'HH:mm')} - {format(new Date(openingHours[key].endHour), 'HH:mm')}</Typography>
                            }
                        </div>,
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  );
};