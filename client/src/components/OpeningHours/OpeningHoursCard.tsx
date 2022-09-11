import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import { OpeningHoursProps } from 'store/slices/PlaceProps';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Props {
  openingHours: OpeningHoursProps;
}

export const OpeningHoursCard: FC<Props> = ({ openingHours }) => {
  return (
    <Card style={{ flexGrow: 1 }} elevation={10}>
      <CardContent>
        <Typography variant="h5">Opening hours</Typography>
        <Divider />
        <Grid container justifyContent="center">
          <Grid item lg={6}>
            {days.map((day, index) => (
              <Typography key={index} variant="h6">
                {day}
              </Typography>
            ))}
          </Grid>
          <Grid item lg={5} style={{ textAlign: 'center' }} container direction="column">
            {openingHours &&
              Object.values(openingHours).map((day, index) => (
                <div key={index}>
                  {!day.open ? (
                    <Typography variant="h6" style={{ color: 'red' }}>
                      CLOSED
                    </Typography>
                  ) : (
                    <Typography variant="h6">
                      {format(new Date(day.start as Date), 'HH:mm')} - {format(new Date(day.end as Date), 'HH:mm')}
                    </Typography>
                  )}
                </div>
              ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
