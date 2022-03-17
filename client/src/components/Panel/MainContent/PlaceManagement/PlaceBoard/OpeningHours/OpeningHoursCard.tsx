import { Card, Toolbar, Grid, Typography, Divider, CardContent, Button } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';

export const OpeningHoursCard: FC<any> = ({ openingHours }) => {
  return (

        <Card>
            <Toolbar>
                <Grid container sx={{ pb: 1, pt: 1 }} justifyContent="center">
                    <Typography variant="h2">
                        OPENING HOURS
                    </Typography>
                </Grid>
            </Toolbar>
            <Divider />
            <CardContent>
                <Grid container justifyContent="center" sx={{ pt: 1, pb: 1 }} >
                    <Grid container item lg={8}>
                        {Object.keys(openingHours).map((day) =>
                            <Grid container sx={{ mb: 1 }} key={day}>
                                <Grid item container alignItems="center" lg={6}>
                                    <Typography variant="h6">{day.toUpperCase()}</Typography>
                                </Grid>
                                <Grid item container justifyContent="flex-end" lg={6}>
                                    {!openingHours[day].open ?
                                        <Button variant="outlined" color="error">Closed</Button>
                                      :
                                        <Typography variant="h6">{format(new Date(openingHours[day].start), 'HH:mm')} - {format(new Date(openingHours[day].end), 'HH:mm')}</Typography>
                                    }
                                </Grid>
                            </Grid>,
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  );
};