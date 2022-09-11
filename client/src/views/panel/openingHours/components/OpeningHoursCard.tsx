import { Card, Toolbar, Grid, Typography, Divider, CardContent, Button } from '@mui/material';
import { format } from 'date-fns';
import { FC } from 'react';
import { OpeningHoursKeys, OpeningHoursProps } from 'redux-toolkit/slices/PlaceProps';

interface Props {
  openingHours: OpeningHoursProps;
}

export const OpeningHoursCard: FC<Props> = ({ openingHours }) => {
  return (
    <Card>
      <Toolbar>
        <Grid container sx={{ pb: 1, pt: 1 }} justifyContent="center">
          <Typography sx={{ textAlign: 'center' }} variant="h2">
            OPENING HOURS
          </Typography>
        </Grid>
      </Toolbar>
      <Divider />
      <CardContent>
        <Grid container justifyContent="center" sx={{ pt: 1, pb: 1 }}>
          <Grid container item xs={8}>
            {Object.entries(openingHours).map(([day, value]) => (
              <Grid container sx={{ mb: 1 }} key={day}>
                <Grid item container alignItems="center" xs={6}>
                  <Typography data-testid="day" variant="h6">
                    {day.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item container justifyContent="flex-end" xs={6}>
                  {!value.open ? (
                    <Button data-testid="closed-button" variant="outlined" color="error">
                      Closed
                    </Button>
                  ) : (
                    <Typography variant="h6" data-testid="open-date">
                      {format(new Date(value.start as Date), 'HH:mm')} -{format(new Date(value.end as Date), 'HH:mm')}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
