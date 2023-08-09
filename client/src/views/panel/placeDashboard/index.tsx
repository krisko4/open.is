import { Card, CardContent, Grid, Slide, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { PlaceDetailsCard } from 'components/PlaceDetailsCard';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOpeningHoursForSelectedLocationQuery, useGetStatusForSelectedLocationQuery } from 'store/api';
import { Status } from 'store/slices/PlaceProps';
import { ActivityChart } from './components/ActivityChart';
import { PlaceStatus } from './components/PlaceStatus';
import { RatingCard } from './components/RatingCard';
import { TotalOpinions } from './components/TotalOpinions';
import { TotalVisits } from './components/TotalVisits';
import { VisitsToday } from './components/VisitsToday';

export const PlaceDashboard: FC = () => {
  const { locationId } = useParams();
  const { data: status } = useGetStatusForSelectedLocationQuery(locationId as string);
  const { data: openingHoursData, isFetching } = useGetOpeningHoursForSelectedLocationQuery(locationId as string);

  return (
    <Grid container item direction="column">
      <Grid container sx={{ pt: '30px', pb: '30px', pl: '30px', pr: '30px' }}>
        <Grid item sx={{ mb: 2, flexGrow: 1 }}>
          {status === Status.CLOSED && (
            <Slide in={true} direction="right" timeout={500}>
              <Alert variant="filled" severity="error">
                Your place is now closed.
              </Alert>
            </Slide>
          )}
          <Slide timeout={500} direction="left" in={!isFetching}>
            <div>
              {!isFetching &&
                (openingHoursData?.isActive ? (
                  <Alert severity="success" variant="filled" style={{ marginTop: 10 }}>
                    Your place is visible in the browser.
                  </Alert>
                ) : (
                  <Alert severity="warning" variant="filled" style={{ marginTop: 10 }}>
                    Your place is not visible in the browser. Please set opening hours of your business first.
                  </Alert>
                ))}
            </div>
          </Slide>
        </Grid>
        <Grid container justifyContent="space-around" spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <TotalVisits />
          </Grid>
          <Grid item xs={4}>
            <VisitsToday />
          </Grid>
          <Grid item xs={4}>
            <TotalOpinions />
          </Grid>
        </Grid>
        <Grid item container direction="column" lg={5} style={{ paddingRight: 10 }}>
          <Grid container spacing={2}>
            <Grid item container>
              <RatingCard />
            </Grid>
            <Slide in={true} timeout={500} direction="right">
              <Grid item container>
                <PlaceStatus />
              </Grid>
            </Slide>
            <Grid item container>
              <Card elevation={3} sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h5">Activity</Typography>
                  <Typography variant="subtitle2" style={{ marginBottom: 10 }}>
                    The following chart represents historical data of user activity in your place
                  </Typography>
                  <ActivityChart />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Slide in={true} direction="left" timeout={500}>
          <Grid item xs={12} lg={7}>
            <PlaceDetailsCard isCacheable={true} />
          </Grid>
        </Slide>
      </Grid>
    </Grid>
  );
};
